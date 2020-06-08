import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { empty } from '../../../utils/constants'
import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import { hentPeriode } from '../../sporsmal/hent-svar'
import Vis from '../../vis'
import { OppsummeringProps } from '../oppsummering'

const PerioderSum = ({ sporsmal }: OppsummeringProps) => {
    return (
        <div className='oppsummering__sporsmal'>
            <Element tag='h3'>{sporsmal.sporsmalstekst}</Element>
            <div className='oppsummering__tekstsvar'>
                {sporsmal.svarliste.svar.map((p, i) => {
                    const periode = hentPeriode(sporsmal, i)
                    return (
                        <Vis hvis={p.verdi !== empty} key={i}>
                            <Normaltekst className='oppsummering__dato'>
                                { tilLesbarPeriodeMedArstall(periode[0], periode[1]) }
                            </Normaltekst>
                        </Vis>
                    )
                })}
            </div>
        </div>
    )
}

export default PerioderSum
