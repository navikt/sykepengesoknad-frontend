import { BodyShort, Label } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'

import Vis from '../../vis'
import { OppsummeringProps } from '../oppsummering'

const DatoSum = ({ sporsmal }: OppsummeringProps) => {
    return (
        <div className="oppsummering__sporsmal">
            <Label as="h3">{sporsmal.sporsmalstekst}</Label>
            <div className="oppsummering__tekstsvar">
                {sporsmal.svarliste.svar.map((svarverdi, index) => {
                    return (
                        <Vis
                            hvis={svarverdi.verdi}
                            key={index}
                            render={() => (
                                <BodyShort className="oppsummering__dato">
                                    {dayjs(svarverdi.verdi.toString()).format('DD.MM.YYYY')}
                                </BodyShort>
                            )}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default DatoSum
