import dayjs from 'dayjs'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { empty } from '../../../utils/constants'
import VisBlock from '../../vis-block'
import { OppsummeringProps } from '../oppsummering'

const DatoSum = ({ sporsmal }: OppsummeringProps) => {
    return (
        <div className="oppsummering__sporsmal">
            <Element tag="h3">{sporsmal.sporsmalstekst}</Element>
            <div className="oppsummering__tekstsvar">
                {sporsmal.svarliste.svar.map((svarverdi, index) => {
                    return (
                        <VisBlock hvis={svarverdi.verdi !== empty} key={index}
                            render={() => {
                                return (
                                    <Normaltekst className="oppsummering__dato">
                                        {dayjs(svarverdi.verdi.toString()).format('DD.MM.YYYY')}
                                    </Normaltekst>
                                )
                            }}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default DatoSum
