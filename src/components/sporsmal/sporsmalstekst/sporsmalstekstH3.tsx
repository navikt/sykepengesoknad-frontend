import { Label } from '@navikt/ds-react'
import React from 'react'

import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'

const SporsmalstekstH3 = ({ sporsmal }: SpmProps) => {
    return (
        <Vis
            hvis={sporsmal.sporsmalstekst}
            render={() => (
                <Label as="h3" className={sporsmal.undertekst? 'skjema__sporsmal_med_undersporsmal' : 'skjema__sporsmal'}>
                    {sporsmal.sporsmalstekst}
                </Label>
            )}
        />
    )
}

export default SporsmalstekstH3
