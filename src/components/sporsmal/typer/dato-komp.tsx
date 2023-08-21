import React from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { BodyShort, DatePicker, useDatepicker } from '@navikt/ds-react'

import FeilLokal from '../../feil/feil-lokal'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import validerDato from '../../../utils/sporsmal/valider-dato'
import { TilbakeIArbeidBesvart } from '../../hjelpetekster/tilbake-i-arbeid-besvart/tilbake-i-arbeid-besvart'
import { maanedKalenderApnesPa } from '../sporsmal-utils'

function DatoInput(props: SpmProps) {
    const { sporsmal } = props
    const {
        formState: { errors },
    } = useFormContext()

    const { field } = useController({
        name: sporsmal.id,
        rules: {
            validate: (value) => {
                return validerDato(sporsmal, value)
            },
        },
    })

    const { datepickerProps, inputProps } = useDatepicker({
        ...field,
        onDateChange: field.onChange,
        defaultSelected: field.value,
        fromDate: sporsmal.min ? new Date(sporsmal.min) : new Date('1900'),
        toDate: sporsmal.max ? new Date(sporsmal.max) : new Date('2100'),
        defaultMonth: maanedKalenderApnesPa(sporsmal.min, sporsmal.max),
        openOnFocus: false,
    })

    return (
        <div className="mt-8" data-cy="dato-komp">
            <div className="axe-exclude">
                <DatePicker {...datepickerProps} dropdownCaption={true} locale="nb" data-cy-sporsmalid={sporsmal.id}>
                    <DatePicker.Input
                        {...inputProps}
                        id={sporsmal.id}
                        label={
                            <>
                                {sporsmal.sporsmalstekst}
                                {sporsmal.undertekst && <BodyShort as="div"> {sporsmal.undertekst} </BodyShort>}
                            </>
                        }
                        error={errors[field.name] !== undefined}
                        data-cy={sporsmal.id}
                    />
                </DatePicker>
            </div>

            <TilbakeIArbeidBesvart sporsmal={sporsmal} fieldValue={field.value} />

            <FeilLokal sporsmal={sporsmal} />

            <div aria-live="assertive">
                <UndersporsmalListe oversporsmal={sporsmal} />
            </div>
        </div>
    )
}

export default DatoInput
