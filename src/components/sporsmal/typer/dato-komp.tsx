import React from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react'
import dayjs from 'dayjs'

import FeilLokal from '../../feil/feil-lokal'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import validerDato from '../../../utils/sporsmal/valider-dato'
import { TilbakeIArbeidBesvart } from '../../hjelpetekster/tilbake-i-arbeid-besvart/tilbake-i-arbeid-besvart'

function DatoInput(props: SpmProps) {
    const { sporsmal } = props
    const {
        formState: { errors },
    } = useFormContext()

    const finnMinOgMax = () => {
        if (!sporsmal.min && !sporsmal.max) {
            return {
                fromDate: undefined,
                toDate: undefined,
            }
        }
        if (!sporsmal.min && sporsmal.max !== undefined) {
            return {
                fromDate: dayjs('01.01.1900').toDate(),
                toDate: dayjs(sporsmal.max).toDate(),
            }
        }
        if (sporsmal.min !== undefined && !sporsmal.max) {
            return {
                fromDate: dayjs(sporsmal.min).toDate(),
                toDate: dayjs('01.01.2100').toDate(),
            }
        }
        return {
            fromDate: dayjs(sporsmal.min).toDate(),
            toDate: dayjs(sporsmal.max).toDate(),
        }
    }

    const { field } = useController({
        name: sporsmal.id,
        rules: {
            validate: (value) => {
                return validerDato(sporsmal, value)
            },
        },
    })

    const { datepickerProps, inputProps } = UNSAFE_useDatepicker({
        ...field,
        onDateChange: field.onChange,
        defaultSelected: field.value,
        defaultMonth: dayjs(sporsmal.max).toDate(),
        openOnFocus: false,
    })

    return (
        <div className="dato-komp" data-cy="dato-komp">
            <div className="axe-exclude">
                <UNSAFE_DatePicker
                    {...datepickerProps}
                    {...finnMinOgMax()}
                    dropdownCaption={true}
                    locale="nb"
                    data-cy-sporsmalid={sporsmal.id}
                >
                    <UNSAFE_DatePicker.Input
                        {...inputProps}
                        id={sporsmal.id}
                        label={sporsmal.sporsmalstekst}
                        error={errors[field.name] !== undefined}
                        data-cy={sporsmal.id}
                    />
                </UNSAFE_DatePicker>
            </div>

            <TilbakeIArbeidBesvart sporsmal={sporsmal} fieldValue={field.value} />

            <FeilLokal sporsmal={sporsmal} />

            <div aria-live="assertive" className="undersporsmal">
                <UndersporsmalListe oversporsmal={sporsmal} />
            </div>
        </div>
    )
}

export default DatoInput
