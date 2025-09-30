import '../style/global.css'

import { configureLogger, logger } from '@navikt/next-logger'
import dayjs from 'dayjs'
import nb from 'dayjs/locale/nb'
import { AppProps } from 'next/app'
import Head from 'next/head'
import React, { ReactElement, useEffect, useRef } from 'react'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import dynamic from 'next/dynamic'

import { useHandleDecoratorClicks } from '../hooks/useBreadcrumbs'
import { basePath } from '../utils/environment'
import { getFaro, initInstrumentation, pinoLevelToFaroLevel } from '../faro/faro'
import { AuthenticationError } from '../utils/fetch'
import { FlagProvider } from '../toggles/context'
import { ServerSidePropsResult } from '../auth/beskyttetSide'

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

function MyApp({ Component, pageProps }: AppProps<ServerSidePropsResult>): ReactElement {
    useHandleDecoratorClicks()

    const router = useRouter()
    const isFirst = useRef(true)
    const DemoWarning = () => {
        const DemoWarning = dynamic(() => import('../components/demo-warning/DemoWarning'), {
            ssr: false,
        })
        return <DemoWarning />
    }

    useEffect(() => {
        // @ts-expect-error - skyra er satt opp i dekoratøren
        window?.skyra?.redactPathname('/syk/sykepengesoknad/avbrutt/:redacted')
        // @ts-expect-error - skyra er satt opp i dekoratøren
        window?.skyra?.redactPathname('/syk/sykepengesoknad/kvittering/:redacted')
        // @ts-expect-error - skyra er satt opp i dekoratøren
        window?.skyra?.redactPathname('/syk/sykepengesoknad/sendt/:redacted')
        // @ts-expect-error - skyra er satt opp i dekoratøren
        window?.skyra?.redactPathname('/syk/sykepengesoknad/soknader/:redacted')
    }, [])

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

    return (
        <>
            <Head>
                <title>Søknad om sykepenger</title>
                <meta name="robots" content="noindex" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <FlagProvider toggles={pageProps.toggles}>
                <QueryClientProvider client={queryClient}>
                    <div id="root" className="mx-auto max-w-2xl p-4 md:p-0 pb-32">
                        <main id="maincontent" role="main" tabIndex={-1} className="outline-hidden mb-6">
                            <DemoWarning />
                            <Component {...pageProps} />
                        </main>
                    </div>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </FlagProvider>
        </>
    )
}

export default MyApp
