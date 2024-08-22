import React, { useState } from 'react'
import { FormSummary } from '@navikt/ds-react'
import { useRouter } from 'next/router'

import { RSSvartype } from '../../types/rs-types/rs-svartype'
import { Sporsmal } from '../../types/types'
import { tekst } from '../../utils/tekster'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import SendesTil from '../sporsmal/sporsmal-form/sendes-til'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { SEPARATOR } from '../../utils/constants'
import { useTestpersonQuery } from '../../hooks/useTestpersonQuery'
import EndreModal from '../endreknapp/endreModal'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'

import Behandlingsdager from './utdrag/behandlingsdager'
import CheckboxGruppe from './utdrag/checkbox-gruppe'
import CheckboxSum from './utdrag/checkbox-sum'
import DatoSum from './utdrag/dato-sum'
import Fritekst from './utdrag/fritekst'
import JaEllerNei from './utdrag/ja-eller-nei'
import LandSum from './utdrag/land-sum'
import OpplastingSum from './utdrag/opplasting-sum'
import PerioderSum from './utdrag/perioder-sum'
import RadioGruppe from './utdrag/radio-gruppe'
import TallSum from './utdrag/tall-sum'
import IkkeRelevantOppsummering from './utdrag/ikke-relevant-oppsummering'

export interface OppsummeringProps {
    sporsmal: Sporsmal
}

const Oppsummering = () => {
    const { valgtSoknad, soknadId } = useSoknadMedDetaljer()
    const testperson = useTestpersonQuery()
    const router = useRouter()
    const [aapen, setAapen] = useState<boolean>(false)

    const tittel = tekst('sykepengesoknad.oppsummering.tittel')
    if (!valgtSoknad) return null

    const sporsmal: ReadonlyArray<Sporsmal> = valgtSoknad.sporsmal
    const visSendTil = valgtSoknad?.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND
    const skalViseEndre =
        valgtSoknad.status !== RSSoknadstatus.KORRIGERT && valgtSoknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND

    return (
        <>
            <FormSummary className="oppsummering my-8" data-cy="oppsummering-fra-søknaden" aria-label={tittel}>
                <FormSummary.Header>
                    <FormSummary.Heading level="2" className="flex h-full items-center">
                        {tittel}
                    </FormSummary.Heading>
                    {skalViseEndre && (
                        <FormSummary.EditLink
                            href={`/syk/sykepengesoknad/soknader/${soknadId}${SEPARATOR}2${testperson.query()}`}
                            onClick={(e) => {
                                e.preventDefault()
                                const maKorrigeres =
                                    router.pathname.includes('/kvittering') || router.pathname.includes('/sendt')
                                if (maKorrigeres) {
                                    setAapen(true)
                                } else {
                                    router.push(`/soknader/${soknadId}${SEPARATOR}2${testperson.query()}`)
                                }
                            }}
                        />
                    )}
                </FormSummary.Header>

                <FormSummary.Answers>
                    {visSendTil && <SendesTil soknad={valgtSoknad} />}
                    {sporsmal?.filter(skalVisesIOppsummering).map((sporsmal, index) => {
                        return <SporsmalVarianter sporsmal={sporsmal} key={index} />
                    })}
                </FormSummary.Answers>
            </FormSummary>
            <EndreModal aapen={aapen} setAapen={setAapen} />
        </>
    )
}

export default Oppsummering

export const SporsmalVarianter = ({ sporsmal }: OppsummeringProps) => {
    switch (sporsmal.svartype) {
        case RSSvartype.CHECKBOX_PANEL:
        case RSSvartype.CHECKBOX: {
            return <CheckboxSum sporsmal={sporsmal} />
        }

        case RSSvartype.JA_NEI: {
            return <JaEllerNei sporsmal={sporsmal} />
        }

        case RSSvartype.DATOER:
        case RSSvartype.DATO: {
            return <DatoSum sporsmal={sporsmal} />
        }

        case RSSvartype.PERIODE:
        case RSSvartype.PERIODER: {
            return <PerioderSum sporsmal={sporsmal} />
        }

        case RSSvartype.FRITEKST: {
            return <Fritekst sporsmal={sporsmal} />
        }

        case RSSvartype.COMBOBOX_MULTI:
        case RSSvartype.COMBOBOX_SINGLE:
        case RSSvartype.LAND: {
            return <LandSum sporsmal={sporsmal} />
        }

        case RSSvartype.GRUPPE_AV_UNDERSPORSMAL:
        case RSSvartype.IKKE_RELEVANT: {
            return <IkkeRelevantOppsummering sporsmal={sporsmal} />
        }

        case RSSvartype.CHECKBOX_GRUPPE: {
            return <CheckboxGruppe sporsmal={sporsmal} />
        }

        case RSSvartype.TALL:
        case RSSvartype.PROSENT:
        case RSSvartype.TIMER:
        case RSSvartype.BELOP:
        case RSSvartype.KILOMETER: {
            return <TallSum sporsmal={sporsmal} />
        }

        case RSSvartype.RADIO:
        case RSSvartype.RADIO_GRUPPE_TIMER_PROSENT:
        case RSSvartype.RADIO_GRUPPE: {
            return <RadioGruppe sporsmal={sporsmal} />
        }

        case RSSvartype.INFO_BEHANDLINGSDAGER: {
            return <Behandlingsdager sporsmal={sporsmal} />
        }

        case RSSvartype.KVITTERING: {
            return <OpplastingSum sporsmal={sporsmal} />
        }

        default: {
            return null
        }
    }
}

function skalVisesIOppsummering(sporsmal: Sporsmal) {
    switch (sporsmal.tag) {
        case 'ANSVARSERKLARING':
        case 'BEKREFT_OPPLYSNINGER':
        case 'VAER_KLAR_OVER_AT':
        case 'BEKREFT_OPPLYSNINGER_UTLAND_INFO':
        case 'IKKE_SOKT_UTENLANDSOPPHOLD_INFORMASJON': {
            return false
        }
        default: {
            return true
        }
    }
}
