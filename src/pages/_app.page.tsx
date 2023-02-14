/* eslint-disable postcss-modules/no-unused-class */
import '../style/global.css'
import '@navikt/ds-datepicker/lib/index.css'
import '../components/app.css'
import '../components/avbryt-soknad-modal/avbryt-soknad-modal.css'
import '../components/avslutt-og-fortsett-senere/avslutt-og-fortsett-senere.css'
import '../components/banner/banner.css'
import '../components/person/person.css'
import '../components/ekspanderbar/ekspanderbar.css'
import '../components/ettersending/ettersending.css'
import '../components/feil/feil-oppsummering.css'
import '../components/filopplaster/drag-and-drop/drag-and-drop.css'
import '../components/filopplaster/fil-liste/fil-liste.css'
import '../components/filopplaster/kvittering-modal/opplasting-form.css'
import '../components/frist-sykepenger/frist-sykepenger.css'
import '../components/kvittering/kvittering.css'
import '../components/kvittering/kvittering-side.css'
import '../components/sendt/sendt-side.css'
import '../components/om-reisetilskudd/om-reisetilskudd.css'
import '../components/om-sykepenger/om-sykepenger.css'
import '../components/opplysninger-fra-sykmelding/opplysninger.css'
import '../components/oppsummering/oppsummering.css'
import '../components/slettknapp/slettknapp.css'
import '../components/soknad-intro/personvern-les-mer.css'
import '../components/soknad-intro/viktig-informasjon.css'
import '../components/soknad-med-to-deler/soknad-med-to-deler.css'
import '../components/soknader/inngang/inngangspanel.css'
import '../components/sporsmal/bjorn/bjorn.css'
import '../components/sporsmal/endring-uten-endring/endring-uten-endring.css'
import '../components/sporsmal/landvelger/landvelger.css'
import '../components/sporsmal/sporsmal-form/sporsmal-form.css'
import '../components/sporsmal/sporsmal-form/sendes-til.css'
import '../components/sporsmal/sporsmal-steg/sporsmal-steg.css'
import '../components/sporsmal/typer/ja-nei-input.css'
import '../components/sporsmal/typer/beh.dager.css'
import '../components/sporsmal/typer/dager-komp.css'
import '../components/sporsmal/typer/ikke-relevant.css'
import '../components/sporsmal/typer/periode-komp.css'
import '../components/sporsmal/typer/dato-komp.css'
import '../components/sporsmal/typer/tall-komp.css'
import '../components/sporsmal/typer/opplasting/opplasting.css'
import '../components/sporsmal/undersporsmal/undersporsmal.css'
import '../components/utvidbar/utvidbar.css'
import '../components/feil/refresh-hvis-feil-state.css'
import '../components/soknader/soknader.css'
import '../components/soknad/soknaden.css'
import '../components/endreknapp/endre-soknad-modal.css'
import '../components/sporsmal/bendiksen/paske-hjelpetekst.css'
import '../components/queryStatusPanel/QueryStatusPanel.css'

import { configureLogger } from '@navikt/next-logger'
import dayjs from 'dayjs'
import nb from 'dayjs/locale/nb'
import type { AppProps as NextAppProps } from 'next/app'
import Head from 'next/head'
import React, { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { useFangHotjarEmotion } from '../hooks/useFangHotjarEmotion'
import { useHandleDecoratorClicks } from '../hooks/useBreadcrumbs'

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
                <div id="root">
                    <Component {...pageProps} />
                </div>
            </QueryClientProvider>
        </>
    )
}

export default MyApp
