import '../style/global.css'

import { configureLogger, logger } from '@navikt/next-logger'
import dayjs from 'dayjs'
import nb from 'dayjs/locale/nb'
import type { AppProps as NextAppProps } from 'next/app'
import Head from 'next/head'
import React, { PropsWithChildren, useEffect, useRef } from 'react'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Modal } from '@navikt/ds-react'
import { useRouter } from 'next/router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { useFangHotjarEmotion } from '../hooks/useFangHotjarEmotion'
import { useHandleDecoratorClicks } from '../hooks/useBreadcrumbs'
import { LabsWarning } from '../components/labs-warning/LabsWarning'
import { basePath } from '../utils/environment'
import { getFaro, initInstrumentation, pinoLevelToFaroLevel } from '../faro/faro'
import { AuthenticationError } from '../utils/fetch'

interface AppProps extends Omit<NextAppProps, 'pageProps'> {
    pageProps: PropsWithChildren<unknown>
}

dayjs.locale({
    ...nb,
    weekStart: 1,
})

initInstrumentation()
configureLogger({
    basePath: basePath(),
    onLog: (log) =>
        getFaro()?.api.pushLog(log.messages, {
            level: pinoLevelToFaroLevel(log.level.label),
        }),
})

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Setting this to true causes query request after initial
            // mount even if the query was hydrated from the server side.
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        },
    },
    queryCache: new QueryCache({
        onError: (error) => {
            // kjøres en gang for hver queryKey i useQuery etter at retries er brukt opp
            // hvorfor dette ikke plasseres sammen med useQuery: https://tkdodo.eu/blog/breaking-react-querys-api-on-purpose
            if (!(error instanceof AuthenticationError)) {
                logger.warn(error)
            }
        },
    }),
})

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    useHandleDecoratorClicks()
    useFangHotjarEmotion()

    const router = useRouter()
    const isFirst = useRef(true)

    useEffect(() => {
        if (isFirst.current) {
            isFirst.current = false
            return
        }
        if (router.asPath !== '/') {
            // Ikke fokuser når man går tilbake til listevisninga
            document.getElementById('maincontent')?.focus()
            document.getElementById('maincontent')?.scrollIntoView()
        }
    }, [router.asPath])
    Modal.setAppElement('#root')

    return (
        <>
            <Head>
                <title>Søknad om sykepenger</title>
                <meta name="robots" content="noindex" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <QueryClientProvider client={queryClient}>
                <div id="root" className="mx-auto max-w-2xl p-4 pb-32">
                    <LabsWarning />
                    <main id="maincontent" role="main" tabIndex={-1} className="outline-none">
                        <Component {...pageProps} />
                    </main>
                </div>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    )
}

export default MyApp
