import tekster from '../sporsmal-tekster';
import { Controller, ErrorMessage, useFormContext } from 'react-hook-form';
import Flatpickr from 'react-flatpickr';
import React, { useEffect } from 'react';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import { Norwegian } from 'flatpickr/dist/l10n/no.js'
import { hentPeriode } from '../sporsmal-utils';
import { Normaltekst } from 'nav-frontend-typografi';

interface PeriodeProps {
    index: number;
    slettPeriode: (e: any, idx: number) => void;
}

type AllProps = SpmProps & PeriodeProps;

const PeriodeKomp = ({ sporsmal, index, slettPeriode }: AllProps) => {
    const { setValue, errors } = useFormContext();
    const id = sporsmal.id + '_' + index;
    const feilmelding = tekster['soknad.feilmelding.' + sporsmal.tag.toLowerCase()];

    useEffect(() => {
        setValue(id, hentPeriode(sporsmal, index));
    }, [ sporsmal ]);

    const onChange = (data: any) => {
        if (data[0][1] !== undefined) {
            const fom: Date = data[0][0];
            const tom: Date = data[0][1];
            return [ fom, tom ];
        }
        return data[0][0];
    };

    return (
        <li className="periode">
            <div className="periodelabel">
                <label htmlFor={id} className="fom">
                    {tekster['sykepengesoknad.periodevelger.fom']}
                </label>
                <label htmlFor={id} className="tom">
                    {tekster['sykepengesoknad.periodevelger.tom']}
                </label>
            </div>
            <Controller
                as={Flatpickr}
                rules={{
                    pattern: { value: /\d/, message: feilmelding }
                }}
                id={id}
                name={id}
                onChange={onChange}
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

            <button role="link" id={'btn_' + id} className="periodeknapp lenke slett"
                    onClick={(e) => slettPeriode(e, index)}>
                {tekster['sykepengesoknad.periodevelger.slett']}
            </button>

            <div role="alert" aria-live="assertive">
                <Normaltekst tag="span" className="skjemaelement__feilmelding">
                    <ErrorMessage as="p" errors={errors} name={id}/>
                </Normaltekst>
            </div>
        </li>
    )
};

export default PeriodeKomp;
