import { Heading } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import dayjs from 'dayjs'
import React, { Fragment, useEffect, useState } from 'react'
import { CheckmarkCircleFillIcon } from '@navikt/aksel-icons'
import { useQueryClient } from '@tanstack/react-query'

import { RSMottaker } from '../../types/rs-types/rs-mottaker'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { sendtForMerEnn30DagerSiden } from '../../utils/dato-utils'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'
import useSoknader from '../../hooks/useSoknader'
import { RSSoknadmetadata } from '../../types/rs-types/rs-soknadmetadata'
import useSykmelding from '../../hooks/useSykmelding'
import { mottakerSoknadQueryFn } from '../../hooks/useMottakerSoknad'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'

import Inntil16dager from './innhold/arbeidstaker/inntil16dager'
import Over16dager from './innhold/arbeidstaker/over16dager'
import PerioderMedOpphold from './innhold/arbeidstaker/perioder-med-opphold'
import PerioderUtenOpphold from './innhold/arbeidstaker/perioder-uten-opphold'
import ArbeidstakerStatus from './status/arbeidstaker-status'
import { InntektSN } from './innhold/arbeidstaker/gjentagende-segmenter/InntektSN'
import GridItems from './grid-items'
import { KvtteringPanel } from './kvittering-panel'

type ArbeidstakerKvitteringTekst = 'inntil16dager' | 'over16dager' | 'utenOpphold' | 'medOpphold' | undefined

