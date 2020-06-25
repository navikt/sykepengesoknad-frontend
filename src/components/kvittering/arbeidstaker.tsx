import dayjs from 'dayjs'
import AlertStripe, { AlertStripeSuksess } from 'nav-frontend-alertstriper'
import { Element, Undertekst, Undertittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import useFetch from '../../data/rest/use-fetch'
import { FetchState, hasData } from '../../data/rest/utils'
import { useAppStore } from '../../data/stores/app-store'
import { RSMottakerResponse } from '../../types/rs-types/rest-response/rs-mottakerresponse'
import { RSMottaker } from '../../types/rs-types/rs-mottaker'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { dayjsToDate, getDuration, sendtForMerEnn30DagerSiden } from '../../utils/dato-utils'
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

type ArbeidstakerKvitteringTekst = 'intil16dager' | 'over16dager' | 'utenOpphold' | 'medOpphold' | undefined

const Arbeidstaker = () => {
    const { valgtSoknad, valgtSykmelding, setMottaker, mottaker, soknader } = useAppStore()
    const [ tilArbNavn, setTilArbNavn ] = useState<string>()
    const [ tilOrg, setTilOrg ] = useState<string>()
    const [ tilNavDato, setTilNavDato ] = useState<string>()
    const [ tilArbDato, setTilArbDato ] = useState<string>()
    const [ kvitteringTekst, setKvitteringTekst ] = useState<ArbeidstakerKvitteringTekst>()
    const rsMottakerResponseFetch = useFetch<RSMottakerResponse>()

    useEffect(() => {
        opprettDatoer()
        hentMottaker()
        settRiktigKvitteringTekst()
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

    const settRiktigKvitteringTekst = () => {
        if (mottaker === RSMottaker.ARBEIDSGIVER) {
            setKvitteringTekst('intil16dager')
        }
        else if (mottaker === RSMottaker.NAV || mottaker === RSMottaker.ARBEIDSGIVER_OG_NAV) {
            const fom = valgtSoknad!.fom!.getDate()
            const sykFom = dayjsToDate(valgtSykmelding!.mulighetForArbeid.perioder[0].fom)?.getDate()
            const forsteSoknad = fom === sykFom

            if (forsteSoknad) {
                // TODO: Sjekk også at dette gjelder for samme arbeidsgiver
                const harTidligereSoknad = soknader
                    .filter((sok) => sok.soknadstype === RSSoknadstype.ARBEIDSTAKERE)
                    .filter((senereSok) => senereSok.tom! < valgtSoknad!.fom!)
                    .filter((tidligereSok) => getDuration(tidligereSok.tom!, valgtSoknad!.fom!) > 16)
                    .length > 0
                if (harTidligereSoknad) {
                    setKvitteringTekst('medOpphold')
                }
                else {
                    setKvitteringTekst('over16dager')
                }
            }
            else {
                setKvitteringTekst('utenOpphold')
            }
        }
    }

    const kvitteringInnhold = () => {
        switch (kvitteringTekst) {
            case 'intil16dager':
                return <Inntil16dager />
            case 'over16dager':
                return <Over16dager />
            case 'utenOpphold':
                return <PerioderUtenOpphold />
            case 'medOpphold':
                return <PerioderMedOpphold />
            default:
                return null
        }
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

                <Vis hvis={!sendtForMerEnn30DagerSiden(valgtSoknad?.sendtTilArbeidsgiverDato, valgtSoknad?.sendtTilNAVDato)} >
                    <div className="hva-skjer">
                        <AlertStripe type="info" form="inline">
                            <Vis hvis={kvitteringTekst === 'medOpphold'} >
                                <Undertittel tag="h3">{tekst('kvittering.viktig-informasjon')}</Undertittel>
                            </Vis>
                            <Vis hvis={kvitteringTekst !== 'medOpphold'} >
                                <Undertittel tag="h3">{tekst('kvittering.hva-skjer-videre')}</Undertittel>
                            </Vis>
                        </AlertStripe>
                        <div className="avsnitt">
                            <div className="sendt-inner">
                                { kvitteringInnhold() }
                            </div>
                        </div>
                        <div className="avsnitt">
                            <div className="sendt-inner">
                                <Element tag="h2" className="arbeidstaker-tittel">{}</Element>
                            </div>
                        </div>
                    </div>
                </Vis>
            </div>

        </>
    )
}

export default Arbeidstaker
