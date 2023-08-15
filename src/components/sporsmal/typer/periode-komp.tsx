import { Button, DatePicker, RangeValidationT, useRangeDatepicker } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { validerFom, validerPeriode, validerTom } from '../../../utils/sporsmal/valider-periode'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { hentPeriode } from '../hent-svar'
import { SpmProps } from '../sporsmal-form/sporsmal-form'

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
    const {
        setValue,
        getValues,
        formState: { isSubmitted },
        trigger,
    } = useFormContext()

    const [periode, setPeriode] = useState<FormPeriode>({ fom: '', tom: '' })
    const id = sporsmal.id + '_' + index
    const [rangeValidation, setRangeValidation] = useState<RangeValidationT | null>(null)

    useEffect(() => {
        const periode = hentPeriode(sporsmal, index)
        setPeriode(periode)
        // eslint-disable-next-line
    }, [sporsmal])

    const { datepickerProps, toInputProps, fromInputProps } = useRangeDatepicker({
        fromDate: sporsmal.min ? new Date(sporsmal.min) : new Date('1900'),
        toDate: sporsmal.max ? new Date(sporsmal.max) : new Date('2100'),
        defaultMonth: sporsmal.max ? new Date(sporsmal.max) : new Date(),
        onRangeChange: (range) => {
            const fom = range?.from ? dayjs(range?.from).format('YYYY-MM-DD') : ''
            const tom = range?.to ? dayjs(range?.to).format('YYYY-MM-DD') : ''
            const nyPeriode = { fom: fom, tom: tom }
            setPeriode(nyPeriode)
            setValue(id, nyPeriode)
        },
        openOnFocus: false,
        allowTwoDigitYear: false,
        onValidate: (val) => {
            setRangeValidation(val)
            if (isSubmitted) {
                trigger(id)
            }
        },
    })

    const captionSkalVises = !sporsmal.max && !sporsmal.min
    const backendStrengTilFrontendFormat = (backendDate: string) => {
        return dayjs(backendDate).format('DD.MM.YYYY')
    }

    return (
        <li id={id} data-cy="periode">
            <Controller
                name={id}
                rules={{
                    validate: {
                        fom: () => validerFom(sporsmal, id, getValues(), rangeValidation),
                        tom: () => validerTom(sporsmal, id, getValues(), rangeValidation),
                        periode: () => validerPeriode(sporsmal, id, getValues()),
                    },
                }}
                render={({ fieldState }) => (
                    <fieldset className="axe-exclude p-0">
                        <DatePicker {...datepickerProps} dropdownCaption={captionSkalVises}>
                            <div>
                                <DatePicker.Input
                                    {...fromInputProps}
                                    label={tekst('sykepengesoknad.periodevelger.fom')}
                                    id={sporsmal.id + '_' + index + '_fom'}
                                    className="mt-6"
                                    error={fieldState.error?.type === 'fom' && fieldState.error.message}
                                    value={periode.fom ? backendStrengTilFrontendFormat(periode.fom) : undefined}
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
                                    value={periode.tom ? backendStrengTilFrontendFormat(periode.tom) : undefined}
                                />
                                <Vis
                                    hvis={index > 0}
                                    render={() => (
                                        <Button
                                            variant="tertiary"
                                            size="small"
                                            id={'btn_' + id}
                                            onClick={(e) => slettPeriode(e, index)}
                                        >
                                            {tekst('sykepengesoknad.periodevelger.slett')}
                                        </Button>
                                    )}
                                />
                            </div>
                        </DatePicker>
                    </fieldset>
                )}
            />
        </li>
    )
}

export default PeriodeKomp
