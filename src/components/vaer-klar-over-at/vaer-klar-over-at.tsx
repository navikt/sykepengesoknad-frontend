import React from 'react'
import { BodyLong, Label } from '@navikt/ds-react'

import { Soknad } from '../../types/types'

import { BehandlingsdagerTekst } from './behandlingsdager-tekst'
import { ReisetilskuddTekst } from './reisetilskudd-tekst'
import { VaerKlarOverAtTekst } from './vaer-klar-over-at-tekst'

export interface VaerKlarOverAtProps {
    soknad: Soknad
}

const vaerKlarOverAtTekst = (soknad: Soknad) => {
    switch (soknad.soknadstype) {
        case 'BEHANDLINGSDAGER':
            return BehandlingsdagerTekst()
        case 'REISETILSKUDD':
            return ReisetilskuddTekst()
        default:
            return VaerKlarOverAtTekst(soknad)
    }
}

const VaerKlarOverAt = ({ soknad }: VaerKlarOverAtProps) => {
    return (
        <div className="til_slutt_seksjon">
            <Label as="h2" className="skjema__sporsmal">
                Viktig å være klar over:
            </Label>
            <BodyLong as="div" className="redaksjonelt-innhold">
                {vaerKlarOverAtTekst(soknad)}
            </BodyLong>
        </div>
    )
}

export default VaerKlarOverAt
