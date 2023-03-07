import { TextField } from '@navikt/ds-react'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import FeilLokal from '../../feil/feil-lokal'
import { SpmProps } from '../sporsmal-form/sporsmal-form'

export const Fritekst = ({ sporsmal }: SpmProps) => {
    const { register } = useFormContext()

    const description = () => {
        const valgfri = sporsmal.min == null

        if (sporsmal.undertekst) {
            if (valgfri) {
                return sporsmal.undertekst + ' (valgfritt)'
            }
            return sporsmal.undertekst
        }
        return valgfri ? 'Valgfritt' : null
    }

    return (
        <div style={{ marginTop: '2rem' }}>
            <TextField
                label={sporsmal.sporsmalstekst}
                description={description()}
                type="text"
                data-cy={sporsmal.tag}
                id={sporsmal.id}
                autoComplete="off"
                {...register(sporsmal.id, {
                    validate: (verdien) => {
                        if (sporsmal.min == null) {
                            return true
                        }
                        const minLengde = parseFloat(sporsmal.min)
                        return verdien.trim().length >= minLengde
                    },
                })}
            />

            <FeilLokal sporsmal={sporsmal} />
        </div>
    )
}
