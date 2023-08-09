import { Heading, Panel } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import dayjs from 'dayjs'
import React, { Fragment, ReactNode, useEffect, useState } from 'react'
import { CheckmarkCircleFillIcon, ExclamationmarkTriangleIcon } from '@navikt/aksel-icons'
import { useRouter } from 'next/router'
import { useQueryClient } from '@tanstack/react-query'

import { RSMottaker } from '../../types/rs-types/rs-mottaker'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { sendtForMerEnn30DagerSiden } from '../../utils/dato-utils'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'
import useSoknad from '../../hooks/useSoknad'
import useSoknader from '../../hooks/useSoknader'
import { RSSoknadmetadata } from '../../types/rs-types/rs-soknadmetadata'
import useSykmelding from '../../hooks/useSykmelding'
import { mottakerSoknadQueryFn } from '../../hooks/useMottakerSoknad'
import { TagTyper } from '../../types/enums'

import Inntil16dager from './innhold/arbeidstaker/inntil16dager'
import Over16dager from './innhold/arbeidstaker/over16dager'
import PerioderMedOpphold from './innhold/arbeidstaker/perioder-med-opphold'
import PerioderUtenOpphold from './innhold/arbeidstaker/perioder-uten-opphold'
import ArbeidstakerStatus from './status/arbeidstaker-status'
import InntektSN from './innhold/arbeidstaker/gjentagende-segmenter/InntektSN'

type ArbeidstakerKvitteringTekst = 'inntil16dager' | 'over16dager' | 'utenOpphold' | 'medOpphold' | undefined

const Arbeidstaker = () => {
    const router = useRouter()
    const { id } = router.query as { id: string; stegId: string }
    const { data: valgtSoknad } = useSoknad(id)
    const { data: soknader } = useSoknader()
    const { data: valgtSykmelding } = useSykmelding(valgtSoknad?.sykmeldingId)
    const [kvitteringTekst, setKvitteringTekst] = useState<ArbeidstakerKvitteringTekst>()
    const queryClient = useQueryClient()

    const harSvartAndreInntektskilderSN =
        valgtSoknad?.sporsmal
            ?.find((spm) => spm.tag === TagTyper.ANDRE_INNTEKTSKILDER_V2 && spm.svarliste.svar[0]?.verdi === 'JA')
            ?.undersporsmal?.find((spm) => spm.tag === TagTyper.HVILKE_ANDRE_INNTEKTSKILDER)
            ?.undersporsmal?.find(
                (spm) => spm.tag === TagTyper.INNTEKTSKILDE_SELVSTENDIG && spm.svarliste.svar[0]?.verdi === 'CHECKED',
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

    function GridItems({ venstre, midt, hoyre }: { venstre: ReactNode; midt: ReactNode; hoyre: ReactNode }) {
        return (
            <>
                <div className="col-span-1">{venstre}</div>
                <div className="col-span-10">{midt}</div>
                <div className="col-span-1">{hoyre}</div>
            </>
        )
    }

    return (
        <Panel border className="mt-2 grid grid-cols-12 gap-y-2 p-0 pb-8">
            <GridItems
                venstre={
                    <div className="flex h-full items-center justify-center border-b border-b-border-default bg-surface-success-subtle">
                        <CheckmarkCircleFillIcon title="" fontSize="1.5rem" className="text-icon-success" />
                    </div>
                }
                midt={
                    <Heading
                        size="small"
                        level="2"
                        className="border-b border-b-border-default bg-surface-success-subtle py-4"
                    >
                        {tekst('kvittering.sendt-til')}
                    </Heading>
                }
                hoyre={<div className="h-full border-b border-b-border-default bg-surface-success-subtle" />}
            />
            <GridItems venstre={<Fragment />} midt={<ArbeidstakerStatus />} hoyre={<Fragment />} />

            <div className="col-span-12 mx-4 mb-8 border-b-2 border-b-gray-200 pb-2" />

            <Vis
                hvis={harSvartAndreInntektskilderSN && kvitteringTekst !== 'inntil16dager'}
                render={() => (
                    <>
                        <GridItems
                            venstre={
                                <div className="flex items-center justify-center">
                                    <ExclamationmarkTriangleIcon
                                        title=""
                                        fontSize="1.5rem"
                                        className="text-icon-warning"
                                    />
                                </div>
                            }
                            midt={
                                <Heading size="small" level="3">
                                    Vi trenger inntektsopplysninger fra deg
                                </Heading>
                            }
                            hoyre={<Fragment />}
                        />
                        <GridItems venstre={<Fragment />} midt={<InntektSN />} hoyre={<Fragment />} />
                        <div className="col-span-12 mx-4 mb-8 border-b-2 border-b-gray-200 pb-2" />
                    </>
                )}
            />

            <Vis
                hvis={!sendtForMerEnn30DagerSiden(valgtSoknad.sendtTilArbeidsgiverDato, valgtSoknad.sendtTilNAVDato)}
                render={() => {
                    return (
                        <>
                            <GridItems
                                venstre={<Fragment />}
                                midt={
                                    kvitteringTekst === 'medOpphold' ? (
                                        <Heading size="small" level="3">
                                            {tekst('kvittering.viktig-informasjon')}
                                        </Heading>
                                    ) : (
                                        <Heading size="small" level="3">
                                            {tekst('kvittering.hva-skjer-videre')}
                                        </Heading>
                                    )
                                }
                                hoyre={<Fragment />}
                            />

                            <GridItems venstre={<Fragment />} midt={kvitteringInnhold()} hoyre={<Fragment />} />
                        </>
                    )
                }}
            />
        </Panel>
    )
}

export default Arbeidstaker
