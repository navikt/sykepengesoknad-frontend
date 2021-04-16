import { Element } from 'nav-frontend-typografi'
import React from 'react'

import { Sporsmal } from '../../../types/types'
import { tekst } from '../../../utils/tekster'
import VisBlock from '../../vis-block'
import { OppsummeringProps } from '../oppsummering'
import Avkrysset from './avkrysset'
import UndersporsmalSum from './undersporsmal-sum'

const erUndersporsmalStilt = (sporsmal: Sporsmal): boolean => {
    return sporsmal.svarliste.svar.map((s) => {
        return s.verdi
    }).indexOf(sporsmal.kriterieForVisningAvUndersporsmal) > -1
}

const JaEllerNei = ({ sporsmal }: OppsummeringProps) => {
    const svar = sporsmal.svarliste.svar[0]
    if (!svar || !svar.verdi || sporsmal.svarliste.svar.length === 0) {
        return null
    }

    const svartekst = tekst(`soknad.${svar.verdi.toLowerCase()}` as any)
    return (
        <div className="oppsummering-sporsmal">
            <Element tag="h3">{sporsmal.sporsmalstekst}</Element>
            <Avkrysset tekst={svartekst} />
            <VisBlock hvis={erUndersporsmalStilt(sporsmal)}
                render={() => <UndersporsmalSum sporsmalsliste={sporsmal.undersporsmal} />}
            />
        </div>
    )
}

export default JaEllerNei
