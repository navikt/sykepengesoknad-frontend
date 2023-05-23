/* eslint-disable postcss-modules/no-unused-class */
import '../style/global.css'
import '../components/filopplaster/drag-and-drop/drag-and-drop.css'
import '../components/frist-sykepenger/frist-sykepenger.css'
import '../components/kvittering/kvittering.css'
import '../components/om-sykepenger/om-sykepenger.css'
import '../components/oppsummering/oppsummering.css'
import '../components/sporsmal/landvelger/landvelger.css'

import { configureLogger } from '@navikt/next-logger'
import dayjs from 'dayjs'
import nb from 'dayjs/locale/nb'
import type { AppProps as NextAppProps } from 'next/app'
import Head from 'next/head'
import React, { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { useFangHotjarEmotion } from '../hooks/useFangHotjarEmotion'
import { useHandleDecoratorClicks } from '../hooks/useBreadcrumbs'
import { LabsWarning } from '../components/labs-warning/LabsWarning'

interface AppProps extends Omit<NextAppProps, 'pageProps'> {
    pageProps: PropsWithChildren<unknown>
}

dayjs.locale({
    ...nb,
    weekStart: 1,
})

configureLogger({
    basePath: '/syk/sykepengesoknad',
})

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    useHandleDecoratorClicks()
    useFangHotjarEmotion()

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                // Setting this to true causes query request after initial
                // mount even if the query was hydrated from the server side.
                refetchOnMount: false,
                refetchOnWindowFocus: false,
            },
        },
    })

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
                    <Component {...pageProps} />
                </div>
            </QueryClientProvider>
        </>
    )
}

export default MyApp
