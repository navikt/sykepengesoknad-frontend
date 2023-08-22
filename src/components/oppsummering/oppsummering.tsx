import React, { useState } from 'react'
import { ExpansionCard, Heading } from '@navikt/ds-react'

import { TagTyper } from '../../types/enums'
import { RSSvartype } from '../../types/rs-types/rs-svartype'
import { Sporsmal } from '../../types/types'
import { tekst } from '../../utils/tekster'
import { cn } from '../../utils/tw-utils'

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

const Oppsummering = ({ ekspandert, sporsmal }: { ekspandert: boolean; sporsmal: ReadonlyArray<Sporsmal> }) => {
    const tittel = tekst('sykepengesoknad.oppsummering.tittel')
    const [erApen, setErApen] = useState<boolean>(ekspandert)

    return (
        <ExpansionCard
            open={erApen}
            className="oppsummering my-8"
            data-cy="oppsummering-fra-søknaden"
            aria-label={tittel}
        >
            <ExpansionCard.Header onClick={() => setErApen(!erApen)}>
                <Heading size="small" level="2" className="flex h-full items-center">
                    {tittel}
                </Heading>
            </ExpansionCard.Header>

            <ExpansionCard.Content>
                {sporsmal
                    .filter((sporsmal) => {
                        return skalVisesIOppsummering(sporsmal)
                    })
                    .map((sporsmal, index, array) => {
                        const isLastSection = index === array.length - 1

                        return (
                            <div key={index}>
                                <div
                                    className={cn('mb-2 pb-0', {
                                        'mb-8 border-b border-gray-300 pb-8': !isLastSection,
                                    })}
                                >
                                    <SporsmalVarianter sporsmal={sporsmal} />
                                </div>
                            </div>
                        )
                    })}
            </ExpansionCard.Content>
        </ExpansionCard>
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

        case RSSvartype.PERIODER: {
            return <PerioderSum sporsmal={sporsmal} />
        }

        case RSSvartype.FRITEKST: {
            return <Fritekst sporsmal={sporsmal} />
        }

        case RSSvartype.COMBOBOX_SINGLE:
        case RSSvartype.LAND: {
            return <LandSum sporsmal={sporsmal} />
        }

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
        case TagTyper.BEKREFT_OPPLYSNINGER:
        case TagTyper.VAER_KLAR_OVER_AT:
        case TagTyper.BEKREFT_OPPLYSNINGER_UTLAND_INFO:
        case TagTyper.IKKE_SOKT_UTENLANDSOPPHOLD_INFORMASJON: {
            return false
        }
        default: {
            return true
        }
    }
}
