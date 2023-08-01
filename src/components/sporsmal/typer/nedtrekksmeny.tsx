import { useFormContext, Controller } from 'react-hook-form'
import { Select } from '@navikt/ds-react'

import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { landlisteEøs, landlisteUtenforEøs } from '../landvelger/landliste'
import { hentFeilmelding } from '../sporsmal-utils'

const Nedtrekksmeny = ({ sporsmal }: SpmProps) => {
    const {
        formState: { errors },
    } = useFormContext()

    const feilmelding = hentFeilmelding(sporsmal)

    const alleLand = [...landlisteUtenforEøs, ...landlisteEøs].sort()
    return (
        <Controller
            name={sporsmal.id}
            rules={{ required: feilmelding.global }}
            render={({ field }) => (
                <Select
                    id={sporsmal.id}
                    {...field}
                    label={sporsmal.sporsmalstekst}
                    error={errors[sporsmal.id] !== undefined && feilmelding.lokal}
                    className="mt-4 w-full md:w-1/2"
                >
                    <option value="">Velg land</option>
                    {alleLand.map((land, index) => (
                        <option key={index} value={land.toLowerCase()}>
                            {land}
                        </option>
                    ))}
                </Select>
            )}
        />
    )
}

export default Nedtrekksmeny