const Arbeidstaker = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    const { data: soknader } = useSoknader()
    const { data: valgtSykmelding } = useSykmelding(valgtSoknad?.sykmeldingId)
    const [kvitteringTekst, setKvitteringTekst] = useState<ArbeidstakerKvitteringTekst>()
    const queryClient = useQueryClient()

    const harSvartAndreInntektskilderSN =
        valgtSoknad?.sporsmal
            ?.find((spm) => spm.tag === 'ANDRE_INNTEKTSKILDER_V2' && spm.svarliste.svar[0]?.verdi === 'JA')
            ?.undersporsmal?.find((spm) => spm.tag === 'HVILKE_ANDRE_INNTEKTSKILDER')
            ?.undersporsmal?.find(
                (spm) => spm.tag === 'INNTEKTSKILDE_SELVSTENDIG' && spm.svarliste.svar[0]?.verdi === 'CHECKED',
            ) !== undefined

    const erInnenforArbeidsgiverperiode = () => {
        if (!valgtSoknad) return

        return valgtSoknad.sendtTilArbeidsgiverDato !== undefined && !valgtSoknad.sendtTilNAVDato
    }

    const erSykmeldingperiodeDeltOverFlereSoknader = () => {
        const fom = dayjs(valgtSoknad!.fom).date()
        const sykFom = dayjs(valgtSykmelding!.sykmeldingsperioder[0].fom).date()
        return fom !== sykFom
    }

    const tidligereSoknaderInnenfor16Dager = (d1: Date, d2: Date): boolean => {
        return dayjs(d2).diff(d1, 'day') <= 16
    }

    const harTidligereUtenOpphold = (tidligereSoknader: RSSoknadmetadata[]) => {
        return tidligereSoknader.filter((sok) => dayjs(valgtSoknad!.fom!).diff(sok.tom!, 'day') <= 1).length > 0
    }

    const utenOppholdSjekkArbeidsgiverperiode = async (tidligereSoknader: RSSoknadmetadata[]) => {
        if (!valgtSoknad) return

        const forrigeSoknad = tidligereSoknader.find((sok) => dayjs(valgtSoknad.fom).diff(sok.tom!, 'day') <= 1)
        const forste = await erForsteSoknadUtenforArbeidsgiverperiode(forrigeSoknad?.id)
        if (forste) {
            setKvitteringTekst('over16dager')
        } else {
            setKvitteringTekst('utenOpphold')
        }
    }

    const medOppholdSjekkArbeidsgiverperiode = async (tidligereSoknader: RSSoknadmetadata[]) => {
        const forrigeSoknad = tidligereSoknader.sort((a, b) => a.tom!.getTime() - b.tom!.getTime()).reverse()[0]
        const forste = await erForsteSoknadUtenforArbeidsgiverperiode(forrigeSoknad?.id)
        if (forste) {
            setKvitteringTekst('over16dager')
        } else {
            setKvitteringTekst('medOpphold')
        }
    }

    async function erForsteSoknadUtenforArbeidsgiverperiode(forrigeSoknadId?: string) {
        if (forrigeSoknadId === undefined) {
            return true
        }
        const mottakerAvForrigeSoknad = await queryClient.fetchQuery(['mottaker', forrigeSoknadId], () =>
            mottakerSoknadQueryFn(forrigeSoknadId),
        )

        return mottakerAvForrigeSoknad === RSMottaker.ARBEIDSGIVER
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

    const settRiktigKvitteringTekst = async () => {
        if (!valgtSoknad || !valgtSykmelding || !soknader) return

        if (erInnenforArbeidsgiverperiode()) {
            setKvitteringTekst('inntil16dager')
        } else {
            if (erSykmeldingperiodeDeltOverFlereSoknader()) {
                setKvitteringTekst('utenOpphold')
            } else {
                const tidligereSoknader = soknader
                    .filter((sok) => sok.status !== RSSoknadstatus.UTGAATT) // Vi sjekker ikke utgåtte søknader
                    .filter((sok) => sok.soknadstype === RSSoknadstype.ARBEIDSTAKERE) // Gjelder arbeidstakersøknad
                    .filter((sok) => sok.arbeidsgiver?.orgnummer === valgtSoknad.arbeidsgiver?.orgnummer) // Samme arbeidstaker
                    .filter((senereSok) => senereSok.tom! < valgtSoknad.fom!) // Gjelder søknader før valgt
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
    }

    useEffect(() => {
        settRiktigKvitteringTekst().catch((e: Error) => logger.error(e))
        // eslint-disable-next-line
    }, [valgtSoknad?.sendtTilNAVDato, valgtSykmelding])

    if (!valgtSoknad || !soknader) return null

    return (
        <KvtteringPanel className="mt-2">
            <GridItems
                venstre={
                    <div className="flex h-full items-center justify-center border-b border-b-border-default bg-surface-success-subtle">
                        <CheckmarkCircleFillIcon title="" fontSize="1.5rem" className="text-icon-success" />
                    </div>
                }
                hoyre={<div className="h-full border-b border-b-border-default bg-surface-success-subtle" />}
            >
                <Heading
                    size="small"
                    level="2"
                    className="border-b border-b-border-default bg-surface-success-subtle py-4"
                >
                    {tekst('kvittering.sendt-til')}
                </Heading>
            </GridItems>
            <GridItems>
                <ArbeidstakerStatus />
            </GridItems>

            <div className="col-span-12 mx-4 mb-8 border-b-2 border-b-gray-200 pb-2" />

            <Vis
                hvis={harSvartAndreInntektskilderSN && kvitteringTekst !== 'inntil16dager'}
                render={() => (
                    <>
                        <GridItems>
                            <Heading size="small" level="3">
                                Innsending av inntektsopplysninger
                            </Heading>
                        </GridItems>
                        <GridItems>
                            <InntektSN />
                        </GridItems>
                        <div className="col-span-12 mx-4 mb-8 border-b-2 border-b-gray-200 pb-2" />
                    </>
                )}
            />

            <Vis
                hvis={!sendtForMerEnn30DagerSiden(valgtSoknad.sendtTilArbeidsgiverDato, valgtSoknad.sendtTilNAVDato)}
                render={() => {
                    return (
                        <>
                            <GridItems>
                                {kvitteringTekst === 'medOpphold' ? (
                                    <Heading size="small" level="3">
                                        {tekst('kvittering.viktig-informasjon')}
                                    </Heading>
                                ) : (
                                    <Heading size="small" level="3">
                                        {tekst('kvittering.hva-skjer-videre')}
                                    </Heading>
                                )}
                            </GridItems>

                            <GridItems>{kvitteringInnhold()}</GridItems>
                        </>
                    )
                }}
            />
        </KvtteringPanel>
    )
}

export default Arbeidstaker
