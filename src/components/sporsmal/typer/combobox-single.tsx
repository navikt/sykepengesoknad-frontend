import { Controller } from 'react-hook-form'
import { UNSAFE_Combobox } from '@navikt/ds-react'
import { useMemo } from 'react'

import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { landlisteEøs, landlisteUtenforEøs } from '../landliste'
import { hentFeilmelding } from '../sporsmal-utils'

const ComboboxSingle = ({ sporsmal }: SpmProps) => {
    const feilmelding = hentFeilmelding(sporsmal)

    const options = useMemo(() => {
        if (sporsmal.tag === 'MEDLEMSKAP_OPPHOLD_UTENFOR_EOS_HVOR') {
            return landlisteUtenforEøs.sort()
        } else {
            return landlisteUtenforEøs.concat(landlisteEøs).sort()
        }
    }, [sporsmal])

    return (
        <Controller
            defaultValue=""
            name={sporsmal.id}
            rules={{ required: feilmelding.global }}
            render={({ field, fieldState }) => (
                <UNSAFE_Combobox
                    id={sporsmal.id}
                    label={sporsmal.sporsmalstekst}
                    error={fieldState.error && feilmelding.lokal}
                    options={options}
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
                            const valgtLand = options.find((land) => optionLowerCase === land.toLowerCase())
                            if (valgtLand) {
                                field.onChange(valgtLand)
                            }
                        } else {
                            field.onChange('')
                        }
                    }}
                />
            )}
        />
    )
}

export default ComboboxSingle
