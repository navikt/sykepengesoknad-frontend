import { Element } from 'nav-frontend-typografi'
import React from 'react'

import { SvarEnums } from '../../../types/enums'
import { RSSvartype } from '../../../types/rs-types/rs-svartype'
import { Sporsmal } from '../../../types/types'
import VisBlock from '../../vis-block'
import { OppsummeringProps } from '../oppsummering'
import Avkrysset from './avkrysset'
import UndersporsmalSum from './undersporsmal-sum'

const RadioGruppe = ({ sporsmal }: OppsummeringProps) => {
    const besvartUndersporsmal: Sporsmal = sporsmal.undersporsmal.find((s) => {
        return s.svarliste.svar.length > 0 && s.svarliste.svar[0].verdi === SvarEnums.CHECKED
    })!
    return (
        <VisBlock hvis={besvartUndersporsmal !== undefined}
            render={() => {
                return (
                    <div className="oppsummering__sporsmal">
                        <Element tag="h3" className="oppsummering__overskrift">{sporsmal.sporsmalstekst}</Element>
                        {sporsmal.svartype === RSSvartype.RADIO_GRUPPE &&
                        <Avkrysset tekst={besvartUndersporsmal.sporsmalstekst} />}
                        <UndersporsmalSum sporsmalsliste={besvartUndersporsmal.undersporsmal} />
                    </div>
                )
            }}
        />
    )
}

export default RadioGruppe
