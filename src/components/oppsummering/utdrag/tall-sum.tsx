import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'
import { logger } from '@navikt/next-logger'

import { RSSvartype } from '../../../types/rs-types/rs-svartype'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { OppsummeringProps } from '../oppsummering'

const TallSum = ({ sporsmal }: OppsummeringProps) => {
    let labelnokkel = ''

    if (sporsmal.tag === 'HVOR_MANGE_TIMER_PER_UKE') {
        labelnokkel = 'oppsummering.timer'
    } else if (sporsmal.tag === 'HVOR_MYE_TIMER_VERDI') {
        labelnokkel = 'oppsummering.timer-totalt'
    } else {
        switch (sporsmal.svartype) {
            case RSSvartype.PROSENT:
            case RSSvartype.TALL:
            case RSSvartype.TIMER:
            case RSSvartype.KILOMETER:
            case RSSvartype.BELOP:
                labelnokkel = `oppsummering.${sporsmal.svartype.toLowerCase()}`
                break
            default:
                logger.warn(`Finner ikke oppsummeringstekst for svartype ${sporsmal.svartype}.`)
        }
    }

    const undertekst = sporsmal.undertekst?.includes('Eksempel') === false ? sporsmal.undertekst : undefined
    const label = undertekst || tekst(labelnokkel as any)

    return (
        <>
            <Label as="h3">{sporsmal.sporsmalstekst}</Label>
            <>


                {sporsmal.svarliste.svar.map((svarverdi, index) => (
                    <Vis
                        hvis={svarverdi.verdi}
                        key={index}
                        render={() => (
                            <BodyShort spacing>
                                {svarverdi.verdi} {label}
                            </BodyShort>
                        )}
                    />
                ))}
            </>
        </>
    )
}

export default TallSum
