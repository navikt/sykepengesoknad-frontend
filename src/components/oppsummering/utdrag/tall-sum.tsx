import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'
import { logger } from '@navikt/next-logger'

import { RSSvartype } from '../../../types/rs-types/rs-svartype'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { OppsummeringProps } from '../oppsummering'
import { fjernIndexFraTag } from '../../sporsmal/sporsmal-utils'

const TallSum = ({ sporsmal }: OppsummeringProps) => {
    let labelnokkel = ''

    if (fjernIndexFraTag(sporsmal.tag) === 'HVOR_MANGE_TIMER_PER_UKE') {
        labelnokkel = 'oppsummering.timer'
    } else if (fjernIndexFraTag(sporsmal.tag) === 'HVOR_MYE_TIMER_VERDI') {
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
        <div className="oppsummering__sporsmal">
            <Label as="h3">{sporsmal.sporsmalstekst}</Label>
            <div className="oppsummering__svar">
                {sporsmal.svarliste.svar.map((svarverdi, index) => {
                    return (
                        <Vis
                            hvis={svarverdi.verdi}
                            key={index}
                            render={() => (
                                <BodyShort className="oppsummering__tekst">
                                    {svarverdi.verdi} {label}
                                </BodyShort>
                            )}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default TallSum
