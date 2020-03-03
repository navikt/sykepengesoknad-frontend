import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Vis from '../../vis';
import { hentSvar } from '../hent-svar';
import AnimateOnMount from '../../animate-on-mount';
import { hentFeilmelding } from '../sporsmal-utils';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import { RSSvartype } from '../../../types/rs-types/rs-svartype';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';

const RadioKomp = ({ sporsmal }: SpmProps) => {
    const { register, setValue, errors, watch } = useFormContext();
    const radioWatch = watch(sporsmal.id);
    const feilmelding = hentFeilmelding(sporsmal);

    useEffect(() => {
        setValue(sporsmal.id, hentSvar(sporsmal));
        // eslint-disable-next-line
    }, [ sporsmal.id ]);

    return (
        <>
            <Vis hvis={sporsmal.sporsmalstekst !== null}>
                <Element tag='h3' className='skjema__sporsmal'>{sporsmal.sporsmalstekst}</Element>
            </Vis>

            <div className={erHorisontal(sporsmal.svartype)
                ? 'skjemaelement skjemaelement--horisontal'
                : 'skjemaelement'}
            >
                {sporsmal.undersporsmal.map((uspm, idx) => {
                    return (
                        <div className='radioContainer' key={idx}>
                            <input type='radio'
                                id={uspm.id}
                                name={sporsmal.id}
                                value={uspm.sporsmalstekst}
                                ref={register({ required: feilmelding.global })}
                                className='skjemaelement__input radioknapp'
                            />
                            <label className='skjemaelement__label' htmlFor={uspm.id}>
                                {uspm.sporsmalstekst}
                            </label>

                            <AnimateOnMount
                                mounted={radioWatch === uspm.sporsmalstekst}
                                enter='undersporsmal--vis'
                                leave='undersporsmal--skjul'
                                start='undersporsmal'
                            >
                                <UndersporsmalListe undersporsmal={uspm.undersporsmal} />
                            </AnimateOnMount>
                        </div>
                    )
                })}
            </div>

            <div role='alert' aria-live='assertive'>
                <Vis hvis={errors[sporsmal.id] !== undefined}>
                    <Normaltekst tag='span' className='skjemaelement__feilmelding'>
                        <p>{feilmelding.lokal}</p>
                    </Normaltekst>
                </Vis>
            </div>
        </>
    )
};

export default RadioKomp;

export const erHorisontal = (svartype: RSSvartype) => {
    return svartype === RSSvartype.RADIO_GRUPPE_TIMER_PROSENT;
};
