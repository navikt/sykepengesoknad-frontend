import { Checkbox, CheckboxGroup } from '@navikt/ds-react'
import React from 'react'
import { Controller } from 'react-hook-form'

import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import { useCheckboxNavigasjon } from '../../../utils/tastatur-navigasjon'
import { logEvent } from '../../umami/umami'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { cn } from '../../../utils/tw-utils'

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
                <div
                    className={cn(
                        'rounded-(--ax-radius-8) border p-4 transition-colors duration-100',
                        '[&_.aksel-checkbox:focus-within::after]:hidden',
                        fieldState.error
                            ? 'border-ax-border-danger bg-ax-bg-danger-moderate'
                            : field.value
                              ? 'border-ax-border-success bg-ax-bg-success-moderate'
                              : 'border-ax-border-warning bg-ax-bg-warning-moderate',
                    )}
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
                        <Checkbox value={spm.id} data-cy="bekreftCheckboksPanel">
                            {spm.sporsmalstekst}
                        </Checkbox>
                    </CheckboxGroup>
                </div>
            )}
        />
    )
}

export default CheckboxInput
