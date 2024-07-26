import { FormSummary } from '@navikt/ds-react'
import React from 'react'

import { OppsummeringProps } from '../oppsummering'
import { hentSvar } from '../../sporsmal/hent-svar'
import { SvarEnums } from '../../../types/enums'

import UndersporsmalSum from './undersporsmal-sum'

const RadioGruppe = ({ sporsmal }: OppsummeringProps) => {
    const svar: string = hentSvar(sporsmal)
    const undersporsmal = sporsmal.undersporsmal.filter(
        (undersporsmal) => undersporsmal.parentKriterie === SvarEnums.CHECKED,
    )

    if (!svar) {
        return <UndersporsmalSum sporsmalsliste={undersporsmal}></UndersporsmalSum>
    }

    const undersporsmalMedSporsmalTekst = sporsmal.undersporsmal.filter(
        (undersporsmal) => undersporsmal.sporsmalstekst !== '',
    )

    return (
        <FormSummary.Answer>
            <FormSummary.Label className="radio-label">{sporsmal.sporsmalstekst}</FormSummary.Label>
            <FormSummary.Value>
                {svar}
                {undersporsmalMedSporsmalTekst.length > 0 && (
                    <FormSummary.Answers className={`antall-svar-${sporsmal.undersporsmal.length}`}>
                        <UndersporsmalSum sporsmalsliste={undersporsmalMedSporsmalTekst} />
                    </FormSummary.Answers>
                )}
            </FormSummary.Value>
        </FormSummary.Answer>
    )
}

export default RadioGruppe
