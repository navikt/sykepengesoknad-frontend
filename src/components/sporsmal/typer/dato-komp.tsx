import { ErrorMessage, useFormContext } from 'react-hook-form';
import React, { useEffect, useRef, useState } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Vis from '../../vis';
import tekster from '../sporsmal-tekster';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import { hentSvar } from '../sporsmal-utils';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';
import Flatpickr from 'react-flatpickr';
import { Norwegian } from 'flatpickr/dist/l10n/no.js'
import './flatpickr.less';


const DatoInput = ({ sporsmal }: SpmProps) => {
    const [ lokal, setLokal ] = useState<Date>(hentSvar(sporsmal));
    const { register, setValue, errors } = useFormContext();
    const datoRef = useRef<HTMLDivElement>(null);
    const feilmelding = tekster['soknad.feilmelding.' + sporsmal.tag.toLowerCase()];

    const onChange = (value: any) => {
        setValue(sporsmal.id, value);
        setLokal(value);
    };

    useEffect(() => {
        setValue(sporsmal.id, lokal);
        register({
            name: sporsmal.id,
            validate: { required: feilmelding },
            required: true
        });
        lagIdForDato();
        // eslint-disable-next-line
    }, [ sporsmal.id, feilmelding, lokal ]);

    const lagIdForDato = () => {
        const input = datoRef.current.querySelector('.input--s[type=text]');
        input.setAttribute('id', 'input' + sporsmal.id);
        input.setAttribute('autoComplete', 'off');
    };

    return (
        <div ref={datoRef}>
            <label className="skjema__sporsmal" htmlFor={'input' + sporsmal.id}>
                <Element>{sporsmal.sporsmalstekst}</Element>
            </label>

            <Flatpickr
                id={sporsmal.id}
                name={sporsmal.id}
                onChange={onChange}
                value={lokal}
                className="skjemaelement__input input--s"
                placeholder="dd.mm.yyyy"
                options={{
                    minDate: sporsmal.min,
                    maxDate: sporsmal.max,
                    mode: 'single',
                    enableTime: false,
                    dateFormat: 'Y-m-d',
                    altInput: true,
                    altFormat: 'd.m.Y',
                    locale: Norwegian,
                    allowInput: true
                }}
            />

            <div role="alert" aria-live="assertive">
                <Vis hvis={errors[sporsmal.id] !== undefined}>
                    <Normaltekst tag="span" className="skjemaelement__feilmelding">
                        <ErrorMessage errors={errors} name={sporsmal.id} />
                    </Normaltekst>
                </Vis>
            </div>

            <div className="undersporsmal">
                <Vis hvis={lokal !== undefined}>
                    <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} />
                </Vis>
            </div>
        </div>
    )
};

export default DatoInput;
