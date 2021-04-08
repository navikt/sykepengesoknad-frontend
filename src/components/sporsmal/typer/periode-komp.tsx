import './periode-komp.less'

import useMutationObserver from '@rooks/use-mutation-observer'
import { Datepicker } from 'nav-datovelger'
import { Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useRef, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { skalBrukeFullskjermKalender } from '../../../utils/browser-utils'
import { fraBackendTilDate } from '../../../utils/dato-utils'
import { validerFom, validerPeriode, validerTom } from '../../../utils/sporsmal/valider-periode'
import { tekst } from '../../../utils/tekster'
import VisBlock from '../../vis-block'
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
    const { setValue, getValues, errors } = useFormContext()
    const [ periode, setPeriode ] = useState<FormPeriode>({ fom: '', tom: '' })
    const feilmelding = hentFeilmelding(sporsmal)
    const id = sporsmal.id + '_' + index
    const mutationRef = useRef<HTMLDivElement>(null)

    // TODO: Feilmeldinger for andre valideringer enn required

    useEffect(() => {
        const periode = hentPeriode(sporsmal, index)
        setValue(id, periode)
        setPeriode(periode)
        // eslint-disable-next-line
    }, [ sporsmal, setValue ])

    useMutationObserver(mutationRef, (e) => {
        const node: Node = e[1]?.addedNodes[0]
        const knapperad: any = document.querySelectorAll('.knapperad')[0]
        if (node !== undefined) {
            knapperad.style.zIndex = '-1'
            knapperad.style.position = 'relative'
        } else {
            knapperad.removeAttribute('style')
        }
    })

    const onChange = (fom?: string, tom?: string) => {
        const nyFom = fom ? fom : periode.fom
        const nyTom = tom ? tom : periode.tom
        const nyPeriode = { fom: nyFom, tom: nyTom }

        setPeriode(nyPeriode)
        setValue(id, nyPeriode)
    }

    return (
        <li id={id}>
            <div ref={mutationRef} className="periode">
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
                    defaultValue={hentPeriode(sporsmal, index)} // Denne overlapper med useEffect, men må være med for å ikke få warning
                    render={({ name }) => (
                        <fieldset className="skjemagruppe">
                            <div className="fom skjemaelement">
                                <label className="skjemaelement__label" htmlFor={name + '_fom'}>
                                    <Normaltekst tag="span">{tekst('sykepengesoknad.periodevelger.fom')}</Normaltekst>
                                </label>
                                <Datepicker
                                    locale={'nb'}
                                    inputId={name + '_fom'}
                                    onChange={(value) => onChange(value, undefined)}
                                    value={periode.fom}
                                    inputProps={{
                                        name: name + '_fom'
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
                                <label className="skjemaelement__label" htmlFor={name + '_tom'}>
                                    <Normaltekst tag="span">{tekst('sykepengesoknad.periodevelger.tom')}</Normaltekst>
                                </label>
                                <Datepicker
                                    locale={'nb'}
                                    inputId={name + '_tom'}
                                    onChange={(value) => onChange(undefined, value)}
                                    value={periode.tom}
                                    inputProps={{
                                        name: name + '_tom'
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
                <VisBlock hvis={index > 0}
                    render={() =>
                        <button role="link" id={'btn_' + id} className="periodeknapp lenke slett" onClick={(e) =>
                            slettPeriode(e, index)}>
                            {tekst('sykepengesoknad.periodevelger.slett')}
                        </button>
                    }
                />
            </div>

            <div role="alert" aria-live="assertive">
                <VisBlock hvis={errors[id]}
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
