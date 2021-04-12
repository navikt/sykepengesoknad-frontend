import { Element } from 'nav-frontend-typografi'
import React from 'react'

import VisBlock from '../../vis-block'
import { SpmProps } from '../sporsmal-form/sporsmal-form'

const SporsmalstekstH3 = ({ sporsmal }: SpmProps) => {
    return (
        <VisBlock hvis={sporsmal.sporsmalstekst}
            render={() =>
                <Element tag="h3" className="skjema__sporsmal">{sporsmal.sporsmalstekst}</Element>
            }
        />
    )
}

export default SporsmalstekstH3
