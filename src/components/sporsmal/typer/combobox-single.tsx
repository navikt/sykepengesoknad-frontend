import { useFormContext, Controller } from 'react-hook-form'
import { UNSAFE_Combobox } from '@navikt/ds-react'
import { useMemo } from 'react'

import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { landlisteEøs, landlisteUtenforEøs } from '../landvelger/landliste'
import { hentFeilmelding } from '../sporsmal-utils'

const ComboboxSingle = ({ sporsmal }: SpmProps) => {
    const {
        formState: { errors },
    } = useFormContext()

    const feilmelding = hentFeilmelding(sporsmal)

    const alleLand = useMemo(() => [...landlisteUtenforEøs, ...landlisteEøs].sort(), [])

    return (
        <Controller
            defaultValue=""
            name={sporsmal.id}
            rules={{ required: feilmelding.global }}
            render={({ field }) => (
                <>
                    <UNSAFE_Combobox
                        id={sporsmal.id}
                        label={sporsmal.sporsmalstekst}
                        error={errors[sporsmal.id] !== undefined && feilmelding.lokal}
                        options={alleLand}
                        className="mt-4 w-full md:w-1/2"
                        selectedOptions={[field.value]}
                        shouldShowSelectedOptions={true}
                        shouldAutocomplete={true}
                        onKeyDownCapture={(event) => {
                            if (event.key === 'Enter') {
                                event.preventDefault()
                            }
                        }}
                        onToggleSelected={(option, isSelected) => {
                            if (isSelected) {
                                const optionLowerCase = option.toLowerCase()
                                const valgtLand = alleLand.find((land) => optionLowerCase === land.toLowerCase())
                                if (valgtLand) {
                                    field.onChange(valgtLand)
                                }
                            } else {
                                field.onChange('')
                            }
                        }}
                    />
                </>
            )}
        />
    )
}

export default ComboboxSingle
