import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import tekster from '../sporsmal-tekster';
import { hentSvar } from '../sporsmal-utils';
import Vis from '../../vis';
import { Normaltekst } from 'nav-frontend-typografi';
import { SpmProps } from '../sporsmal-form/sporsmal-form';

const CheckboxInput = ({ sporsmal }: SpmProps) => {
    const [ lokal, setLokal ] = useState<string>('false');
    const feilmelding = tekster['soknad.feilmelding.' + sporsmal.tag.toLowerCase()];
    const { register, setValue, errors } = useFormContext();
    const bekreft = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const svar = hentSvar(sporsmal);
        setLokal(svar);
        setValue(sporsmal.id, svar);
        // eslint-disable-next-line
    }, []);

    const handleChange = () => {
        setLokal(lokal === 'true' ? 'false' : 'true');
        bekreft.current.classList.toggle('bekreftCheckboksPanel--checked');
    };

    const makeClassName = () => {
        const cls = 'bekreftCheckboksPanel';
        return lokal === 'true' ? cls + ' ' + cls + '--checked' : cls;
    };

    return (
        <div className={makeClassName()} ref={bekreft}>
            <div className={'skjemaelement skjemaelement--horisontal'}>
                <input type="checkbox"
                    className="skjemaelement__input checkboks"
                    name={sporsmal.id}
                    id={sporsmal.id}
                    checked={lokal === 'true'}
                    aria-checked={lokal === 'true'}
                    onChange={handleChange}
                    ref={register({ required: feilmelding })}
                />
                <label className="skjemaelement__label" htmlFor={sporsmal.id}>
                    {sporsmal.sporsmalstekst}
                </label>
            </div>

            <div role="alert" aria-live="assertive">
                <Vis hvis={errors.verdi !== undefined}>
                    <Normaltekst tag="span" className="skjemaelement__feilmelding">
                        {errors.verdi && errors[sporsmal.id].message}
                    </Normaltekst>
                </Vis>
            </div>
        </div>
    )
};

export default CheckboxInput;
