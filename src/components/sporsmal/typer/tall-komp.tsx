import React, { useEffect, useRef, useState } from 'react';
import { ErrorMessage, useFormContext } from 'react-hook-form';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Vis from '../../vis';
import tekster from '../sporsmal-tekster';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import { hentSvar } from '../sporsmal-utils';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';

const TallInput = ({ sporsmal }: SpmProps) => {
    const feilmelding = tekster['soknad.feilmelding.' + sporsmal.tag.toLowerCase()];
    const [ lokal, setLokal ] = useState<string>(hentSvar(sporsmal));
    const { register, setValue, errors } = useFormContext();
    const undersporsmal = useRef<HTMLDivElement>(null);

    const onChange = (e: any) => {
        const value = e.target.value;
        setValue(sporsmal.id, value);
        setLokal(value);
    };

    useEffect(() => {
        setValue(sporsmal.id, hentSvar(sporsmal));
        // eslint-disable-next-line
    }, []);

    return (
        <React.Fragment>
            <Vis hvis={sporsmal.sporsmalstekst !== null}>
                <Element tag="h3" className="skjema__sporsmal">{sporsmal.sporsmalstekst}</Element>
            </Vis>

            <div className="medEnhet">
                <input type="text"
                    className="skjemaelement__input input--xs"
                    name={sporsmal.id}
                    id={sporsmal.id}
                    ref={register({ required: feilmelding })}
                    onChange={onChange}
                    autoComplete="off"
                />
                <label className="medEnhet__enhet" htmlFor={sporsmal.id}>{sporsmal.undertekst}</label>
            </div>

            <div role="alert" aria-live="assertive">
                <Vis hvis={errors[sporsmal.id] !== undefined}>
                    <Normaltekst tag="span" className="skjemaelement__feilmelding">
                        <ErrorMessage as="p" errors={errors} name={sporsmal.id} />
                    </Normaltekst>
                </Vis>
            </div>

            <div className="undersporsmal" ref={undersporsmal}>
                <Vis hvis={lokal !== undefined}>
                    <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} />
                </Vis>
            </div>
        </React.Fragment>
    )
};

export default TallInput;
