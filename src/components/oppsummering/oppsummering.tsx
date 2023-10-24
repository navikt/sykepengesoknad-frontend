import React, { useState } from 'react'
import { ExpansionCard, Heading } from '@navikt/ds-react'

import { RSSvartype } from '../../types/rs-types/rs-svartype'
import { Sporsmal } from '../../types/types'
import { tekst } from '../../utils/tekster'

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
                {sporsmal.filter(skalVisesIOppsummering).map((sporsmal, index) => {
                    const isFirstSection = index === 0

                    return (
                        <section key={index} className={isFirstSection ? '' : 'mt-8 border-t border-gray-300 pt-8'}>
                            <SporsmalVarianter sporsmal={sporsmal} />
                        </section>
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
