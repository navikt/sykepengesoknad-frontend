import { useFormContext, Controller } from 'react-hook-form'
import { UNSAFE_Combobox } from '@navikt/ds-react'

import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { landlisteEøs, landlisteUtenforEøs } from '../landvelger/landliste'
import { hentFeilmelding } from '../sporsmal-utils'

const Combobox = ({ sporsmal }: SpmProps) => {
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
                <>
                    <UNSAFE_Combobox
                        {...field}
                        id={sporsmal.id}
                        label={sporsmal.sporsmalstekst}
                        error={errors[sporsmal.id] !== undefined && feilmelding.lokal}
                        options={alleLand}
                        onKeyPress={(e) => {
                            e.key === 'Enter' && e.preventDefault()
                        }}
                        className="mt-4 w-full md:w-1/2"
                        onToggleSelected={(option, isSelected) => {
                            isSelected ? field.onChange([option]) : field.onChange([])
                        }}
                        shouldShowSelectedOptions={false}
                        clearButton={false}
                        shouldAutocomplete={true}
                    />
                </>
            )}
        />
    )
}

export default Combobox
