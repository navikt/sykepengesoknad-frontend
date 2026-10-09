import { Controller } from 'react-hook-form'
import { Alert, UNSAFE_Combobox } from '@navikt/ds-react'
import React, { useMemo } from 'react'

import { landlisteEøs, landlisteUtenforEøs } from '../landliste'
import { erLandIEuEos, erLandIEuEosEllerStorbritannia, erStorbritanniaLand } from '../land-utils'
import { hentFeilmelding } from '../sporsmal-utils'
import { SpmProps } from '../sporsmal-form/sporsmal-form'

export const hentAlertTekst = ({
    valgtLand,
    utlandskSykmeldingTrygd,
}: {
    valgtLand: string[]
    utlandskSykmeldingTrygd: boolean
}) => {
    if (utlandskSykmeldingTrygd) {
        return undefined
    }

    if (valgtLand.length === 0) {
        return undefined
    }

    const harKunStorbritannia = valgtLand.every(erStorbritanniaLand)
    const harKunEøs = valgtLand.every(erLandIEuEos)
    const harKunStorbritanniaEllerEøs = valgtLand.every(erLandIEuEosEllerStorbritannia)

    if (harKunStorbritannia) {
        return 'Ved reiser til Storbritannia trenger du ikke å søke.'
    }
    if (harKunEøs) {
        return 'Du har valgt land innenfor EU/EØS og trenger derfor ikke å søke.'
    }
    if (harKunStorbritanniaEllerEøs) {
        return 'Ved reiser til Storbritannia og EU/EØS-land trenger du ikke å søke.'
    }

    return undefined
}

const ComboboxMultiple = ({ sporsmal }: SpmProps) => {
    const feilmelding = hentFeilmelding(sporsmal)
    const utlandskSykmeldingTrygd = sporsmal.tag == 'UTENLANDSK_SYKMELDING_TRYGD_HVILKET_LAND'

    const options = useMemo(() => {
        if (sporsmal.tag == 'LAND') {
            return landlisteUtenforEøs.concat(landlisteEøs).sort()
        }
        if (utlandskSykmeldingTrygd) {
            return landlisteEøs
        }
        throw new Error('Ugyldig tag for landvelger: ' + sporsmal.tag)
    }, [sporsmal.tag, utlandskSykmeldingTrygd])

    return (
        <div>
            <Controller
                name={sporsmal.id}
                rules={{ required: feilmelding.global }}
                render={({ field, fieldState }) => {
                    const valgtLand = field.value ?? []
                    const alertTekst = hentAlertTekst({
                        valgtLand,
                        utlandskSykmeldingTrygd,
                    })

                    return (
                        <>
                            <UNSAFE_Combobox
                                id={sporsmal.id}
                                ref={field.ref}
                                name={field.name}
                                isMultiSelect
                                label={sporsmal.sporsmalstekst}
                                description={sporsmal.undertekst}
                                error={fieldState.error && feilmelding.lokal}
                                options={options}
                                className="mt-4 w-full ax-md:w-1/2"
                                shouldShowSelectedOptions={true}
                                shouldAutocomplete={true}
                                selectedOptions={field.value}
                                onBlur={field.onBlur}
                                onKeyDownCapture={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault()
                                    }
                                }}
                                onToggleSelected={(option: string, isSelected: boolean) => {
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
                            {alertTekst && (
                                <Alert className="mt-8" variant="info" closeButton={true}>
                                    {alertTekst}
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
