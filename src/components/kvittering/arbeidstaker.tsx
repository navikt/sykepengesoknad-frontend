import dayjs from 'dayjs'
import AlertStripe, { AlertStripeSuksess } from 'nav-frontend-alertstriper'
import { Undertittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { RSMottakerResponse } from '../../types/rs-types/rest-response/rs-mottakerresponse'
import { RSMottaker } from '../../types/rs-types/rs-mottaker'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { Soknad } from '../../types/types'
import { dayjsToDate, sendtForMerEnn30DagerSiden } from '../../utils/dato-utils'
import env from '../../utils/environment'
import fetcher from '../../utils/fetcher'
import { tekst } from '../../utils/tekster'
import VisBlock from '../vis-block'
import Inntil16dager from './innhold/arbeidstaker/inntil16dager'
import Over16dager from './innhold/arbeidstaker/over16dager'
import PerioderMedOpphold from './innhold/arbeidstaker/perioder-med-opphold'
import PerioderUtenOpphold from './innhold/arbeidstaker/perioder-uten-opphold'
import ArbeidstakerStatus from './status/arbeidstaker-status'

type ArbeidstakerKvitteringTekst = 'inntil16dager' | 'over16dager' | 'utenOpphold' | 'medOpphold' | undefined

const Arbeidstaker = () => {
    const { valgtSoknad, valgtSykmelding, soknader } = useAppStore()
    const [ kvitteringTekst, setKvitteringTekst ] = useState<ArbeidstakerKvitteringTekst>()


    useEffect(() => {
        settRiktigKvitteringTekst()
        // eslint-disable-next-line
    }, [ valgtSoknad?.sendtTilNAVDato ])

    if (!valgtSoknad) return null

    const settRiktigKvitteringTekst = () => {
        if (erInnenforArbeidsgiverperiode()) {
            setKvitteringTekst('inntil16dager')
        } else {
            if (erSykmeldingperiodeDeltOverFlereSoknader()) {
                setKvitteringTekst('utenOpphold')
            } else {
                const tidligereSoknader = soknader
                    .filter(sok => sok.status !== RSSoknadstatus.UTGAATT)                                 // Vi sjekker ikke utgåtte søknader
                    .filter(sok => sok.soknadstype === RSSoknadstype.ARBEIDSTAKERE)                       // Gjelder arbeidstakersøknad
                    .filter(sok => sok.arbeidsgiver?.orgnummer === valgtSoknad?.arbeidsgiver?.orgnummer)  // Samme arbeidstaker
                    .filter(senereSok => senereSok.tom! < valgtSoknad!.fom!)                              // Gjelder søknader før valgt
                    .filter(tidligereSok => tidligereSoknaderInnenfor16Dager(tidligereSok.tom!, valgtSoknad.fom!))
                if (tidligereSoknader.length > 0) {
                    if (harTidligereUtenOpphold(tidligereSoknader)) {
                        utenOppholdSjekkArbeidsgiverperiode(tidligereSoknader)
                    } else {
                        medOppholdSjekkArbeidsgiverperiode(tidligereSoknader)
                    }
                } else {
                    setKvitteringTekst('over16dager')
                }
            }
        }
    }

    const erInnenforArbeidsgiverperiode = () => {
        return valgtSoknad.sendtTilArbeidsgiverDato !== null && valgtSoknad.sendtTilNAVDato === null
    }

    const erSykmeldingperiodeDeltOverFlereSoknader = () => {
        const fom = valgtSoknad!.fom!.getDate()
        const sykFom = dayjsToDate(valgtSykmelding!.mulighetForArbeid.perioder[0].fom)?.getDate()
        return fom !== sykFom
    }

    const tidligereSoknaderInnenfor16Dager = (d1: Date, d2: Date): boolean => {
        return dayjs(d2).diff(d1, 'day') <= 16
    }

    const harTidligereUtenOpphold = (tidligereSoknader: Soknad[]) => {
        return tidligereSoknader.filter(sok => dayjs(valgtSoknad.fom!).diff(sok.tom!, 'day') <= 1).length > 0
    }

    const utenOppholdSjekkArbeidsgiverperiode = async(tidligereSoknader: Soknad[]) => {
        const forrigeSoknad = tidligereSoknader.find(sok => dayjs(valgtSoknad.fom).diff(sok.tom!, 'day') <= 1)
        const forste = await erForsteSoknadUtenforArbeidsgiverperiode(forrigeSoknad?.id)
        if (forste) {
            setKvitteringTekst('over16dager')
        } else {
            setKvitteringTekst('utenOpphold')
        }
    }

    const medOppholdSjekkArbeidsgiverperiode = async(tidligereSoknader: Soknad[]) => {
        const forrigeSoknad = tidligereSoknader.sort((a, b) => a.tom!.getTime() - b.tom!.getTime()).reverse()[0]
        const forste = await erForsteSoknadUtenforArbeidsgiverperiode(forrigeSoknad?.id)
        if (forste) {
            setKvitteringTekst('over16dager')
        } else {
            setKvitteringTekst('medOpphold')
        }
    }

    async function erForsteSoknadUtenforArbeidsgiverperiode(id?: string) {
        if (id === undefined) return true
        const res = await fetcher(env.flexGatewayRoot + `/syfosoknad/api/soknader/${id}/finnMottaker`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        const data: RSMottakerResponse = await res.json()
        return data.mottaker === RSMottaker.ARBEIDSGIVER
    }

    const kvitteringInnhold = () => {
        switch (kvitteringTekst) {
            case 'inntil16dager':
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
                <ArbeidstakerStatus />

                <VisBlock
                    hvis={!sendtForMerEnn30DagerSiden(valgtSoknad?.sendtTilArbeidsgiverDato, valgtSoknad?.sendtTilNAVDato)}
                    render={() => {
                        return (
                            <div className="hva-skjer">
                                <AlertStripe type="info" form="inline">
                                    <VisBlock hvis={kvitteringTekst === 'medOpphold'}
                                        render={() => {
                                            return (
                                                <Undertittel tag="h3">
                                                    {tekst('kvittering.viktig-informasjon')}
                                                </Undertittel>
                                            )
                                        }}
                                    />
                                    <VisBlock hvis={kvitteringTekst !== 'medOpphold'}
                                        render={() => {
                                            return (
                                                <Undertittel tag="h3">
                                                    {tekst('kvittering.hva-skjer-videre')}
                                                </Undertittel>
                                            )
                                        }}
                                    />
                                </AlertStripe>
                                <div className="avsnitt">
                                    <div className="sendt-inner">
                                        {kvitteringInnhold()}
                                    </div>
                                </div>
                            </div>
                        )
                    }}
                />
            </div>
        </>
    )
}

export default Arbeidstaker
