import { Button, DatePicker, RangeValidationT, useRangeDatepicker } from '@navikt/ds-react'
import React, { useState } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { TrashIcon } from '@navikt/aksel-icons'

import { validerFom, validerPeriode, validerTom } from '../../../utils/sporsmal/valider-periode'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { kalenderMedDropdownCaption, maanedKalenderApnesPa } from '../sporsmal-utils'

import {
    tilOsloKalenderDatoIsoStreng,
    tilLokalKalenderDatoEllerStandard,
    tilLokalKalenderDatoOpt,
} from './kalender-dato-utils'

interface PeriodeProps {
    index: number
    slettPeriode: (e: any, idx: number) => void
    antallPerioder: number
}

export interface FormPeriode {
    fom: string
    tom: string
}

type AllProps = SpmProps & PeriodeProps

const PeriodeKomp = ({ sporsmal, index, slettPeriode, antallPerioder }: AllProps) => {
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
        fromDate: tilLokalKalenderDatoEllerStandard(sporsmal.min, '1900-01-01'),
        toDate: tilLokalKalenderDatoEllerStandard(sporsmal.max, '2100-01-01'),
        defaultMonth: tilLokalKalenderDatoOpt(maanedKalenderApnesPa(sporsmal.min, sporsmal.max)),
        allowTwoDigitYear: false,
        defaultSelected:
            field.value?.fom && field.value?.tom
                ? {
                      from: tilLokalKalenderDatoOpt(field.value.fom),
                      to: tilLokalKalenderDatoOpt(field.value.tom),
                  }
                : undefined,
        onRangeChange: (range) => {
            field.onChange({
                fom: range?.from ? tilOsloKalenderDatoIsoStreng(range.from) : '',
                tom: range?.to ? tilOsloKalenderDatoIsoStreng(range.to) : '',
            })
        },
        onValidate: (validate) => {
            setRangeValidation(validate)
        },
    })

    const tidsperiode: string | number = antallPerioder > 1 ? index + 1 : ''

    return (
        <li id={id} data-cy="periode">
            <fieldset className="relative px-4 pb-5 pt-12 bg-ax-bg-info-soft">
                <legend className="absolute top-0 left-0 p-4 font-ax-bold">Tidsperiode {tidsperiode}</legend>
                <DatePicker
                    {...datepickerProps}
                    dropdownCaption={kalenderMedDropdownCaption(sporsmal.min, sporsmal.max)}
                >
                    <div>
                        <DatePicker.Input
                            {...fromInputProps}
                            label="Fra og med"
                            id={sporsmal.id + '_' + index + '_fom'}
                            className="mt-4"
                            description="dd.mm.åååå"
                            error={fieldState.error?.type === 'fom' && fieldState.error.message}
                        />
                        <DatePicker.Input
                            {...toInputProps}
                            label="Til og med"
                            id={sporsmal.id + '_' + index + '_tom'}
                            className="mt-4"
                            description="dd.mm.åååå"
                            error={
                                (fieldState.error?.type === 'tom' || fieldState.error?.type === 'periode') &&
                                fieldState.error.message
                            }
                        />
                    </div>
                </DatePicker>

                <div className="mt-2 flex gap-4">
                    {index > 0 && (
                        <Button
                            id={'btn_' + id}
                            variant="tertiary"
                            size="small"
                            icon={<TrashIcon aria-hidden />}
                            onClick={(e) => slettPeriode(e, index)}
                        >
                            Slett periode
                        </Button>
                    )}
                </div>
            </fieldset>
        </li>
    )
}

export default PeriodeKomp
