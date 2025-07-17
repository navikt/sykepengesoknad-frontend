import { Controller } from 'react-hook-form'
import { Alert, UNSAFE_Combobox } from '@navikt/ds-react'
import React, { useEffect, useMemo, useState } from 'react'

import { landlisteEøs, landlisteUtenforEøs } from '../landliste'
import { hentFeilmelding } from '../sporsmal-utils'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import useKlikkUtenfor from '../../../hooks/useKlikkUtenfor'

const ComboboxMultiple = ({ sporsmal }: SpmProps) => {
    const [valgtLandIEOS, setValgtLandIEOS] = useState<string[]>([])
    const [apneListe, setApneListe] = useState(false)
    const { ref, erKlikketUtenfor, settErKlikketUtenfor, erBokstavEllerMellomrom } = useKlikkUtenfor(false)
    const feilmelding = hentFeilmelding(sporsmal)

    const handleToggle = () => {
        setApneListe(!apneListe)
        settErKlikketUtenfor(false) // Tilbakestill klikk utenfor tilstand når du veksler
    }

    useEffect(() => {
        if (erKlikketUtenfor && apneListe) {
            setApneListe(false)
            settErKlikketUtenfor(false) // Optionally reset this for next time
        }
    }, [erKlikketUtenfor, apneListe])

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
        <div ref={ref}>
            <Controller
                name={sporsmal.id}
                rules={{ required: feilmelding.global }}
                render={({ field, fieldState }) => (
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


                            // her gjør vi et spesifikt utvvalg for å håndtere eøs land
                            const isIEOS = landlisteEøs.includes(valgtLand) && sporsmal.tag === 'LAND'

                            if (isSelected) {
                                // Add to form value if not already present
                                if (!field.value.includes(valgtLand)) {
                                    field.onChange([...field.value, valgtLand])
                                }
                                // Track IEOS selections separately
                                if (isIEOS && !valgtLandIEOS.includes(valgtLand)) {
                                    setValgtLandIEOS([...valgtLandIEOS, valgtLand])
                                    setApneListe(false)
                                }
                            } else {
                                // Remove from form value
                                field.onChange(field.value.filter((item: string) => item !== valgtLand))
                                // Remove from IEOS state if present
                                if (isIEOS) {
                                    setValgtLandIEOS(valgtLandIEOS.filter((l) => l !== valgtLand))
                                }
                            }
                        }}
                    />
                )}
            />
            {valgtLandIEOS.length > 0 && (
                <Alert className="mt-8" variant="info" closeButton={true} onClose={() => setValgtLandIEOS([])}>
                    {infoBoksMelding()}
                </Alert>
            )}
        </div>
    )
}

export default ComboboxMultiple
