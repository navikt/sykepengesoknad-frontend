import { Controller, useFormContext } from 'react-hook-form';
import React, { useEffect, useRef } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Vis from '../../vis';
import tekster from '../sporsmal-tekster';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import { hentSvar } from '../hent-svar';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';
import Flatpickr from 'react-flatpickr';
import { Norwegian } from 'flatpickr/dist/l10n/no.js'
import './flatpickr.less';

const DatoInput = ({ sporsmal }: SpmProps) => {
    const { setValue, errors, watch } = useFormContext();
    const datoRef = useRef<HTMLDivElement>(null);
    const feilmelding = tekster['soknad.feilmelding.' + sporsmal.tag];
    let feilmelding_lokal = tekster['soknad.feilmelding.' + sporsmal.tag + '.lokal'];
    if (feilmelding_lokal === undefined) {
        feilmelding_lokal = tekster['soknad.feilmelding.dato.lokal'];
    }

    useEffect(() => {
        const verdi = hentSvar(sporsmal);
        setValue(sporsmal.id, verdi);
        lagIdForDato();
        // eslint-disable-next-line
    }, [ sporsmal ]);

    useEffect(() => {
        const cls = errors[sporsmal.id]
            ? ['skjemaelement__input', 'skjemaelement__input--harFeil']
            : ['skjemaelement__input'];
        const input = datoRef.current.querySelector('.input--s[type=text]');
        input.classList.add(...cls);
        // eslint-disable-next-line
    }, [errors[sporsmal.id]]);

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
            <Controller
                as={Flatpickr}
                rules={{ required: feilmelding }}
                id={sporsmal.id}
                name={sporsmal.id}
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

            <Normaltekst tag="div" role="alert" aria-live="assertive" className="skjemaelement__feilmelding">
                <Vis hvis={errors[sporsmal.id]}>
                    <p>{feilmelding_lokal}</p>
                </Vis>
            </Normaltekst>

            <div className="undersporsmal">
                <Vis hvis={watch(sporsmal.id)}>
                    <UndersporsmalListe undersporsmal={sporsmal.undersporsmal}/>
                </Vis>
            </div>
        </div>
    )
};

export default DatoInput;
