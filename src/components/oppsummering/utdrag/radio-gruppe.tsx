import { Label } from '@navikt/ds-react'
import React from 'react'

import { SvarEnums } from '../../../types/enums'
import { Sporsmal } from '../../../types/types'
import Vis from '../../vis'
import { OppsummeringProps } from '../oppsummering'

import Avkrysset from './avkrysset'
import UndersporsmalSum from './undersporsmal-sum'

const RadioGruppe = ({ sporsmal }: OppsummeringProps) => {
    const besvartUndersporsmal: Sporsmal = sporsmal.undersporsmal.find((s) => {
        return s.svarliste.svar.length > 0 && s.svarliste.svar[0].verdi === SvarEnums.CHECKED
    })!
    return (
        <Vis
            hvis={besvartUndersporsmal}
            render={() => (
                <>
                    <Label as="h3">{sporsmal.sporsmalstekst}</Label>
                    <Avkrysset tekst={besvartUndersporsmal.sporsmalstekst} />
                    <UndersporsmalSum sporsmalsliste={besvartUndersporsmal.undersporsmal} />
                </>
            )}
        />
    )
}

export default RadioGruppe
