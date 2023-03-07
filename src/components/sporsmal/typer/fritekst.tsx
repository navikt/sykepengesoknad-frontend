import { TextField } from '@navikt/ds-react'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import FeilLokal from '../../feil/feil-lokal'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'

export const Fritekst = ({ sporsmal }: SpmProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    const feilmelding = hentFeilmelding(sporsmal, errors[sporsmal.id])

    return (
        <div style={{ marginTop: '2rem' }}>
            <TextField
                label={sporsmal.sporsmalstekst}
                description={sporsmal.undertekst}
                type="text"
                id={sporsmal.id}
                autoComplete="off"
                {...register(sporsmal.id, {
                    required: feilmelding.global,
                })}
            />

            <FeilLokal sporsmal={sporsmal} />
        </div>
    )
}
