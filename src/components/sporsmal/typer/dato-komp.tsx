//import { Datepicker } from '@navikt/ds-datepicker'
import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Fieldset, UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react'
import dayjs from 'dayjs'

import { skalBrukeFullskjermKalender } from '../../../utils/browser-utils'
import { fraBackendTilDate } from '../../../utils/dato-utils'
import validerDato from '../../../utils/sporsmal/valider-dato'
import FeilLokal from '../../feil/feil-lokal'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

const DatoInput = ({ sporsmal }: SpmProps) => {
    const { getValues } = useFormContext()

    // dato validator function
    const validerDato = (dato: Date) => {
        if (dato === undefined) return 'Du må oppgi en gyldig dato'

        if (!dato) return 'Datoen følger ikke formatet dd.mm.åååå'
        // Grenseverdier
        if (sporsmal.min && sporsmal.max) {
            if (dato < new Date(sporsmal.min)) {
                return 'Datoen kan ikke være før ' + dayjs(sporsmal.min).format('DD.MM.YYYY')
            }
            if (dato > new Date(sporsmal.max)) {
                return 'Datoen kan ikke være etter ' + dayjs(sporsmal.max).format('DD.MM.YYYY')
            }
        }

        return true;
    }

    const { datepickerProps, inputProps, selectedDay } = UNSAFE_useDatepicker({
        defaultMonth: new Date(sporsmal.max || new Date()),
    })
    return (
        <div className="dato-komp" data-cy="dato-komp">
            <FeilLokal sporsmal={sporsmal} />

            <div aria-live="assertive" className="undersporsmal">
                <UndersporsmalListe oversporsmal={sporsmal} />
            </div>

            {/* fjernes før pr: */}
            {/* http://localhost:8080/syk/sykepengesoknad/soknader/5b769c04-e171-47c9-b79b-23ab8fce331e/3 */}

            <div>
                <Controller
                    name={sporsmal.id}
                    rules={{
                        validate: () => {
                            const div: HTMLDivElement | null = document.querySelector('.ds-datepicker')
                            const values = getValues()
                            const dato = values[sporsmal.id]
                            const detteFeilet = validerDato(dato)
                            if (detteFeilet !== true) {
                                div?.classList.add('skjemaelement__input--harFeil')
                                return detteFeilet
                            }
                            div?.classList.remove('skjemaelement__input--harFeil')
                            return true
    
                        },
                    }}
                    render={({ field }) => (
                        <div>
                            <div className="min-h-96">
                                <UNSAFE_DatePicker
                                    {...datepickerProps}
                                    {...(sporsmal.min && { fromDate: new Date(sporsmal.min) })}
                                    {...(sporsmal.max && { toDate: new Date(sporsmal.max) })}
                                    dropdownCaption={true}
                                    showWeekNumber={true}
                                    disableWeekends={true}
                                    locale="nb"
                                    id={sporsmal.id}
                                    onSelect={field.onChange}
                                    selected={field.value}
                                >
                                    <UNSAFE_DatePicker.Input {...inputProps} label={sporsmal.sporsmalstekst} />
                                </UNSAFE_DatePicker>
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    )
}

export default DatoInput
