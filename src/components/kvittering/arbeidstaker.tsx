import { Alert, Heading } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React, { useCallback, useEffect, useState } from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { RSMottaker } from '../../types/rs-types/rs-mottaker'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { Soknad } from '../../types/types'
import { sendtForMerEnn30DagerSiden } from '../../utils/dato-utils'
import fetchMedRequestId from '../../utils/fetch'
import { logger } from '../../utils/logger'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'
import Inntil16dager from './innhold/arbeidstaker/inntil16dager'
import Over16dager from './innhold/arbeidstaker/over16dager'
import PerioderMedOpphold from './innhold/arbeidstaker/perioder-med-opphold'
import PerioderUtenOpphold from './innhold/arbeidstaker/perioder-uten-opphold'
import ArbeidstakerStatus from './status/arbeidstaker-status'

type ArbeidstakerKvitteringTekst = 'inntil16dager' | 'over16dager' | 'utenOpphold' | 'medOpphold' | undefined

const Arbeidstaker = () => {
    const { valgtSoknad, valgtSykmelding, soknader } = useAppStore()
    const [kvitteringTekst, setKvitteringTekst] = useState<ArbeidstakerKvitteringTekst>()

    const erInnenforArbeidsgiverperiode = () => {
        if (!valgtSoknad) return

        return valgtSoknad.sendtTilArbeidsgiverDato !== null && valgtSoknad.sendtTilNAVDato === null
    }

    const erSykmeldingperiodeDeltOverFlereSoknader = () => {
        const fom = dayjs(valgtSoknad!.fom).date()
        const sykFom = dayjs(valgtSykmelding!.sykmeldingsperioder[0].fom).date()
        return fom !== sykFom
    }

    const tidligereSoknaderInnenfor16Dager = (d1: Date, d2: Date): boolean => {
        return dayjs(d2).diff(d1, 'day') <= 16
    }

    const harTidligereUtenOpphold = (tidligereSoknader: Soknad[]) => {
        if (!valgtSoknad) return

        return tidligereSoknader.filter((sok) => dayjs(valgtSoknad.fom!).diff(sok.tom!, 'day') <= 1).length > 0
    }

    const utenOppholdSjekkArbeidsgiverperiode = async (tidligereSoknader: Soknad[]) => {
        if (!valgtSoknad) return

        const forrigeSoknad = tidligereSoknader.find((sok) => dayjs(valgtSoknad.fom).diff(sok.tom!, 'day') <= 1)
        const forste = await erForsteSoknadUtenforArbeidsgiverperiode(forrigeSoknad?.id)
        if (forste) {
            setKvitteringTekst('over16dager')
        } else {
            setKvitteringTekst('utenOpphold')
        }
    }

    const medOppholdSjekkArbeidsgiverperiode = async (tidligereSoknader: Soknad[]) => {
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
        let fetchResult
        const url = `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${id}/finnMottaker`
        const options: RequestInit = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        }
        try {
            fetchResult = await fetchMedRequestId(url, options)
        } catch (e) {
            return
        }

        const response = fetchResult.response
        if (!response.ok) {
            logger.error(
                `Feil ved kall til: ${options.method} ${url} med HTTP-kode: ${response.status} og x_request_id: ${fetchResult.requestId}.`
            )
            return
        }

        let data
        try {
            data = await response.json()
            return data.mottaker === RSMottaker.ARBEIDSGIVER
        } catch (e) {
            logger.error(
                `${e} - Kall til: ${options.method} ${url} feilet HTTP-kode: ${response.status} ved parsing av JSON for x_request_id: ${fetchResult.requestId} med data: ${response.body}`
            )
            return
        }
    }

    const kvitteringInnhold = () => {
        switch (kvitteringTekst) {
            case 'inntil16dager':
                return <Inntil16dager />
            case 'over16dager':
                return <Over16dager erGradert={valgtSoknad?.soknadstype === RSSoknadstype.GRADERT_REISETILSKUDD} />
            case 'utenOpphold':
                return <PerioderUtenOpphold />
            case 'medOpphold':
                return <PerioderMedOpphold />
            default:
                return null
        }
    }

    const settRiktigKvitteringTekst = useCallback(async () => {
        if (!valgtSoknad || !valgtSykmelding) return

        if (erInnenforArbeidsgiverperiode()) {
            setKvitteringTekst('inntil16dager')
        } else {
            if (erSykmeldingperiodeDeltOverFlereSoknader()) {
                setKvitteringTekst('utenOpphold')
            } else {
                const tidligereSoknader = soknader
                    .filter((sok) => sok.status !== RSSoknadstatus.UTGAATT) // Vi sjekker ikke utgåtte søknader
                    .filter((sok) => sok.soknadstype === RSSoknadstype.ARBEIDSTAKERE) // Gjelder arbeidstakersøknad
                    .filter((sok) => sok.arbeidsgiver?.orgnummer === valgtSoknad?.arbeidsgiver?.orgnummer) // Samme arbeidstaker
                    .filter((senereSok) => senereSok.tom! < valgtSoknad!.fom!) // Gjelder søknader før valgt
                    .filter((tidligereSok) => tidligereSoknaderInnenfor16Dager(tidligereSok.tom!, valgtSoknad.fom!))
                if (tidligereSoknader.length > 0) {
                    if (harTidligereUtenOpphold(tidligereSoknader)) {
                        await utenOppholdSjekkArbeidsgiverperiode(tidligereSoknader)
                    } else {
                        await medOppholdSjekkArbeidsgiverperiode(tidligereSoknader)
                    }
                } else {
                    setKvitteringTekst('over16dager')
                }
            }
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        settRiktigKvitteringTekst().catch((e: Error) => logger.error(e.message))
    }, [settRiktigKvitteringTekst, valgtSoknad?.sendtTilNAVDato])

    if (!valgtSoknad) return null

    return (
        <>
            <Alert variant="success">
                <Heading size="small" level="2">
                    {tekst('kvittering.soknaden-er-sendt')}
                </Heading>
            </Alert>

            <div className="sendt-info">
                <ArbeidstakerStatus />

                <Vis
                    hvis={
                        !sendtForMerEnn30DagerSiden(valgtSoknad?.sendtTilArbeidsgiverDato, valgtSoknad?.sendtTilNAVDato)
                    }
                    render={() => {
                        return (
                            <div className="hva-skjer">
                                <Alert variant="info" size="small">
                                    <Vis
                                        hvis={kvitteringTekst === 'medOpphold'}
                                        render={() => (
                                            <Heading size="small" level="3">
                                                {tekst('kvittering.viktig-informasjon')}
                                            </Heading>
                                        )}
                                    />
                                    <Vis
                                        hvis={kvitteringTekst !== 'medOpphold'}
                                        render={() => (
                                            <Heading size="small" level="3">
                                                {tekst('kvittering.hva-skjer-videre')}
                                            </Heading>
                                        )}
                                    />
                                </Alert>

                                <div className="avsnitt">
                                    <div className="sendt-inner">{kvitteringInnhold()}</div>
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
