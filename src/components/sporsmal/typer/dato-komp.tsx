import React, { useState } from 'react'
import { useController, useFormContext, useFormState } from 'react-hook-form'
import { UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react'
import dayjs from 'dayjs'

import FeilLokal from '../../feil/feil-lokal'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import validerDato from '../../../utils/sporsmal/valider-dato'

const DatoInput = ({ sporsmal }: SpmProps) => {
    const {
        formState: { errors },
    } = useFormContext()
    const [calendarOpen, setCalendarOpen] = useState(false)

    const { field } = useController({
        name: sporsmal.id,
        rules: {
            validate: (value) => {
                setCalendarOpen(false)
                return validerDato(sporsmal, value)
            },
        },
    })

    const { datepickerProps, inputProps } = UNSAFE_useDatepicker({
        ...field,
        onDateChange: field.onChange,
        defaultSelected: field.value,
        defaultMonth: dayjs(sporsmal.max).toDate(),
    })

    return (
        <div className="dato-komp" data-cy="dato-komp">
            <div className="axe-exclude">
                <UNSAFE_DatePicker
                    {...datepickerProps}
                    dropdownCaption={true}
                    locale="nb"
                    {...(sporsmal.min && { fromDate: dayjs(sporsmal.min).toDate() })}
                    {...(sporsmal.max && { toDate: dayjs(sporsmal.max).toDate() })}
                    open={calendarOpen}
                    onOpenToggle={() => {
                        setCalendarOpen(!calendarOpen)
                    }}
                    data-cy-sporsmalid={sporsmal.id}
                >
                    <UNSAFE_DatePicker.Input
                        {...inputProps}
                        id={sporsmal.id}
                        label={sporsmal.sporsmalstekst}
                        error={errors[field.name] !== undefined}
                        onFocus={() => {
                            setCalendarOpen(true)
                        }}
                        data-cy={sporsmal.id}
                    />
                </UNSAFE_DatePicker>
            </div>

            <FeilLokal sporsmal={sporsmal} />

            <div aria-live="assertive" className="undersporsmal">
                <UndersporsmalListe oversporsmal={sporsmal} />
            </div>
        </div>
    )
}

export default DatoInput
