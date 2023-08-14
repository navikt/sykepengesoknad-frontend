import { BodyShort, Button, DatePicker, RangeValidationT, useRangeDatepicker } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { validerFom, validerPeriode, validerTom } from '../../../utils/sporsmal/valider-periode'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { hentPeriode } from '../hent-svar'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'

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
        formState: { errors, isSubmitted },
        trigger,
    } = useFormContext()

    const [periode, setPeriode] = useState<FormPeriode>({ fom: '', tom: '' })
    const id = sporsmal.id + '_' + index
    const feilmelding = hentFeilmelding(sporsmal, errors[id])
    const [rangeValidation, setRangeValidation] = useState<RangeValidationT | null>(null)

    useEffect(() => {
        const periode = hentPeriode(sporsmal, index)
        setPeriode(periode)
        // eslint-disable-next-line
    }, [sporsmal])

    const { datepickerProps, toInputProps, fromInputProps } = useRangeDatepicker({
        fromDate: sporsmal.min ? new Date(sporsmal.min) : new Date('1900'),
        toDate: sporsmal.max ? new Date(sporsmal.max) : new Date(),
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

    const backendStrengTilFrontendFormat = (backendDate: string) => {
        return dayjs(backendDate).format('DD.MM.YYYY')
    }

    return (
        <li id={id} data-cy="periode">
            <div>
                <Controller
                    name={id}
                    rules={{
                        validate: {
                            fom: () => {
                                const validert = validerFom(sporsmal, id, getValues(), rangeValidation)
                                const div: HTMLElement | null = document.getElementById(id + '_fom')!.parentElement
                                if (validert !== true) {
                                    div?.classList.add('skjemaelement__input--harFeil')
                                } else {
                                    div?.classList.remove('skjemaelement__input--harFeil')
                                }
                                return validert
                            },
                            tom: () => {
                                const validert = validerTom(sporsmal, id, getValues(), rangeValidation)
                                const div: HTMLElement | null = document.getElementById(id + '_tom')!.parentElement
                                if (validert !== true) {
                                    div?.classList.add('skjemaelement__input--harFeil')
                                } else {
                                    div?.classList.remove('skjemaelement__input--harFeil')
                                }
                                return validert
                            },
                            periode: () => {
                                const validert = validerPeriode(sporsmal, id, getValues())
                                const div: HTMLElement | null = document.getElementById(id + '_fom')!.parentElement
                                if (validert !== true) {
                                    div?.classList.add('skjemaelement__input--harFeil')
                                } else {
                                    div?.classList.remove('skjemaelement__input--harFeil')
                                }
                                return validert
                            },
                        },
                    }}
                    render={() => (
                        <div>
                            <fieldset className="axe-exclude p-0">
                                <DatePicker {...datepickerProps}>
                                    <div className="flex-row items-end gap-4 md:flex">
                                        <DatePicker.Input
                                            {...fromInputProps}
                                            label={tekst('sykepengesoknad.periodevelger.fom')}
                                            id={sporsmal.id + '_' + index + '_fom'}
                                            className="mt-6"
                                            value={
                                                periode.fom ? backendStrengTilFrontendFormat(periode.fom) : undefined
                                            }
                                        />

                                        <DatePicker.Input
                                            {...toInputProps}
                                            label={tekst('sykepengesoknad.periodevelger.tom')}
                                            id={sporsmal.id + '_' + index + '_tom'}
                                            className="mt-2 md:mt-0"
                                            value={
                                                periode.tom ? backendStrengTilFrontendFormat(periode.tom) : undefined
                                            }
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
                        </div>
                    )}
                />
            </div>

            <div role="alert" aria-live="assertive">
                <Vis
                    hvis={errors[id]}
                    render={() => (
                        <BodyShort as="span" className="mt-2 block font-bold text-surface-danger" data-cy="feil-lokal">
                            {feilmelding.lokal}
                        </BodyShort>
                    )}
                />
            </div>
        </li>
    )
}

export default PeriodeKomp
