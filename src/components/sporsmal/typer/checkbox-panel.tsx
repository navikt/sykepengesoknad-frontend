import { ConfirmationPanel } from '@navikt/ds-react'
import React from 'react'
import { Controller } from 'react-hook-form'

import { TagTyper } from '../../../types/enums'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import { useCheckbockNavigation } from '../../../utils/keyboard-navigation'

const CheckboxInput = ({ sporsmal }: SpmProps) => {
    const spm = sporsmal.tag === TagTyper.BEKREFT_OPPLYSNINGER_UTLAND_INFO ? sporsmal.undersporsmal[0] : sporsmal

    useCheckbockNavigation(sporsmal)

    const feilmelding = hentFeilmelding(spm)
    return (
        <Controller
            defaultValue={false}
            name={spm.id}
            rules={{ required: feilmelding.global }}
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
