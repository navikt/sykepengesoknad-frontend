import React, { useEffect, useState } from 'react';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import { hentSvar } from '../sporsmal-utils';
import { ErrorMessage, useFormContext } from 'react-hook-form';
import Vis from '../../vis';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import AnimateOnMount from '../../animate-on-mount';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';

const CheckboxKomp = ({ sporsmal }: SpmProps) => {
    const { errors } = useFormContext();

    return (
        <React.Fragment>
            <Vis hvis={sporsmal.sporsmalstekst !== null}>
                <Element tag="h3" className="skjema__sporsmal">{sporsmal.sporsmalstekst}</Element>
            </Vis>

            <div className="skjemaelement">
                {sporsmal.undersporsmal.map((uspm, idx) => {
                    return <CheckboxSingle sporsmal={uspm} key={idx} />
                })}
            </div>

            <div role="alert" aria-live="assertive">
                <Vis hvis={errors[sporsmal.id] !== undefined}>
                    <Normaltekst tag="span" className="skjemaelement__feilmelding">
                        <ErrorMessage as="p" errors={errors} name={sporsmal.id} />
                    </Normaltekst>
                </Vis>
            </div>
        </React.Fragment>
    )
};

export default CheckboxKomp;

const CheckboxSingle = ({ sporsmal }: SpmProps) => {
    const [ lokal, setLokal ] = useState<string>('false');
    const { register, setValue } = useFormContext();

    useEffect(() => {
        const lagret = hentSvar(sporsmal);
        setValue(sporsmal.id, lagret);
        setLokal(lagret);
        // eslint-disable-next-line
    }, [ sporsmal.id ]);

    const changeValue = (value: string) => {
        setValue(sporsmal.id, value);
        setLokal(lokal === 'true' ? 'false' : 'true');
    };

    return (
        <div className="checkboksContainer">
            <input type="checkbox"
                id={sporsmal.id}
                name={sporsmal.id}
                checked={lokal === 'true'}
                aria-checked={lokal === 'true'}
                onChange={() => changeValue(sporsmal.id)}
                ref={register}
                className="skjemaelement__input checkboks"
            />
            <label className="skjemaelement__label" htmlFor={sporsmal.id}>
                {sporsmal.sporsmalstekst}
            </label>

            <AnimateOnMount
                mounted={lokal === 'true'}
                enter="undersporsmal--vis"
                leave="undersporsmal--skjul"
                start="undersporsmal"
            >
                <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} />
            </AnimateOnMount>
        </div>
    )
};
