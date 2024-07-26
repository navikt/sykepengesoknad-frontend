import { FormSummary } from '@navikt/ds-react'
import React from 'react'

import { RSSvar } from '../../../types/rs-types/rs-svar'
import { tilLesbarDatoUtenAarstall, tilLesbarPeriodeUtenArstall } from '../../../utils/dato-utils'
import { OppsummeringProps } from '../oppsummering'

const datoEllerIkkeTilBehandling = (svar: RSSvar): string => {
    if (svar === undefined || svar.verdi === '' || svar.verdi === 'Ikke til behandling') {
        return 'Ikke til behandling'
    }
    return tilLesbarDatoUtenAarstall(svar.verdi)
}

const Behandlingsdager = ({ sporsmal }: OppsummeringProps) => {
    return (
        <FormSummary.Answer>
            <FormSummary.Label>{sporsmal.sporsmalstekst}</FormSummary.Label>
            <FormSummary.Value>
                {sporsmal.undersporsmal.length > 0 && (
                    <FormSummary.Answers className={`antall-svar-${sporsmal.undersporsmal.length}`}>
                        {sporsmal.undersporsmal.map((uspm, idx) => (
                            <FormSummary.Answer data-cy="oppsummering__behandlingsdager" key={idx}>
                                <FormSummary.Label>{tilLesbarPeriodeUtenArstall(uspm.min, uspm.max)}</FormSummary.Label>
                                <FormSummary.Value>
                                    {datoEllerIkkeTilBehandling(uspm.svarliste.svar[0])}{' '}
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        ))}
                    </FormSummary.Answers>
                )}
            </FormSummary.Value>
        </FormSummary.Answer>
    )
}

export default Behandlingsdager
