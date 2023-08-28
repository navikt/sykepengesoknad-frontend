import { BodyShort, Label } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'

import Vis from '../../vis'
import { OppsummeringProps } from '../oppsummering'

const DatoSum = ({ sporsmal }: OppsummeringProps) => {
    return (
        <>
            <Label as="h3">{sporsmal.sporsmalstekst}</Label>
            <>
                {sporsmal.svarliste.svar.map((svarverdi, index) => (
                    <Vis
                        hvis={svarverdi.verdi}
                        key={index}
                        render={() => <BodyShort>{dayjs(svarverdi.verdi.toString()).format('DD.MM.YYYY')}</BodyShort>}
                    />
                ))}
            </>
        </>
    )
}

export default DatoSum
