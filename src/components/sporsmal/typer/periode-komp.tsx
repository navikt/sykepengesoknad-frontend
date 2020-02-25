import tekster from '../sporsmal-tekster';
import { Controller, ErrorMessage, useFormContext } from 'react-hook-form';
import Flatpickr from 'react-flatpickr';
import React, { useEffect } from 'react';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import { Norwegian } from 'flatpickr/dist/l10n/no.js'
import { Normaltekst } from 'nav-frontend-typografi';
import Vis from '../../vis';
import { hentPeriode } from '../hent-svar';

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
        // eslint-disable-next-line
    }, [ sporsmal ]);

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
                className="skjemaelement__input input--m"
                placeholder="dd.mm.yyyy - dd.mm.yyyy"
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

            <div role="alert" aria-live="assertive">
                <Normaltekst tag="span" className="skjemaelement__feilmelding">
                    <ErrorMessage as="p" errors={errors} name={id}/>
                </Normaltekst>
            </div>
        </li>
    )
};

export default PeriodeKomp;
