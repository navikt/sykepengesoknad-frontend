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

export interface FormPeriode {
    fom: string;
    tom: string;
}

type AllProps = SpmProps & PeriodeProps;

const PeriodeKomp = ({ sporsmal, index, slettPeriode }: AllProps) => {
    const { setValue, getValues, errors } = useFormContext()
    const [ periode, setPeriode ] = useState<FormPeriode>({ fom: '', tom: '' })
    const id = sporsmal.id + '_' + index
    const feilmelding = hentFeilmelding(sporsmal)
    Norwegian.rangeSeparator = ' - '

    useEffect(() => {
        const periode = hentPeriode(sporsmal, index)
        setValue(id, periode)
        setPeriode(periode)
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
                    required: feilmelding.global,
                    validate: () => validerPeriode(sporsmal, id, getValues())
                    // TODO: Legg til styling for feilmelding, sånn som dato-komp
                }}
                name={id}
                defaultValue={hentPeriode(sporsmal, index)} // Denne overlapper med useEffect, men må være med for å ikke få warning
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
                                name: name + '_fom'
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
                                name: name + '_tom'
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
                <Vis hvis={errors[id]}>
                    <p>{feilmelding.lokal}</p>
                </Vis>
            </Normaltekst>
        </li>
    )
}

export default PeriodeKomp
