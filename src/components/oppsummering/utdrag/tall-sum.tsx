import { FormSummary } from '@navikt/ds-react'
import React from 'react'
import { logger } from '@navikt/next-logger'

import { RSSvartype } from '../../../types/rs-types/rs-svartype'
import { tekst } from '../../../utils/tekster'
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
    const label = () => {
        switch (sporsmal.tag) {
            case 'NYTT_ARBEIDSFORHOLD_UNDERVEIS_BRUTTO':
            case 'FTA_INNTEKT_UNDERVEIS_BELOP':
                return 'kroner før skatt'
            default:
                return undertekst || tekst(labelnokkel as any)
        }
    }

    return (
        <>
            {sporsmal.svarliste.svar.map((svarverdi, index) => (
                <FormSummary.Answer key={index}>
                    {sporsmal.sporsmalstekst && (
                        <FormSummary.Label className="tall-sum-label">{sporsmal.sporsmalstekst}</FormSummary.Label>
                    )}
                    <FormSummary.Value>
                        {svarverdi.verdi} {label()}
                    </FormSummary.Value>
                </FormSummary.Answer>
            ))}
        </>
    )
}

export default TallSum
