import { useFormContext } from 'react-hook-form';
import React, { useEffect, useRef, useState } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Vis from '../../vis';
import { hentSvar } from '../hent-svar';
import { getLedetekst, tekst } from '../../../utils/tekster';
import { hentFeilmelding } from '../sporsmal-utils';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';

const TallInput = ({ sporsmal }: SpmProps) => {
    const feilmelding = hentFeilmelding(sporsmal);
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
        <>
            <Vis hvis={sporsmal.sporsmalstekst !== null}>
                <Element tag='h3' className='skjema__sporsmal'>{sporsmal.sporsmalstekst}</Element>
            </Vis>

            <div className='medEnhet'>
                <input type='number'
                    className='skjemaelement__input input--xs'
                    name={sporsmal.id}
                    id={sporsmal.id}
                    ref={register({
                        required: feilmelding.global,
                        min: {
                            value: sporsmal.min,
                            message: getLedetekst(tekst('soknad.feilmelding.TALL_MIN_MAX'),
                                { '%MIN%': sporsmal.min, '%MAX%': sporsmal.max })
                        },
                        max: {
                            value: sporsmal.max,
                            message: getLedetekst(tekst('soknad.feilmelding.TALL_MIN_MAX'),
                                { '%MIN%': sporsmal.min, '%MAX%': sporsmal.max }
                            )
                        }
                    })}
                    onChange={onChange}
                    autoComplete='off'
                />
                <label className='medEnhet__enhet' htmlFor={sporsmal.id}>{sporsmal.undertekst}</label>
            </div>

            <div role='alert' aria-live='assertive' className='skjemaelement__feilmelding'>
                <Vis hvis={errors[sporsmal.id]}>
                    <Normaltekst tag='span'>
                        <p>{feilmelding.lokal}</p>
                    </Normaltekst>
                </Vis>
            </div>

            <div className='undersporsmal' ref={undersporsmal}>
                <Vis hvis={lokal}>
                    <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} />
                </Vis>
            </div>
        </>
    )
};

export default TallInput;
