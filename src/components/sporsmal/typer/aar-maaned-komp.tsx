import React, { useState } from 'react'
import { useController } from 'react-hook-form'
import { BodyShort, MonthPicker, MonthValidationT, useMonthpicker } from '@navikt/ds-react'

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
        fromDate: sporsmal.min ? new Date(sporsmal.min) : new Date('1900'),
        toDate: sporsmal.max ? new Date(sporsmal.max) : new Date('2100'),
        defaultYear: sporsmal.max ? new Date(sporsmal.max) : new Date('2100'),
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
