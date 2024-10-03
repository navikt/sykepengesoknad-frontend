import { ConfirmationPanel } from '@navikt/ds-react'
import React from 'react'
import { Controller } from 'react-hook-form'

import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import { useCheckboxNavigasjon } from '../../../utils/tastatur-navigasjon'
import { logEvent } from '../../amplitude/amplitude'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'

const CheckboxInput = ({ sporsmal }: SpmProps) => {
    const spm = sporsmal.tag === 'BEKREFT_OPPLYSNINGER_UTLAND_INFO' ? sporsmal.undersporsmal[0] : sporsmal
    const { valgtSoknad } = useSoknadMedDetaljer()

    useCheckboxNavigasjon(sporsmal)

    const feilmelding = hentFeilmelding(spm)
    return (
        <Controller
            defaultValue={false}
            name={spm.id}
            rules={{
                required: feilmelding.global,
                onChange: (event) => {
                    logEvent('skjema spørsmål besvart', {
                        soknadstype: valgtSoknad?.soknadstype,
                        skjemanavn: 'sykepengesoknad',
                        spørsmål: sporsmal.tag,
                        svar: event.target.value ? 'CHECKED' : 'UNCHECKED',
                    })
                },
            }}
            render={({ field, fieldState }) => (
                <ConfirmationPanel
                    {...field}
                    checked={field.value}
                    id={field.name}
                    label={spm.sporsmalstekst}
                    error={fieldState.error && feilmelding.lokal}
                    data-cy="bekreftCheckboksPanel"
                />
            )}
        />
    )
}

export default CheckboxInput
