import { Controller } from 'react-hook-form'
import { Alert, UNSAFE_Combobox } from '@navikt/ds-react'
import React, { useMemo, useState } from 'react'

import { landlisteEøs, landlisteUtenforEøs } from '../landliste'
import { hentFeilmelding } from '../sporsmal-utils'
import { SpmProps } from '../sporsmal-form/sporsmal-form'

const ComboboxMultiple = ({ sporsmal }: SpmProps) => {
    const [valgtLandIEOS, setValgtLandIEOS] = useState<string[]>([])
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

    const infoBoksMelding = (): string => {
        if (valgtLandIEOS.length > 1) {
            if (valgtLandIEOS.length === 2) {
                return `${valgtLandIEOS.join(' og ')} ligger innenfor EU/EØS, så du trenger ikke søke for disse landene.`
            }
            return `${valgtLandIEOS.slice(0, valgtLandIEOS.length - 1).join(', ')} og ${valgtLandIEOS[valgtLandIEOS.length - 1]} ligger innenfor EU/EØS, så du trenger ikke søke for disse landene.`
        } else {
            return `${valgtLandIEOS[0]} ligger innenfor EU/EØS, så du trenger ikke søke for dette landet. `
        }
    }

    return (
        <>
            {valgtLandIEOS.length > 0 && (
                <Alert variant="info" closeButton={true} onClose={() => setValgtLandIEOS([])}>
                    {infoBoksMelding()}
                </Alert>
            )}
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
                                    if (landlisteEøs.includes(valgtLand) && sporsmal.tag == 'LAND') {
                                        const alleLand = [...valgtLandIEOS, valgtLand]
                                        setValgtLandIEOS(alleLand)
                                    } else {
                                        field.onChange([...field.value, valgtLand])
                                    }
                                }
                            } else {
                                field.onChange(field.value.filter((item: string) => item !== option))
                                setValgtLandIEOS([])
                            }
                        }}
                    />
                )}
            />
        </>
    )
}

export default ComboboxMultiple
