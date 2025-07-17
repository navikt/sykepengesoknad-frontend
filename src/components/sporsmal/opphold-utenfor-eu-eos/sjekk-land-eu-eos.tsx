import { Controller } from 'react-hook-form'
import { Alert, UNSAFE_Combobox } from '@navikt/ds-react'
import React, { useMemo, useState } from 'react'

import { landlisteEøs, landlisteUtenforEøs } from '../landliste'

export const SjekkLandEuEos = () => {
    const [inputValue, setInputValue] = useState('')

    const alleLand = useMemo(() => {
        return landlisteUtenforEøs.concat(landlisteEøs).sort()
    }, [])

    const filteredOptions = useMemo(
        () => alleLand.filter((land) => land.toLowerCase().includes(inputValue.toLowerCase())),
        [alleLand, inputValue],
    )
    return (
        <div className="my-8 rounded border border-gray-400 p-4">
            <Controller
                name="land-i-eu-eos"
                render={({ field }) => {
                    const selectedOptions = Array.isArray(field.value) ? field.value : []

                    const valgtLandIEOS = selectedOptions.filter((land: string) => landlisteEøs.includes(land))
                    const valgtLandUtenforEOS = selectedOptions.filter((land: string) =>
                        landlisteUtenforEøs.includes(land),
                    )

                    const handleToggleSelected = (option: string, isSelected: boolean) => {
                        const newSelectedOptions = isSelected
                            ? [...selectedOptions, option]
                            : selectedOptions.filter((item) => item !== option)

                        field.onChange(newSelectedOptions)
                        setInputValue('')
                    }

                    return (
                        <>
                            <UNSAFE_Combobox
                                id="land-i-eu-eos-combobox"
                                label="Sjekk om landet er utenfor EU/EØS"
                                description="Legg inn alle landene du har vært i, i perioden."
                                isMultiSelect
                                options={alleLand}
                                filteredOptions={filteredOptions}
                                selectedOptions={selectedOptions}
                                onToggleSelected={handleToggleSelected}
                                value={inputValue}
                                onChange={setInputValue}
                            />

                            {valgtLandIEOS.length > 0 && valgtLandUtenforEOS.length === 0 && (
                                <Alert inline className="mt-8 bg-white" variant="info">
                                    Du har ikke reist utenfor EU/EØS. Svar nei på dette spørsmålet.
                                </Alert>
                            )}

                            {valgtLandUtenforEOS.length > 0 && (
                                <Alert inline className="mt-8 bg-white" variant="info">
                                    Du har reist utenfor EU/EØS.
                                </Alert>
                            )}
                        </>
                    )
                }}
            />
        </div>
    )
}
