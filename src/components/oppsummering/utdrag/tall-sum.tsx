import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { RSSvartype } from '../../../types/rs-types/rs-svartype'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { OppsummeringProps } from '../oppsummering'

const TallSum = ({ sporsmal }: OppsummeringProps) => {
    const labelnokkel = sporsmal.svartype === RSSvartype.TIMER ? 'soknad.timer-totalt' : 'soknad.prosent'
    const label = sporsmal.undertekst || tekst(labelnokkel as any)
    return (
        <div className="oppsummering__sporsmal">
            <Element tag="h3">{sporsmal.sporsmalstekst}</Element>
            <div className="oppsummering__svar">
                {sporsmal.svarliste.svar.map((svarverdi, index) => {
                    return (
                        <Vis hvis={svarverdi.verdi} key={index}
                            render={() =>
                                <Normaltekst className="oppsummering__tekst">
                                    {svarverdi.verdi} {label}
                                </Normaltekst>
                            }
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default TallSum
