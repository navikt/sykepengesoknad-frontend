import { Button, DatePicker, RangeValidationT, useRangeDatepicker } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { validerFom, validerPeriode, validerTom } from '../../../utils/sporsmal/valider-periode'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { kalenderMedDropdownCaption, maanedKalenderApnesPa } from '../sporsmal-utils'

interface PeriodeProps {
    index: number
    slettPeriode: (e: any, idx: number) => void
}
export interface FormPeriode {
    fom: string
    tom: string
}

type AllProps = SpmProps & PeriodeProps

const PeriodeKomp = ({ sporsmal, index, slettPeriode }: AllProps) => {
    const { getValues } = useFormContext()
    const [rangeValidation, setRangeValidation] = useState<RangeValidationT | undefined>(undefined)

    const id = sporsmal.id + '_' + index

    const { field, fieldState } = useController({
        name: id,
        rules: {
            validate: {
                fom: (value) => validerFom(sporsmal, value, rangeValidation),
                tom: (value) => validerTom(sporsmal, value, rangeValidation),
                periode: () => validerPeriode(sporsmal, id, getValues()),
            },
        },
    })

    const { datepickerProps, toInputProps, fromInputProps } = useRangeDatepicker({
        fromDate: sporsmal.min ? new Date(sporsmal.min) : new Date('1900'),
        toDate: sporsmal.max ? new Date(sporsmal.max) : new Date('2100'),
        defaultMonth: maanedKalenderApnesPa(sporsmal.min, sporsmal.max),
        openOnFocus: false,
        allowTwoDigitYear: false,
        defaultSelected: field.value
            ? {
                  from: dayjs(field.value.fom).toDate(),
                  to: dayjs(field.value.tom).toDate(),
              }
            : undefined,
        onRangeChange: (range) => {
            const fom = range?.from ? dayjs(range.from).format('YYYY-MM-DD') : ''
            const tom = range?.to ? dayjs(range.to).format('YYYY-MM-DD') : ''
            const nyPeriode = { fom: fom, tom: tom }
            field.onChange(nyPeriode)
        },
        onValidate: (validate) => {
            setRangeValidation(validate)
        },
    })

    return (
        <li id={id} data-cy="periode">
            <fieldset className="axe-exclude p-0">
                <legend className="sr-only">Periodevelger</legend>
                <DatePicker
                    {...datepickerProps}
                    locale="nb"
                    dropdownCaption={kalenderMedDropdownCaption(sporsmal.min, sporsmal.max)}
                >
                    <div>
                        <DatePicker.Input
                            {...fromInputProps}
                            label={tekst('sykepengesoknad.periodevelger.fom')}
                            id={sporsmal.id + '_' + index + '_fom'}
                            className="mt-4"
                            error={fieldState.error?.type === 'fom' && fieldState.error.message}
                            aria-label={`${sporsmal.sporsmalstekst} ${tekst('sykepengesoknad.periodevelger.fom')}`}
                        />
                        <DatePicker.Input
                            {...toInputProps}
                            label={tekst('sykepengesoknad.periodevelger.tom')}
                            id={sporsmal.id + '_' + index + '_tom'}
                            className="mt-4"
                            error={
                                (fieldState.error?.type === 'tom' || fieldState.error?.type === 'periode') &&
                                fieldState.error.message
                            }
                            aria-label={`${sporsmal.sporsmalstekst} ${tekst('sykepengesoknad.periodevelger.tom')}`}
                        />
                    </div>
                </DatePicker>
            </fieldset>
            <Vis
                hvis={index > 0}
                render={() => (
                    <Button
                        type="button"
                        variant="tertiary"
                        size="small"
                        id={'btn_' + id}
                        onClick={(e) => slettPeriode(e, index)}
                    >
                        {tekst('sykepengesoknad.periodevelger.slett')}
                    </Button>
                )}
            />
        </li>
    )
}

export default PeriodeKomp
