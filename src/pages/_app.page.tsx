import '../style/global.css'
import '@navikt/ds-datepicker/lib/index.css'
import '../components/app.less'
import '../components/avbryt-soknad-modal/avbryt-soknad-modal.less'
import '../components/avslutt-og-fortsett-senere/avslutt-og-fortsett-senere.less'
import '../components/banner/banner.less'
import '../components/person/person.less'
import '../components/ekspanderbar/ekspanderbar.less'
import '../components/ettersending/ettersending.less'
import '../components/feil/feil-oppsummering.less'
import '../components/filopplaster/drag-and-drop/drag-and-drop.less'
import '../components/filopplaster/fil-liste/fil-liste.less'
import '../components/filopplaster/kvittering-modal/opplasting-form.less'
import '../components/frist-sykepenger/frist-sykepenger.less'
import '../components/kvittering/kvittering.less'
import '../components/kvittering/kvittering-side.less'
import '../components/sendt/sendt-side.less'
import '../components/om-reisetilskudd/om-reisetilskudd.less'
import '../components/om-sykepenger/om-sykepenger.less'
import '../components/opplysninger-fra-sykmelding/opplysninger.less'
import '../components/oppsummering/oppsummering.less'
import '../components/slettknapp/slettknapp.less'
import '../components/soknad-intro/personvern-les-mer.less'
import '../components/soknad-intro/viktig-informasjon.less'
import '../components/soknad-med-to-deler/soknad-med-to-deler.less'
import '../components/soknader/inngang/inngangspanel.less'
import '../components/sporsmal/bjorn/bjorn.less'
import '../components/sporsmal/endring-uten-endring/endring-uten-endring.less'
import '../components/sporsmal/landvelger/landvelger.less'
import '../components/sporsmal/sporsmal-form/sporsmal-form.less'
import '../components/sporsmal/sporsmal-form/sendes-til.less'
import '../components/sporsmal/sporsmal-steg/sporsmal-steg.less'
import '../components/sporsmal/typer/beh.dager.less'
import '../components/sporsmal/typer/dager-komp.less'
import '../components/sporsmal/typer/ikke-relevant.less'
import '../components/sporsmal/typer/periode-komp.less'
import '../components/sporsmal/typer/dato-komp.less'
import '../components/sporsmal/typer/tall-komp.less'
import '../components/sporsmal/typer/opplasting/opplasting.less'
import '../components/sporsmal/undersporsmal/undersporsmal.less'
import '../components/utvidbar/utvidbar.less'
import '../components/feil/refresh-hvis-feil-state.less'
import '../components/opprett-utland/opprett-utland.less'
import '../components/soknader/soknader.less'
import '../components/soknad/soknaden.less'
import '../components/endreknapp/endre-soknad-modal.less'
import '../components/sporsmal/bendiksen/paske-hjelpetekst.less'
import '../components/queryStatusPanel/QueryStatusPanel.less'

import { configureLogger } from '@navikt/next-logger'
import dayjs from 'dayjs'
import nb from 'dayjs/locale/nb'
import type { AppProps as NextAppProps } from 'next/app'
import Head from 'next/head'
import React, { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { LabsWarning } from '../components/labs-warning/LabsWarning'
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
                    <LabsWarning />
                    <Component {...pageProps} />
                </div>
            </QueryClientProvider>
        </>
    )
}

export default MyApp
