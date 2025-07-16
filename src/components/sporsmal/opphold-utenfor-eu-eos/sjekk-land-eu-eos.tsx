import { Controller } from 'react-hook-form'
import { Alert, UNSAFE_Combobox } from '@navikt/ds-react'
import React, { useMemo, useState } from 'react'

import { landlisteEøs, landlisteUtenforEøs } from '../landliste'

export const SjekkLandEuEos = () => {
    // State for the text the user types into the input field
    const [inputValue, setInputValue] = useState('')

    // Memoize the full list of countries
    const alleLand = useMemo(() => {
        return landlisteUtenforEøs.concat(landlisteEøs).sort()
    }, [])

    // Filter the list of options based on what the user has typed
    const filteredOptions = useMemo(
        () => alleLand.filter((land) => land.toLowerCase().includes(inputValue.toLowerCase())),
        [alleLand, inputValue],
    )
    return (
        // The wrapper div no longer needs a ref
        <div className="my-8 rounded border border-gray-400 p-4">
            <Controller
                name="land-i-eu-eos"
                render={({ field }) => {
                    // Ensure field.value is always an array for safety
                    const selectedOptions = Array.isArray(field.value) ? field.value : []

                    // Derive which countries are inside or outside the EU/EØS from the selection
                    const valgtLandIEOS = selectedOptions.filter((land: string) => landlisteEøs.includes(land))
                    const valgtLandUtenforEOS = selectedOptions.filter((land: string) =>
                        landlisteUtenforEøs.includes(land),
                    )

                    // Handler for when an option is selected or deselected
                    const handleToggleSelected = (option: string, isSelected: boolean) => {
                        const newSelectedOptions = isSelected
                            ? [...selectedOptions, option] // Add the option
                            : selectedOptions.filter((item) => item !== option) // Remove the option

                        // Update the form state in react-hook-form
                        field.onChange(newSelectedOptions)
                        // Clear the input field after a selection for better UX
                        setInputValue('')
                    }

                    return (
                        <>
                            <UNSAFE_Combobox
                                id="land-i-eu-eos-combobox"
                                label="Sjekk om landet er utenfor EU/EØS"
                                description="Legg inn alle landene du har vært i, i perioden."
                                className="mt-4 w-full md:w-2/3"
                                isMultiSelect
                                // The full list of all possible options
                                options={alleLand}
                                // The dynamically filtered list based on user input
                                filteredOptions={filteredOptions}
                                // The currently selected options from react-hook-form
                                selectedOptions={selectedOptions}
                                // Handler for selecting/deselecting items
                                onToggleSelected={handleToggleSelected}
                                // --- State for the input field's text value ---
                                value={inputValue}
                                onChange={setInputValue}
                                // By removing `isListOpen`, we let the component control itself,
                                // which fixes the toggle button and click-outside behavior.
                            />

                            {/* Alert for when ONLY EU/EØS countries are selected */}
                            {valgtLandIEOS.length > 0 && valgtLandUtenforEOS.length === 0 && (
                                <Alert
                                    className="mt-8 bg-white"
                                    variant="info"
                                    closeButton
                                    onClose={() => field.onChange([])}
                                >
                                    Du har ikke reist utenfor EU/EØS. Svar nei på dette spørsmålet.
                                </Alert>
                            )}

                            {/* Alert for when ANY non-EU/EØS country is selected */}
                            {valgtLandUtenforEOS.length > 0 && (
                                <Alert
                                    className="mt-8 bg-white"
                                    variant="info"
                                    closeButton
                                    onClose={() => field.onChange([])}
                                >
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
