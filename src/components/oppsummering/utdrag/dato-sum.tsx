import dayjs from 'dayjs'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import Vis from '../../vis'
import { OppsummeringProps } from '../oppsummering'

const DatoSum = ({ sporsmal }: OppsummeringProps) => {
    return (
        <div className="oppsummering__sporsmal">
            <Element tag="h3">{sporsmal.sporsmalstekst}</Element>
            <div className="oppsummering__tekstsvar">
                {sporsmal.svarliste.svar.map((svarverdi, index) => {
                    return (
                        <Vis hvis={svarverdi.verdi} key={index}
                            render={() =>
                                <Normaltekst className="oppsummering__dato">
                                    {dayjs(svarverdi.verdi.toString()).format('DD.MM.YYYY')}
                                </Normaltekst>
                            }
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default DatoSum
