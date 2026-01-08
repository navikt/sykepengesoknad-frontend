import React, { useState } from 'react'
import { useController } from 'react-hook-form'
import { BodyShort, DatePicker, DateValidationT, useDatepicker } from '@navikt/ds-react'

import { SpmProps } from '../sporsmal-form/sporsmal-form'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import validerDato from '../../../utils/sporsmal/valider-dato'
import { TilbakeIArbeidBesvart } from '../../hjelpetekster/tilbake-i-arbeid-besvart/tilbake-i-arbeid-besvart'
import { kalenderMedDropdownCaption, maanedKalenderApnesPa } from '../sporsmal-utils'

function DatoInput(props: SpmProps) {
    const { sporsmal } = props
    const [dateValidation, setDateValidation] = useState<DateValidationT | undefined>(undefined)

    const { field, fieldState } = useController({
        name: sporsmal.id,
        rules: {
            validate: (value) => validerDato(sporsmal, value, dateValidation),
        },
    })

    const { datepickerProps, inputProps } = useDatepicker({
        fromDate: sporsmal.min ? new Date(sporsmal.min) : new Date('1900'),
        toDate: sporsmal.max ? new Date(sporsmal.max) : new Date('2100'),
        defaultMonth: maanedKalenderApnesPa(sporsmal.min, sporsmal.max),
        allowTwoDigitYear: false,
        defaultSelected: field.value,
        onDateChange: field.onChange,
        required: true,
        onValidate: (validate) => {
            setDateValidation(validate)
        },
    })

    return (
        <div className="mt-8" data-cy="dato-komp">
            <div className="axe-exclude">
                <DatePicker
                    {...datepickerProps}
                    locale="nb"
                    dropdownCaption={kalenderMedDropdownCaption(sporsmal.min, sporsmal.max)}
                    data-cy-sporsmalid={sporsmal.id}
                >
                    <DatePicker.Input
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
                        description={<BodyShort size="small">dd.mm.åååå</BodyShort>}
                    />
                </DatePicker>
            </div>

            <TilbakeIArbeidBesvart sporsmal={sporsmal} fieldValue={field.value} />

            <div aria-live="assertive">
                <UndersporsmalListe oversporsmal={sporsmal} />
            </div>
        </div>
    )
}

export default DatoInput
