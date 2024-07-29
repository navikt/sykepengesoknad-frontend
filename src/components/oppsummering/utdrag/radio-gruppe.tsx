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

    const undersporsmalSomErBesvartOgHarUndersporsmal = sporsmal.undersporsmal.filter((undersporsmal) => {
        return undersporsmal.svarliste.svar[0]?.verdi === SvarEnums.CHECKED && undersporsmal.undersporsmal.length > 0
    })
    return (
        <FormSummary.Answer>
            <FormSummary.Label className="radio-label">{sporsmal.sporsmalstekst}</FormSummary.Label>
            <FormSummary.Value>
                {svar}
                {undersporsmalSomErBesvartOgHarUndersporsmal.length > 0 && (
                    <FormSummary.Answers
                        className={`antall-besvarte-${undersporsmalSomErBesvartOgHarUndersporsmal.length}`}
                    >
                        <UndersporsmalSum sporsmalsliste={undersporsmalSomErBesvartOgHarUndersporsmal} />
                    </FormSummary.Answers>
                )}
            </FormSummary.Value>
        </FormSummary.Answer>
    )
}

export default RadioGruppe
