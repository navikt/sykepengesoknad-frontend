import '@navikt/ds-datepicker/lib/index.css'
import './periode-komp.less'

import { Datepicker } from '@navikt/ds-datepicker'
import { BodyShort } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { skalBrukeFullskjermKalender } from '../../../utils/browser-utils'
import { fraBackendTilDate } from '../../../utils/dato-utils'
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
    const { setValue, getValues, formState: { errors } } = useFormContext()
    const [ periode, setPeriode ] = useState<FormPeriode>({ fom: '', tom: '' })
    const id = sporsmal.id + '_' + index
    const feilmelding = hentFeilmelding(sporsmal, errors[id])

    useEffect(() => {
        const periode = hentPeriode(sporsmal, index)
        setPeriode(periode)
        // eslint-disable-next-line
    }, [ sporsmal ])

    const onChange = (fom?: string, tom?: string) => {
        const nyFom = fom ? fom : periode.fom
        const nyTom = tom ? tom : periode.tom
        const nyPeriode = { fom: nyFom, tom: nyTom }

        setPeriode(nyPeriode)
        setValue(id, nyPeriode)
    }

    return (
        <li id={id}>
            <div className="periode">
                <Controller
                    rules={{
                        validate: {
                            fom: () => {
                                const validert = validerFom(sporsmal, id, getValues())
                                const div: HTMLElement | null = document.getElementById(id + '_fom')
                                if (validert !== true) {
                                    div?.classList.add('skjemaelement__input--harFeil')
                                } else {
                                    div?.classList.remove('skjemaelement__input--harFeil')
                                }
                                return validert
                            },
                            tom: () => {
                                const validert = validerTom(sporsmal, id, getValues())
                                const div: HTMLElement | null = document.getElementById(id + '_tom')
                                if (validert !== true) {
                                    div?.classList.add('skjemaelement__input--harFeil')
                                } else {
                                    div?.classList.remove('skjemaelement__input--harFeil')
                                }
                                return validert
                            },
                            periode: () => {
                                const validert = validerPeriode(sporsmal, id, getValues())
                                const div: HTMLElement | null = document.getElementById(id + '_fom')
                                if (validert !== true) {
                                    div?.classList.add('skjemaelement__input--harFeil')
                                } else {
                                    div?.classList.remove('skjemaelement__input--harFeil')
                                }
                                return validert
                            }
                        }
                    }}
                    name={id}
                    render={() => (
                        <fieldset className="skjemagruppe">
                            <div className="fom skjemaelement">
                                <label className="skjemaelement__label" htmlFor={sporsmal.id + '_' + index + '_fom'}>
                                    <BodyShort as="span">{tekst('sykepengesoknad.periodevelger.fom')}</BodyShort>
                                </label>
                                <Datepicker
                                    locale="nb"
                                    inputId={sporsmal.id + '_' + index + '_fom'}
                                    onChange={(value: any) => onChange(value, undefined)}
                                    value={periode.fom}
                                    inputProps={{
                                        name: sporsmal.id + '_' + index + '_fom'
                                    }}
                                    calendarSettings={{
                                        showWeekNumbers: true,
                                        position: skalBrukeFullskjermKalender()
                                    }}
                                    showYearSelector={false}
                                    limitations={{
                                        weekendsNotSelectable: false,
                                        minDate: sporsmal.min || undefined,
                                        maxDate: sporsmal.max || undefined
                                    }}
                                    dayPickerProps={{
                                        initialMonth: fraBackendTilDate(sporsmal.max!)
                                    }}
                                />
                            </div>
                            <div className="tom skjemaelement">
                                <label className="skjemaelement__label" htmlFor={sporsmal.id + '_' + index + '_tom'}>
                                    <BodyShort as="span">{tekst('sykepengesoknad.periodevelger.tom')}</BodyShort>
                                </label>
                                <Datepicker
                                    locale="nb"
                                    inputId={sporsmal.id + '_' + index + '_tom'}
                                    onChange={(value: any) => onChange(undefined, value)}
                                    value={periode.tom}
                                    inputProps={{
                                        name: sporsmal.id + '_' + index + '_tom'
                                    }}
                                    calendarSettings={{
                                        showWeekNumbers: true,
                                        position: skalBrukeFullskjermKalender()
                                    }}
                                    showYearSelector={false}
                                    limitations={{
                                        weekendsNotSelectable: false,
                                        minDate: sporsmal.min || undefined,
                                        maxDate: sporsmal.max || undefined
                                    }}
                                    dayPickerProps={{
                                        initialMonth: fraBackendTilDate(sporsmal.max!)
                                    }}
                                />
                            </div>
                        </fieldset>
                    )}
                />
                <Vis hvis={index > 0}
                    render={() =>
                        <button role="link" id={'btn_' + id} className="lenkeknapp navds-link slett"
                            onClick={(e) => slettPeriode(e, index)}
                        >
                            {tekst('sykepengesoknad.periodevelger.slett')}
                        </button>
                    }
                />
            </div>

            <div role="alert" aria-live="assertive">
                <Vis hvis={errors[id]}
                    render={() =>
                        <BodyShort as="span" className="skjemaelement__feilmelding">
                            {feilmelding.lokal}
                        </BodyShort>
                    }
                />
            </div>
        </li>
    )
}

export default PeriodeKomp
