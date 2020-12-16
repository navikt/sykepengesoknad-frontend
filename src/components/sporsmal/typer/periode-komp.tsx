import { Norwegian } from 'flatpickr/dist/l10n/no.js'
import { Datepicker } from 'nav-datovelger'
import { Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import { Controller,useFormContext } from 'react-hook-form'

import validerPeriode from '../../../utils/sporsmal/valider-periode'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { hentPeriode } from '../hent-svar'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'

interface PeriodeProps {
    index: number;
    slettPeriode: (e: any, idx: number) => void;
}

interface Periode {
    fom: string;
    tom: string;
}

type AllProps = SpmProps & PeriodeProps;

const PeriodeKomp = ({ sporsmal, index, slettPeriode }: AllProps) => {
    const { setValue, getValues, errors } = useFormContext()
    const [ periode, setPeriode ] = useState<Periode>({ fom: '', tom: '' })
    const id = sporsmal.id + '_' + index
    const feilmelding = hentFeilmelding(sporsmal)
    Norwegian.rangeSeparator = ' - '

    useEffect(() => {
        const periode = hentPeriode(sporsmal, index)
        setValue(id, periode)
        // eslint-disable-next-line
    }, [ sporsmal ]);

    const onChange = (fom?: string, tom?: string) => {
        const nyFom = fom ? fom : periode.fom
        const nyTom = tom ? tom : periode.tom
        const nyPeriode = { fom: nyFom, tom: nyTom }

        setPeriode(nyPeriode)
        setValue(id, nyPeriode)
    }


    return (
        <li className="periode">
            <Controller
                rules={{
                    pattern: { value: /\d/, message: feilmelding.global },
                    validate: () => validerPeriode(sporsmal, id, getValues())
                }}
                name={id}
                defaultValue={hentPeriode(sporsmal, index)}
                render={({ name }) => (
                    <>
                        <label htmlFor={ name + '_fom' } className="fom">
                            {tekst('sykepengesoknad.periodevelger.fom')}
                        </label>
                        <Datepicker
                            locale={'nb'}
                            inputId={ name + '_fom' }
                            onChange={(value) => onChange(value, undefined)}
                            value={periode.fom}
                            inputProps={{
                                name: name
                            }}
                            calendarSettings={{ showWeekNumbers: true }}
                            showYearSelector={false}
                            limitations={{
                                weekendsNotSelectable: false,
                                minDate: sporsmal.min!,
                                maxDate: sporsmal.max!
                            }}
                        />
                        <label htmlFor={ name + '_tom' } className="tom">
                            {tekst('sykepengesoknad.periodevelger.tom')}
                        </label>
                        <Datepicker
                            locale={'nb'}
                            inputId={ name + '_tom' }
                            onChange={(value) => onChange(undefined, value)}
                            value={periode.tom}
                            inputProps={{
                                name: name
                            }}
                            calendarSettings={{ showWeekNumbers: true }}
                            showYearSelector={false}
                            limitations={{
                                weekendsNotSelectable: false,
                                minDate: sporsmal.min!,
                                maxDate: sporsmal.max!
                            }}
                        />
                    </>
                )}
            />
            <Vis hvis={index > 0}>
                <button role="link" id={'btn_' + id} className="periodeknapp lenke slett"
                    onClick={(e) => slettPeriode(e, index)}>
                    {tekst('sykepengesoknad.periodevelger.slett')}
                </button>
            </Vis>

            <Normaltekst tag="div" role="alert" aria-live="assertive" className="skjemaelement__feilmelding">
                <Vis hvis={errors[id]?.type === 'pattern'}>
                    <p>{feilmelding.lokal}</p>
                </Vis>
                <Vis hvis={errors[id]?.type === 'validate'}>
                    <p>Du må oppi en annen periode</p>
                </Vis>
            </Normaltekst>
        </li>
    )
}

export default PeriodeKomp
