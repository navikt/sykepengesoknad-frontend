import Flatpickr from 'react-flatpickr';
import React, { useEffect, useRef } from 'react';
import { Norwegian } from 'flatpickr/dist/l10n/no.js'
import { Controller, useFormContext } from 'react-hook-form';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Vis from '../../vis';
import { hentSvar } from '../hent-svar';
import { hentFeilmelding } from '../sporsmal-utils';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';
import './flatpickr.less';

const DatoInput = ({ sporsmal }: SpmProps) => {
    const { setValue, errors, watch } = useFormContext();
    const datoRef = useRef<HTMLDivElement>(null);
    const feilmelding = hentFeilmelding(sporsmal);

    useEffect(() => {
        const verdi = hentSvar(sporsmal);
        setValue(sporsmal.id, verdi);
        lagIdForDato();
        // eslint-disable-next-line
    }, [ sporsmal ]);

    useEffect(() => {
        const cls = errors[sporsmal.id]
            ? [ 'skjemaelement__input', 'skjemaelement__input--harFeil' ]
            : [ 'skjemaelement__input' ];
        const input = datoRef.current!.querySelector('.input--m[type=text], .input--m[type=date]');
        input!.classList.add(...cls);
        // eslint-disable-next-line
    }, [ errors[sporsmal.id] ]);

    const lagIdForDato = () => {
        const input = datoRef.current!.querySelector('.input--m[type=text], .input--m[type=date]');
        input!.setAttribute('id', 'input' + sporsmal.id);
        input!.setAttribute('autoComplete', 'off');
    };

    return (
        <div ref={datoRef}>
            <label className='skjema__sporsmal' htmlFor={'input' + sporsmal.id}>
                <Element>{sporsmal.sporsmalstekst}</Element>
            </label>
            <Controller
                as={Flatpickr}
                rules={{ required:feilmelding.global }}
                id={sporsmal.id}
                name={sporsmal.id}
                className='skjemaelement__input input--m'
                placeholder='dd.mm.yyyy'
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

            <Normaltekst tag='div' role='alert' aria-live='assertive' className='skjemaelement__feilmelding'>
                <Vis hvis={errors[sporsmal.id]}>
                    <p>{feilmelding.lokal}</p>
                </Vis>
            </Normaltekst>

            <div className='undersporsmal'>
                <Vis hvis={watch(sporsmal.id)}>
                    <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} />
                </Vis>
            </div>
        </div>
    )
};

export default DatoInput;
