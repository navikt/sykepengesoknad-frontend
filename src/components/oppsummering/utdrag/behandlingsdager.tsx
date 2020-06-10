import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { RSSvar } from '../../../types/rs-types/rs-svar'
import {
    tilLesbarDatoUtenAarstall,
    tilLesbarPeriodeUtenArstall
} from '../../../utils/dato-utils'
import Vis from '../../vis'
import { OppsummeringProps } from '../oppsummering'
import Avkrysset from './avkrysset'

const datoEllerIkkeTilBehandling = (svar: RSSvar): string => {
    if (svar === undefined || svar.verdi === '' || svar.verdi === 'Ikke til behandling') {
        return 'Ikke til behandling'
    }
    return tilLesbarDatoUtenAarstall(svar.verdi)
}

const Behandlingsdager = ({ sporsmal }: OppsummeringProps) => {
    return (
        <>
            <Vis hvis={sporsmal.undersporsmal !== undefined}>
                <div className='oppsummering__sporsmal'>
                    <Element tag='h3'>{sporsmal.sporsmalstekst}</Element>
                    <Vis hvis={sporsmal.undersporsmal.length > 0}>
                        <div className='oppsummering__undersporsmalsliste'>
                            {sporsmal.undersporsmal.map((uspm, idx) => {
                                return (
                                    <div className='oppsummering__sporsmal' key={idx}>
                                        <Element tag='h3'>{tilLesbarPeriodeUtenArstall(uspm.min, uspm.max)}</Element>
                                        <div className='oppsummering__tekstsvar'>
                                            <Normaltekst className='oppsummering__dato'>
                                                <Avkrysset tekst={datoEllerIkkeTilBehandling(uspm.svarliste.svar[ 0 ])} />
                                            </Normaltekst>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </Vis>
                </div>
            </Vis>
        </>
    )
}

export default Behandlingsdager
