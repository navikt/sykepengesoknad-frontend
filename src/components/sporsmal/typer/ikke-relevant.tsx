import { BodyLong, Label } from '@navikt/ds-react'
import React from 'react'

import { parserWithReplace } from '../../../utils/html-react-parser-utils'
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
                    {sporsmal.undertekst && (
                        <BodyLong as="div" className="redaksjonelt-innhold">
                            {parserWithReplace(sporsmal.undertekst)}
                        </BodyLong>
                    )}
                </div>
            )}
        />
    )
}

export default IkkeRelevant
