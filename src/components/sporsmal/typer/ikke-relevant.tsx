import parser from 'html-react-parser'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'

const IkkeRelevant = ({ sporsmal }: SpmProps) => {
    return (
        <Vis hvis={sporsmal.sporsmalstekst !== undefined}>
            <>
                <Element tag="h3" className="skjema__sporsmal">{sporsmal.sporsmalstekst}</Element>
                <div className="redaksjonelt-innhold">
                    <Normaltekst tag="div">{parser(sporsmal.undertekst)}</Normaltekst>
                </div>
            </>
        </Vis>
    )
}

export default IkkeRelevant
