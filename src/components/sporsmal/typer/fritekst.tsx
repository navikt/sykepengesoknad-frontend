import { Textarea, TextField } from '@navikt/ds-react'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'

export const Fritekst = ({ sporsmal }: SpmProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    const feilmelding = hentFeilmelding(sporsmal)
    const [lengde, setLengde] = useState(0)
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

    const maxLengde = parseFloat(sporsmal.max || '0')
    const props = {
        label: sporsmal.sporsmalstekst,
        description: description(),
        className: 'mt-8 w-full md:w-1/2',
        'data-cy': sporsmal.tag,
        id: sporsmal.id,
        error: errors[sporsmal.id] !== undefined && (errors[sporsmal.id]!.message as string),
        autoComplete: 'off',
        ...register(sporsmal.id, {
            onChange: (a) => {
                setLengde(a.target.value.length)
            },
            validate: {
                minLengde: (verdien) => {
                    if (sporsmal.min === null) return true
                    const minLengde = parseFloat(sporsmal.min)
                    if (verdien.trim().length < minLengde) {
                        return feilmelding.global
                    }
                    return true
                },
                maxLengde: (verdien) => {
                    if (sporsmal.max === null) return true
                    if (verdien.trim().length > maxLengde) {
                        return `Du kan skrive maks ${maxLengde} tegn`
                    }
                    return true
                },
            },
        }),
    }
    if (!sporsmal.max) {
        throw Error('Fritekst spørsmål skal ha max verdi')
    }

    if (maxLengde > 100) {
        return <Textarea {...props} maxLength={maxLengde - lengde} />
    }

    return <TextField type="text" {...props} />
}
