import { Box, Checkbox, CheckboxGroup } from '@navikt/ds-react'
import React from 'react'
import { Controller } from 'react-hook-form'

import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import { useCheckboxNavigasjon } from '../../../utils/tastatur-navigasjon'
import { logEvent } from '../../umami/umami'
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
            rules={{ required: feilmelding.global }}
            render={({ field, fieldState }) => (
                <Box
                    background={
                        fieldState.error ? 'danger-moderate' : field.value ? 'success-moderate' : 'warning-moderate'
                    }
                    borderColor={fieldState.error ? 'danger' : field.value ? 'success' : 'warning'}
                    borderRadius="8"
                    borderWidth="1"
                    padding="space-16"
                    className="transition-colors duration-100 [&_.aksel-checkbox:focus-within::after]:hidden"
                >
                    <CheckboxGroup
                        legend={spm.sporsmalstekst}
                        hideLegend
                        error={fieldState.error && feilmelding.lokal}
                        value={field.value ? [spm.id] : []}
                        onChange={(vals) => {
                            const erBekreftet = vals.includes(spm.id)
                            field.onChange(erBekreftet)
                            logEvent('skjema spørsmål besvart', {
                                soknadstype: valgtSoknad?.soknadstype,
                                skjemanavn: 'sykepengesoknad',
                                spørsmål: sporsmal.tag,
                                svar: erBekreftet ? 'CHECKED' : 'UNCHECKED',
                            })
                        }}
                    >
                        <Checkbox value={spm.id}>{spm.sporsmalstekst}</Checkbox>
                    </CheckboxGroup>
                </Box>
            )}
        />
    )
}

export default CheckboxInput
