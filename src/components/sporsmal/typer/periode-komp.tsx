import { Controller, useFormContext } from 'react-hook-form';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { useEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import tekster from '../sporsmal-tekster';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import { Norwegian } from 'flatpickr/dist/l10n/no.js'
import Vis from '../../vis';
import { hentPeriode } from '../hent-svar';
import { hentFeilmelding } from "../sporsmal-utils";

interface PeriodeProps {
    index: number;
    slettPeriode: (e: any, idx: number) => void;
}

type AllProps = SpmProps & PeriodeProps;

const PeriodeKomp = ({ sporsmal, index, slettPeriode }: AllProps) => {
    const { setValue, errors } = useFormContext();
    const id = sporsmal.id + '_' + index;
    const htmlfor = sporsmal.id + '_t_' + index;
    const feilmelding = hentFeilmelding(sporsmal);

    useEffect(() => {
        setValue(id, hentPeriode(sporsmal, index));
        // eslint-disable-next-line
    }, [ sporsmal ]);

    return (
        <li className="periode">
            <div className="periodelabel">
                <label htmlFor={htmlfor} className="fom">
                    {tekster['sykepengesoknad.periodevelger.fom']}
                </label>
                <label htmlFor={htmlfor} className="tom">
                    {tekster['sykepengesoknad.periodevelger.tom']}
                </label>
            </div>
            <Controller
                as={Flatpickr}
                rules={{
                    pattern: { value: /\d/, message: feilmelding.global }
                }}
                id={id}
                name={id}
                className="skjemaelement__input input--m"
                placeholder="dd.mm.yyyy til dd.mm.yyyy"
                options={{
                    minDate: sporsmal.min,
                    maxDate: sporsmal.max,
                    mode: 'range',
                    enableTime: false,
                    dateFormat: 'F j, Y',
                    altInput: true,
                    altFormat: 'd.m.Y',
                    locale: Norwegian,
                    allowInput: true
                }}
            />

            <Vis hvis={index > 0}>
                <button role="link" id={'btn_' + id} className="periodeknapp lenke slett"
                    onClick={(e) => slettPeriode(e, index)}>
                    {tekster['sykepengesoknad.periodevelger.slett']}
                </button>
            </Vis>

            <Normaltekst tag="div" role="alert" aria-live="assertive" className="skjemaelement__feilmelding">
                <Vis hvis={errors[id]}>
                    <p>{feilmelding.lokal}</p>
                </Vis>
            </Normaltekst>
        </li>
    )
};

export default PeriodeKomp;
