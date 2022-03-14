import './periode-komp.less'

import { Datepicker } from 'nav-datovelger'
import { Normaltekst } from 'nav-frontend-typografi'
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
    index: number;
    slettPeriode: (e: any, idx: number) => void;
}

export interface FormPeriode {
    fom: string;
    tom: string;
}

type AllProps = SpmProps & PeriodeProps;

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
                                    <Normaltekst tag="span">{tekst('sykepengesoknad.periodevelger.fom')}</Normaltekst>
                                </label>
                                <Datepicker
                                    locale={'nb'}
                                    inputId={sporsmal.id + '_' + index + '_fom'}
                                    onChange={(value) => onChange(value, undefined)}
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
                                    <Normaltekst tag="span">{tekst('sykepengesoknad.periodevelger.tom')}</Normaltekst>
                                </label>
                                <Datepicker
                                    locale={'nb'}
                                    inputId={sporsmal.id + '_' + index + '_tom'}
                                    onChange={(value) => onChange(undefined, value)}
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
                        <button role="link" id={'btn_' + id} className="periodeknapp navds-link slett"
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
                        <Normaltekst tag="span" className="skjemaelement__feilmelding">
                            {feilmelding.lokal}
                        </Normaltekst>
                    }
                />
            </div>
        </li>
    )
}

export default PeriodeKomp
