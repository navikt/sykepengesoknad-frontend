import React, { useState } from 'react'
import { Accordion, Heading } from '@navikt/ds-react'

import { TagTyper } from '../../types/enums'
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
import UndertekstSum from './utdrag/undertekst-sum'

export interface OppsummeringProps {
    sporsmal: Sporsmal
}

const Oppsummering = ({ ekspandert, sporsmal }: { ekspandert: boolean; sporsmal: Sporsmal[] }) => {
    const tittel = tekst('sykepengesoknad.oppsummering.tittel')
    const [erApen, setErApen] = useState<boolean>(ekspandert)

    return (
        <Accordion className={'oppsummering my-4 border border-gray-400'} data-cy={'oppsummering-fra-søknaden'}>
            <Accordion.Item open={erApen}>
                <Accordion.Header onClick={() => setErApen(!erApen)} className={'md:pl-8'}>
                    <Heading size="small" level="2">
                        {tittel}
                    </Heading>
                </Accordion.Header>

                <Accordion.Content className={'md:pl-8'}>
                    {sporsmal
                        .filter((sporsmal) => {
                            return skalVisesIOppsummering(sporsmal)
                        })
                        .map((sporsmal, index) => {
                            return (
                                <div className="oppsummering__seksjon" key={index}>
                                    <SporsmalVarianter sporsmal={sporsmal} />
                                </div>
                            )
                        })}
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
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

        case RSSvartype.LAND: {
            return <LandSum sporsmal={sporsmal} />
        }

        case RSSvartype.IKKE_RELEVANT: {
            return <UndertekstSum sporsmal={sporsmal} />
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
