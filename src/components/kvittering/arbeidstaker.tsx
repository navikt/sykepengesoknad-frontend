import dayjs from 'dayjs'
import AlertStripe, { AlertStripeSuksess } from 'nav-frontend-alertstriper'
import { Element, Undertekst, Undertittel } from 'nav-frontend-typografi'
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
import Vis from '../vis'
import Inntil16dager from './innhold/arbeidstaker/inntil16dager'
import Over16dager from './innhold/arbeidstaker/over16dager'
import PerioderMedOpphold from './innhold/arbeidstaker/perioder-med-opphold'
import PerioderUtenOpphold from './innhold/arbeidstaker/perioder-uten-opphold'
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
    const perioderUtenOpphold = false
    const perioderMedOpphold = false
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
                                <Inntil16dager />
                            </Vis>
                            <Vis hvis={over16dager}>
                                <Over16dager />
                            </Vis>
                            <Vis hvis={perioderUtenOpphold}>
                                <PerioderUtenOpphold />
                            </Vis>
                            <Vis hvis={perioderMedOpphold}>
                                <PerioderMedOpphold />
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
