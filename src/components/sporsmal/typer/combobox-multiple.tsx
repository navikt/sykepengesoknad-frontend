import { Controller } from 'react-hook-form'
import { Alert, UNSAFE_Combobox } from '@navikt/ds-react'
import React, { useEffect, useMemo, useState } from 'react'

import { landlisteEøs, landlisteUtenforEøs } from '../landliste'
import { hentFeilmelding } from '../sporsmal-utils'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import useKlikkUtenfor from '../../../hooks/useKlikkUtenfor'

const ComboboxMultiple = ({ sporsmal }: SpmProps) => {
    const [apneListe, setApneListe] = useState(false)
    const { ref, erKlikketUtenfor, settErKlikketUtenfor, erBokstavEllerMellomrom } = useKlikkUtenfor(false)
    const feilmelding = hentFeilmelding(sporsmal)

    const handleToggle = () => {
        setApneListe(!apneListe)
        settErKlikketUtenfor(false)
    }

    useEffect(() => {
        if (erKlikketUtenfor && apneListe) {
            setApneListe(false)
            settErKlikketUtenfor(false)
        }
    }, [erKlikketUtenfor, apneListe, settErKlikketUtenfor])

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
        <div ref={ref}>
            <Controller
                name={sporsmal.id}
                rules={{ required: feilmelding.global }}
                render={({ field, fieldState }) => {
                    // Sjekk om ALLE valgte land er i EØS
                    const alleValgteErIEOS =
                        field.value &&
                        field.value.length > 0 &&
                        field.value.every((land: string) => landlisteEøs.includes(land))

                    return (
                        <>
                            <UNSAFE_Combobox
                                id={sporsmal.id}
                                isMultiSelect
                                isListOpen={apneListe}
                                label={sporsmal.sporsmalstekst}
                                description={sporsmal.undertekst}
                                error={fieldState.error && feilmelding.lokal}
                                options={options}
                                className="mt-4 w-full md:w-1/2"
                                shouldShowSelectedOptions={true}
                                shouldAutocomplete={true}
                                selectedOptions={field.value}
                                onFocus={handleToggle}
                                onKeyDownCapture={(event) => {
                                    if (erBokstavEllerMellomrom(event.key)) {
                                        setApneListe(true)
                                    } else if (event.key === 'Enter') {
                                        event.preventDefault()
                                    } else if (event.key === 'Tab') {
                                        setApneListe(false)
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
