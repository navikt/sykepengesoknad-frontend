import { FormSummary } from '@navikt/ds-react'
import React from 'react'

import { tekstMedHtml } from '../../../utils/html-react-parser-utils'
import { OppsummeringProps } from '../oppsummering'
import { RSSvartype } from '../../../types/rs-types/rs-svartype'

import UndersporsmalSum from './undersporsmal-sum'

const IkkeRelevantOppsummering = ({ sporsmal }: OppsummeringProps) => {
    if (sporsmal.svartype === RSSvartype.GRUPPE_AV_UNDERSPORSMAL && sporsmal.undersporsmal.length > 0) {
        return <UndersporsmalSum sporsmalsliste={sporsmal.undersporsmal} />
    }
    return (
        <FormSummary.Answer>
            <FormSummary.Label className="gruppe-av-under">{sporsmal.sporsmalstekst}</FormSummary.Label>
            <FormSummary.Value>
                {tekstMedHtml(sporsmal.undertekst || '')}
                {sporsmal.undersporsmal.length > 0 && (
                    <FormSummary.Answers>
                        <UndersporsmalSum sporsmalsliste={sporsmal.undersporsmal} />
                    </FormSummary.Answers>
                )}
            </FormSummary.Value>
        </FormSummary.Answer>
    )
}

export default IkkeRelevantOppsummering
