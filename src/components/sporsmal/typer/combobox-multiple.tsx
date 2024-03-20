import { Controller } from 'react-hook-form'
import { UNSAFE_Combobox } from '@navikt/ds-react'
import { useMemo } from 'react'

import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { landlisteEøs, landlisteUtenforEøs } from '../landliste'
import { hentFeilmelding } from '../sporsmal-utils'

const ComboboxMultiple = ({ sporsmal }: SpmProps) => {
    const feilmelding = hentFeilmelding(sporsmal)

    const options = useMemo(() => {
        if (sporsmal.tag == 'LAND') {
            return landlisteUtenforEøs
        }
        if (sporsmal.tag == 'UTENLANDSK_SYKMELDING_TRYGD_HVILKET_LAND') {
            return landlisteEøs
        }
        throw new Error('Ugyldig tag for landvelger: ' + sporsmal.tag)
    }, [sporsmal])

    return (
        <Controller
            name={sporsmal.id}
            rules={{ required: feilmelding.global }}
            render={({ field, fieldState }) => (
                <UNSAFE_Combobox
                    id={sporsmal.id}
                    isMultiSelect
                    label={sporsmal.sporsmalstekst}
                    error={fieldState.error && feilmelding.lokal}
                    options={options}
                    className="mt-4 w-full md:w-1/2"
                    shouldShowSelectedOptions={true}
                    shouldAutocomplete={true}
                    selectedOptions={field.value}
                    onKeyDownCapture={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault()
                        }
                    }}
                    onToggleSelected={(option, isSelected) => {
                        if (isSelected) {
                            const optionLowerCase = option.toLowerCase()
                            const valgtLand = options.find((land) => optionLowerCase === land.toLowerCase())
                            if (valgtLand) {
                                field.onChange([...field.value, valgtLand])
                            }
                        } else {
                            field.onChange(field.value.filter((item: string) => item !== option))
                        }
                    }}
                />
            )}
        />
    )
}

export default ComboboxMultiple
