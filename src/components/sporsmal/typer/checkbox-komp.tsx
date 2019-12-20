import React, { useEffect } from 'react';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import { hentSvar } from '../sporsmal-utils';
import { useFormContext } from 'react-hook-form';
import Vis from '../../../utils/vis';
import { Normaltekst } from 'nav-frontend-typografi';
import AnimateOnMount from '../../animate-on-mount';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';

const CheckboxKomp = ({ sporsmal }: SpmProps) => {
    return (
        <>
            <Vis hvis={sporsmal.sporsmalstekst !== null}>
                <div className="skjema__sporsmal">
                    <Normaltekst tag="span">{sporsmal.sporsmalstekst}</Normaltekst>
                </div>
            </Vis>

            <div className="skjemaelement">
                {sporsmal.undersporsmal.map((uspm, idx) => {
                    return (
                        <CheckboxSingle sporsmal={uspm} key={idx} />
                    )
                })}
            </div>
        </>
    )
};

export default CheckboxKomp;

const CheckboxSingle = ({ sporsmal }: SpmProps) => {
    const { register, setValue, errors, watch } = useFormContext();
    const watchVerdi = watch(sporsmal.id);

    useEffect(() => {
        setValue(sporsmal.id, hentSvar(sporsmal));
        // eslint-disable-next-line
    }, [ sporsmal.id ]);

    const changeValue = (value: string) => {
        setValue(sporsmal.id, value);
    };

    return (
        <div className="checkboksContainer">
            <input type="checkbox"
                id={sporsmal.id}
                name={sporsmal.id}
                checked={watchVerdi}
                aria-checked={watchVerdi}
                onChange={() => changeValue(sporsmal.id)}
                ref={register({ required: 'Et alternativ må velges' })}
                className="skjemaelement__input checkboks"
            />
            <label className="skjemaelement__label" htmlFor={sporsmal.id}>
                {sporsmal.sporsmalstekst}
            </label>

            <AnimateOnMount mounted={watchVerdi} enter="undersporsmal--vis" leave="undersporsmal--skjul" start="undersporsmal">
                <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} />
            </AnimateOnMount>

            <div role="alert" aria-live="assertive">
                <Vis hvis={errors[sporsmal.id] !== undefined}>
                    <Normaltekst tag="span" className="skjemaelement__feilmelding">
                        {errors[sporsmal.id] && errors[sporsmal.id].message}
                    </Normaltekst>
                </Vis>
            </div>
        </div>
    )
};
