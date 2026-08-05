import { Controller } from 'react-hook-form'
import { Alert, UNSAFE_Combobox } from '@navikt/ds-react'
import React, { useMemo } from 'react'

import { landlisteEøs, landlisteUtenforEøs } from '../landliste'
import { hentFeilmelding } from '../sporsmal-utils'
import { SpmProps } from '../sporsmal-form/sporsmal-form'

const ComboboxMultiple = ({ sporsmal }: SpmProps) => {
    const feilmelding = hentFeilmelding(sporsmal)

    const options = useMemo(() => {
        if (sporsmal.tag == 'LAND') {
            return landlisteUtenforEøs.concat(landlisteEøs).sort()
        }
        if (sporsmal.tag == 'UTENLANDSK_SYKMELDING_TRYGD_HVILKET_LAND') {
            return landlisteEøs
        }
        throw new Error('Ugyldig tag for landvelger: ' + sporsmal.tag)
    }, [sporsmal])

    return (
        <div>
            <Controller
                name={sporsmal.id}
                rules={{ required: feilmelding.global }}
                render={({ field, fieldState }) => {
                    const alleValgteErIEOS =
                        field.value &&
                        field.value.length > 0 &&
                        field.value.every((land: string) => landlisteEøs.includes(land))

                    return (
                        <>
                            <UNSAFE_Combobox
                                id={sporsmal.id}
                                isMultiSelect
                                label={sporsmal.sporsmalstekst}
                                description={sporsmal.undertekst}
                                error={fieldState.error && feilmelding.lokal}
                                options={options}
                                className="mt-4 w-full ax-md:w-1/2"
                                shouldShowSelectedOptions={true}
                                shouldAutocomplete={true}
                                selectedOptions={field.value}
                                onKeyDownCapture={(event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault()
                                    }
                                }}
                                onToggleSelected={(option, isSelected) => {
                                    const optionLowerCase = option.toLowerCase()
                                    const valgtLand = options.find((land) => optionLowerCase === land.toLowerCase())
                                    if (!valgtLand) return

                                    if (isSelected) {
                                        if (!field.value.includes(valgtLand)) {
                                            field.onChange([...field.value, valgtLand])
                                        }
                                    } else {
                                        field.onChange(field.value.filter((item: string) => item !== valgtLand))
                                    }
                                }}
                            />
                            {alleValgteErIEOS && (
                                <Alert className="mt-8" variant="info" closeButton={true}>
                                    Du har kun vært innenfor EU/EØS, så du trenger ikke sende inn søknad.
                                </Alert>
                            )}
                        </>
                    )
                }}
            />
        </div>
    )
}

export default ComboboxMultiple
