import dayjs from 'dayjs'
import AlertStripe, { AlertStripeInfo, AlertStripeSuksess } from 'nav-frontend-alertstriper'
import Lenke from 'nav-frontend-lenker'
import { Element, Normaltekst, Undertekst, Undertittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import useFetch from '../../data/rest/use-fetch'
import { FetchState, hasData } from '../../data/rest/utils'
import { useAppStore } from '../../data/stores/app-store'
import { RSMottakerResponse } from '../../types/rs-types/rest-response/rs-mottakerresponse'
import { RSMottaker } from '../../types/rs-types/rs-mottaker'
import env from '../../utils/environment'
import { logger } from '../../utils/logger'
import { tekst } from '../../utils/tekster'
import Avkrysset from '../oppsummering/utdrag/avkrysset'
import Utvidbar from '../utvidbar/utvidbar'
import Vis from '../vis'
import { Mottaker } from './innhold/kvittering-status'

const Arbeidstaker = () => {
    const { valgtSoknad, setMottaker, mottaker } = useAppStore()
    const [ tilArbNavn, setTilArbNavn ] = useState<string>()
    const [ tilOrg, setTilOrg ] = useState<string>()
    const [ tilNavDato, setTilNavDato ] = useState<string>()
    const [ tilArbDato, setTilArbDato ] = useState<string>()
    const rsMottakerResponseFetch = useFetch<RSMottakerResponse>()

    useEffect(() => {
        opprettDatoer()
        hentMottaker()
        // eslint-disable-next-line
    }, [])

    const opprettDatoer = () => {
        const sendtTilNav = valgtSoknad?.sendtTilNAVDato
        if (sendtTilNav) {
            const datoNav = dayjs(sendtTilNav).format('dddd D. MMM, kl hh:mm')
            setTilNavDato(datoNav.charAt(0).toUpperCase() + datoNav.slice(1))
        }

        const sendtTilArb = valgtSoknad?.sendtTilArbeidsgiverDato
        if (sendtTilArb) {
            const datoArb = dayjs(sendtTilArb).format('dddd D. MMM, kl hh:mm')
            setTilArbDato(datoArb.charAt(0).toUpperCase() + datoArb.slice(1))
            setTilArbNavn(valgtSoknad?.arbeidsgiver?.navn ? valgtSoknad?.arbeidsgiver?.navn : Mottaker.ARBEIDSGIVER)
            setTilOrg(valgtSoknad?.arbeidsgiver?.orgnummer ? `(Org.nr. ${valgtSoknad.arbeidsgiver.orgnummer})` : '')
        }
    }
    //TODO: legge til vedtaksløsningen
    const inntil16dager = mottaker === RSMottaker.ARBEIDSGIVER
    const over16dager = mottaker === RSMottaker.NAV || mottaker === RSMottaker.ARBEIDSGIVER_OG_NAV
    const perioderUtenOpphold = true
    const perioderMedOpphold = true
    // const over30dagerEllerMotatt = dayjs(new Date()).diff(dayjs(valgtSoknad!.opprettetDato), 'day') > 30

    const hentMottaker = () => {
        rsMottakerResponseFetch.fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad!.id}/finnMottaker`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }, (fetchState: FetchState<RSMottakerResponse>) => {
            if (hasData(fetchState)) {
                setMottaker(fetchState.data.mottaker)
            } else {
                logger.error('Klarte ikke hente MOTTAKER av søknad', fetchState)
            }
        })
    }

    return (
        <>
            <AlertStripeSuksess>
                <Undertittel tag={'h2'}>
                    {tekst('kvittering.soknaden-er-sendt')}
                </Undertittel>
            </AlertStripeSuksess>
            <div className="sendt-info">
                <div className="sendt-inner">
                    <Vis hvis={valgtSoknad!.sendtTilArbeidsgiverDato}>
                        <Element tag="h2" className="sendt-tittel">
                            {tekst('kvittering.sendt-til')}
                        </Element>
                        <Avkrysset tekst={tilArbNavn + ' ' + tilOrg} />
                        <Undertekst>{tilArbDato}</Undertekst>
                    </Vis>
                    <Vis hvis={valgtSoknad!.sendtTilNAVDato}>
                        <Avkrysset tekst={Mottaker.NAV} />
                        <Undertekst>{tilNavDato}</Undertekst>
                    </Vis>
                </div>

                <div className="hva-skjer">
                    <AlertStripe type="info" form="inline">
                        <Undertittel tag="h3">{tekst('kvittering.hva-skjer-videre')}</Undertittel>
                    </AlertStripe>
                    <div className="avsnitt">
                        <div className="sendt-inner">
                            <Vis hvis={inntil16dager}>
                                <Element tag="h2" className="arbeidstaker-tittel">{tekst('kvittering.arbeidstaker.tittel')}</Element>
                                <Normaltekst tag="span">{tekst('kvittering.arbeidstaker.brodtekst')} </Normaltekst>
                            </Vis>
                            <Vis hvis={over16dager}>
                                <Element tag="h2" className="arbeidstaker-tittel">{tekst('kvittering.naeringsdrivende.tittel')}</Element>
                                <Normaltekst tag="span">{tekst('kvittering.arbeidstaker.over16.brodtekst')} </Normaltekst>
                                <Utvidbar erApen={false} type="intern" tittel={tekst('kvittering.arbeidstaker.hvorfor-skille-ved-16-dager')}>
                                    <AlertStripeInfo>{tekst('kvittering.arbeidsgiveren-skal-betale')}</AlertStripeInfo>
                                </Utvidbar>
                                <Utvidbar erApen={false} type="intern" tittel={tekst('kvittering.hva-er-inntektsmelding')}>
                                    <AlertStripeInfo>{tekst('kvittering.arbeidstaker.over16.inntektsmelding.brodtekst')}</AlertStripeInfo>
                                </Utvidbar>
                                <div className="avsnitt hva-skjer">
                                    <Element tag="h2" className="arbeidstaker-tittel">{tekst('kvittering.nav-behandler-soknaden')}</Element>
                                    <Normaltekst tag="span">{tekst('kvittering.arbeidstaker.saksbehandlingstid')} </Normaltekst>
                                    <Lenke href={tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke.url')}>
                                        <Normaltekst tag="span">{tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke')}</Normaltekst>
                                    </Lenke>.
                                </div>
                                <div className="avsnitt">
                                    <Element tag="h2" className="arbeidstaker-tittel">{tekst('kvittering.naar-blir-pengene')}</Element>
                                    <Normaltekst tag="span">{tekst('kvittering.arbeidstaker.over16.utbetaling')} </Normaltekst>
                                </div>
                            </Vis>
                            <Vis hvis={perioderUtenOpphold}>
                                <div className="avsnitt hva-skjer">
                                    <Element tag="h2" className="arbeidstaker-tittel">{tekst('kvittering.nav-behandler-soknaden')}</Element>
                                    <Normaltekst tag="span">{tekst('kvittering.arbeidstaker.saksbehandlingstid')} </Normaltekst>
                                    <Lenke href={tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke.url')}>
                                        <Normaltekst tag="span">{tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke')}</Normaltekst>
                                    </Lenke>.
                                </div>
                                <div className="avsnitt">
                                    <Element tag="h2" className="arbeidstaker-tittel">{tekst('kvittering.naar-blir-pengene')}</Element>
                                    <Normaltekst tag="span">{tekst('kvittering.arbeidstaker.over16.utbetaling')} </Normaltekst>
                                </div>
                            </Vis>
                            <Vis hvis={perioderMedOpphold}>
                                <Element tag="h2" className="arbeidstaker-tittel">{tekst('kvittering.naeringsdrivende.tittel')}</Element>
                                <Normaltekst tag="span">{tekst('kvittering.arbeidstaker.med-opphold')} </Normaltekst>
                                <Utvidbar erApen={false} type="intern" tittel={tekst('kvittering.arbeidstaker.hvorfor-skille-ved-16-dager')}>
                                    <AlertStripeInfo>{tekst('kvittering.arbeidstaker.hvorfor-inntektsmelding-pa-nytt')}</AlertStripeInfo>
                                </Utvidbar>
                                <div className="avsnitt hva-skjer">
                                    <Element tag="h2" className="arbeidstaker-tittel">{tekst('kvittering.nav-behandler-soknaden')}</Element>
                                    <Normaltekst tag="span">{tekst('kvittering.arbeidstaker.saksbehandlingstid')} </Normaltekst>
                                    <Lenke href={tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke.url')}>
                                        <Normaltekst tag="span">{tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke')}</Normaltekst>
                                    </Lenke>.
                                </div>
                                <div className="avsnitt">
                                    <Element tag="h2" className="arbeidstaker-tittel">{tekst('kvittering.naar-blir-pengene')}</Element>
                                    <Normaltekst tag="span">{tekst('kvittering.arbeidstaker.over16.utbetaling')} </Normaltekst>
                                </div>
                            </Vis>
                        </div>
                    </div>
                    <div className="avsnitt">
                        <div className="sendt-inner">
                            <Element tag="h2" className="arbeidstaker-tittel">{}</Element>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Arbeidstaker
