import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import React, { useEffect } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Vis from '../../../utils/vis';
import tekster from '../sporsmal-tekster';
import { SpmProps } from '../sporsmal-form';
import { hentSvar } from '../sporsmal-utils';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';
import Flatpickr from 'react-flatpickr';
import { Norwegian } from 'flatpickr/dist/l10n/no.js'
import './flatpickr.less';


const DatoInput = ({ sporsmal }: SpmProps) => {
    const compId = 'spm_' + sporsmal.id;
    const feilmelding = tekster['soknad.feilmelding.' + sporsmal.tag.toLowerCase()];
    const { register, setValue, watch, errors } = useFormContext();
    const watchVerdi = watch(compId);

    const onChange = (value: any) => {
        setValue(compId, value);
    };

    useEffect(() => {
        setValue(compId, hentSvar(sporsmal));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        register({
            name: compId,
            validate: { required: feilmelding },
            required: true
        });
    }, [ register, compId, feilmelding ]);

    return (
        <>
            <Element tag="label" className="skjema__sporsmal">
                {sporsmal.sporsmalstekst}
            </Element>

            <Flatpickr
                id={compId}
                name={compId}
                onChange={onChange}
                value={watchVerdi}
                options={{
                    minDate: sporsmal.min ? dayjs(sporsmal.min).toDate() : '',
                    maxDate: sporsmal.max ? dayjs(sporsmal.max).toDate() : '',
                    mode: 'single',
                    enableTime: false,
                    dateFormat: 'Y-m-d',
                    altInput: true,
                    altFormat: 'd.m.Y',
                    locale: Norwegian
                }}
            />

            <div role="alert" aria-live="assertive">
                <Vis hvis={errors[compId] !== undefined}>
                    <Normaltekst tag="span" className="skjemaelement__feilmelding">
                        {errors[compId] && errors[compId].message}
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
