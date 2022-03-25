import { BodyShort, Label } from '@navikt/ds-react'
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
            <Label as="h3">{sporsmal.sporsmalstekst}</Label>
            <div className="oppsummering__svar">
                {sporsmal.svarliste.svar.map((svarverdi, index) => {
                    return (
                        <Vis hvis={svarverdi.verdi} key={index}
                            render={() =>
                                <BodyShort className="oppsummering__tekst">
                                    {svarverdi.verdi} {label}
                                </BodyShort>
                            }
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default TallSum
