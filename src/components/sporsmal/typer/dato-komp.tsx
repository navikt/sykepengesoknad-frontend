import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import React, { useEffect } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Vis from '../../../utils/vis';
import tekster from '../sporsmal-tekster';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import { hentSvar } from '../sporsmal-utils';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';
import Flatpickr from 'react-flatpickr';
import { Norwegian } from 'flatpickr/dist/l10n/no.js'
import './flatpickr.less';


const DatoInput = ({ sporsmal }: SpmProps) => {
    const feilmelding = tekster['soknad.feilmelding.' + sporsmal.tag.toLowerCase()];
    const { register, setValue, watch, errors } = useFormContext();
    const watchVerdi = watch(sporsmal.id);

    const onChange = (value: any) => {
        setValue(sporsmal.id, value);
    };

    useEffect(() => {
        setValue(sporsmal.id, hentSvar(sporsmal));
        register({
            name: sporsmal.id,
            validate: { required: feilmelding },
            required: true
        });
        // eslint-disable-next-line
    }, [ register, sporsmal.id, feilmelding ]);

    return (
        <>
            <Element tag="label" className="skjema__sporsmal">
                {sporsmal.sporsmalstekst}
            </Element>

            <Flatpickr
                id={sporsmal.id}
                name={sporsmal.id}
                onChange={onChange}
                value={watchVerdi}
                className="skjemaelement__input input--s"
                placeholder="dd.mm.yyyy"
                options={{
                    minDate: sporsmal.min ? dayjs(sporsmal.min).toDate() : '',
                    maxDate: sporsmal.max ? dayjs(sporsmal.max).toDate() : '',
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
                        {errors[sporsmal.id] && errors[sporsmal.id].message}
                    </Normaltekst>
                </Vis>
            </div>

            <div className="undersporsmal">
                <Vis hvis={watchVerdi !== undefined}>
                    <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} />
                </Vis>
            </div>
        </>
    )
};

export default DatoInput;
