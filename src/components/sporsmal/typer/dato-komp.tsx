import { Controller, ErrorMessage, useFormContext } from 'react-hook-form';
import React, { useEffect, useRef } from 'react';
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
    const { setValue, errors, watch } = useFormContext();
    const datoRef = useRef<HTMLDivElement>(null);
    const feilmelding = tekster['soknad.feilmelding.' + sporsmal.tag.toLowerCase()];

    useEffect(() => {
        const verdi = hentSvar(sporsmal);
        setValue(sporsmal.id, verdi);
        lagIdForDato();
        // eslint-disable-next-line
    }, [ sporsmal ]);

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
                onChange={(data: any) => {
                    return data[0]
                }}
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
                        <ErrorMessage as="span" errors={errors} name={sporsmal.id}/>
                    </Normaltekst>
                </Vis>
            </div>

            <div className="undersporsmal">
                <Vis hvis={watch(sporsmal.id) !== undefined}>
                    <UndersporsmalListe undersporsmal={sporsmal.undersporsmal}/>
                </Vis>
            </div>
        </div>
    )
};

export default DatoInput;
