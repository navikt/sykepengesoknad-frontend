import { BodyLong, Label } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React from 'react'

import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'

const IkkeRelevant = ({ sporsmal }: SpmProps) => {
    return (
        <Vis
            hvis={sporsmal.sporsmalstekst}
            render={() => (
                <div className="til_slutt_seksjon">
                    <Label as="h2" className="skjema__sporsmal">
                        {sporsmal.sporsmalstekst}
                    </Label>
                    <BodyLong as="div" className="redaksjonelt-innhold">
                        {parser(sporsmal.undertekst)}
                    </BodyLong>
                </div>
            )}
        />
    )
}

export default IkkeRelevant
