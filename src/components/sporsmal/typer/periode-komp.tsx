import { useFormContext } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import Vis from '../../../utils/vis';
import tekster from '../sporsmal-tekster';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import { hentSvar } from '../sporsmal-utils';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';
import Flatpickr from 'react-flatpickr';
import { Norwegian } from 'flatpickr/dist/l10n/no.js'
import './flatpickr.less';

const PeriodeInput = ({ sporsmal }: SpmProps) => {
    const feilmelding = tekster['soknad.feilmelding.' + sporsmal.tag.toLowerCase()];
    const svar = hentSvar(sporsmal);
    const [ lokal, setLokal ] = useState<Date[]>(svar);
    const { register, setValue, errors } = useFormContext();

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
        // eslint-disable-next-line
    }, [ sporsmal.id ]);

    return (
        <div className={sporsmal.parentKriterie ? 'kriterie--' + sporsmal.parentKriterie.toLowerCase() : ''}>
            <Element className="skjema__sporsmal">
                {sporsmal.sporsmalstekst}
            </Element>

            <Flatpickr
                id={sporsmal.id}
                name={sporsmal.id}
                value={lokal}
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
                    allowInput: true,
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
                <Vis hvis={lokal !== undefined}>
                    <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} />
                </Vis>
            </div>
        </div>
    )
};

export default PeriodeInput;
