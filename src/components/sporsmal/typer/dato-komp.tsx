//import { Datepicker } from '@navikt/ds-datepicker'
import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Fieldset, UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react'
import dayjs from 'dayjs'

import { skalBrukeFullskjermKalender } from '../../../utils/browser-utils'
import { fraBackendTilDate, validerDatoObjekt } from '../../../utils/dato-utils'
import FeilLokal from '../../feil/feil-lokal'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

const DatoInput = ({ sporsmal }: SpmProps) => {
    const { getValues, setValue } = useFormContext()

    const { datepickerProps, inputProps } = UNSAFE_useDatepicker({
        defaultMonth: new Date(sporsmal.max || new Date()),
        onDateChange: (date) => {
            setValue(sporsmal.id, date)
        },
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
                            const valideringsObjekt = validerDatoObjekt(dato, sporsmal.min || '', sporsmal.max || '')
                            if (valideringsObjekt.valid === false) {
                                div?.classList.add('skjemaelement__input--harFeil')
                                return valideringsObjekt.message
                            }
                            div?.classList.remove('skjemaelement__input--harFeil')

                            return valideringsObjekt.valid
                        },
                    }}
                    render={() => (
                        <div>
                            <div className="min-h-96">
                                <UNSAFE_DatePicker
                                    {...datepickerProps}
                                    {...(sporsmal.min && { fromDate: dayjs(sporsmal.min).toDate() })}
                                    {...(sporsmal.max && { toDate: dayjs(sporsmal.max).toDate() })}
                                    dropdownCaption={true}
                                    showWeekNumber={true}
                                    disableWeekends={true}
                                    locale="nb"
                                    id={sporsmal.id}
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
