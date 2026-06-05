import React, { useState } from 'react'
import { useController } from 'react-hook-form'
import { BodyShort, MonthPicker, MonthValidationT, useMonthpicker } from '@navikt/ds-react'

import { toDate } from '../../../utils/dato-utils'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { kalenderMedDropdownCaption } from '../sporsmal-utils'
import { validerMaaned } from '../../../utils/sporsmal/valider-dato'

function AarMaanedInput(props: SpmProps) {
    const { sporsmal } = props
    const [monthValidation, setMonthValidation] = useState<MonthValidationT | undefined>(undefined)

    const { field, fieldState } = useController({
        name: sporsmal.id,
        rules: {
            validate: (value) => validerMaaned(sporsmal, value, monthValidation),
        },
    })

    const { monthpickerProps, inputProps } = useMonthpicker({
        fromDate: sporsmal.min ? toDate(sporsmal.min) : toDate('1900-01-01'),
        toDate: sporsmal.max ? toDate(sporsmal.max) : toDate('2100-01-01'),
        defaultYear: sporsmal.max ? toDate(sporsmal.max) : toDate('2100-01-01'),
        allowTwoDigitYear: false,
        locale: 'nb',
        onMonthChange: field.onChange,
        required: true,
        onValidate: (validate) => {
            setMonthValidation(validate)
        },
    })

    return (
        <div className="mt-8" data-cy="dato-komp">
            <div className="axe-exclude">
                <MonthPicker
                    {...monthpickerProps}
                    dropdownCaption={kalenderMedDropdownCaption(sporsmal.min, sporsmal.max)}
                    data-cy-sporsmalid={sporsmal.id}
                >
                    <MonthPicker.Input
                        {...inputProps}
                        id={sporsmal.id}
                        label={
                            <>
                                {sporsmal.sporsmalstekst}
                                {sporsmal.undertekst && <BodyShort as="div"> {sporsmal.undertekst} </BodyShort>}
                            </>
                        }
                        error={fieldState.error && fieldState.error.message}
                        data-cy={sporsmal.id}
                    />
                </MonthPicker>
            </div>
        </div>
    )
}

export default AarMaanedInput
