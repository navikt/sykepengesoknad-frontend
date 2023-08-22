import { Textarea, TextField } from '@navikt/ds-react'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'

export const Fritekst = ({ sporsmal }: SpmProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    const feilmelding = hentFeilmelding(sporsmal)

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

    const props = {
        label: sporsmal.sporsmalstekst,
        description: description(),
        className: 'mt-8 w-full md:w-1/2',
        'data-cy': sporsmal.tag,
        id: sporsmal.id,
        error: errors[sporsmal.id] !== undefined && (errors[sporsmal.id]!.message as string),
        autoComplete: 'off',
        ...register(sporsmal.id, {
            validate: (verdien) => {
                const validerMaxLengde = () => {
                    const maxLengde = parseFloat(sporsmal.max || '0')
                    if (verdien.trim().length <= maxLengde) {
                        return true
                    }
                    return `Du kan skrive maks ${maxLengde} tegn`
                }
                if (sporsmal.min == null) {
                    return validerMaxLengde()
                }
                const minLengde = parseFloat(sporsmal.min)
                if (verdien.trim().length >= minLengde) {
                    return validerMaxLengde()
                }
                return feilmelding.global
            },
        }),
    }
    if (!sporsmal.max) {
        throw Error('Fritekst spørsmål skal ha max verdi')
    }

    if (parseFloat(sporsmal.max) > 100) {
        return <Textarea {...props} />
    }
    return <TextField type="text" {...props} />
}
