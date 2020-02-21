import React, { useEffect, useRef } from 'react';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import { hentSvar } from '../hent-svar';
import { ErrorMessage, useFormContext } from 'react-hook-form';
import Vis from '../../vis';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import AnimateOnMount from '../../animate-on-mount';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';
import tekster from '../sporsmal-tekster';

const CheckboxKomp = ({ sporsmal }: SpmProps) => {
    const feilmelding = tekster['soknad.feilmelding.' + sporsmal.tag.toLowerCase()];
    const { register, errors, watch, setValue } = useFormContext();
    const bekreft = useRef<HTMLDivElement>(null);
    const checkWatch = watch(sporsmal.id);
    console.log('feilmelding', feilmelding); // eslint-disable-line

    const handleChange = () => {
        if (bekreft.current) {
            bekreft.current.classList.toggle('bekreftCheckboksPanel--checked');
        }
        setValue(sporsmal.id, !checkWatch);
    };

    return (
        <>
            <Vis hvis={sporsmal.sporsmalstekst !== null}>
                <Element tag="h3" className="skjema__sporsmal">{sporsmal.sporsmalstekst}</Element>
            </Vis>

            <div className={'skjemagruppe checkboxgruppe' + (errors[sporsmal.id] ? ' skjemagruppe--feil' : '')}>
                {sporsmal.undersporsmal.map((uspm, idx) => {
                    return (
                        <div className="checkboksContainer" key={idx}>
                            <input type="checkbox"
                                className="skjemaelement__input checkboks"
                                name={sporsmal.id}
                                id={uspm.id}
                                onChange={handleChange}
                                ref={register({ required: feilmelding })}
                            />
                            <label className="skjemaelement__label" htmlFor={uspm.id}>
                                {uspm.sporsmalstekst}
                            </label>
                        </div>
                    )
                })}
            </div>

            <Normaltekst tag="div" role="alert" aria-live="assertive" className="skjemaelement__feilmelding">
                <Vis hvis={errors[sporsmal.id]}>
                    <span>{tekster['soknad.feilmelding.' + sporsmal.tag.toLowerCase() + '_lokal']}</span>
                </Vis>
            </Normaltekst>
        </>
    )
};

export default CheckboxKomp;

const CheckboxSingle = ({ sporsmal }: SpmProps) => {
    const { register, setValue, watch } = useFormContext();

    useEffect(() => {
        const svar = hentSvar(sporsmal);
        setValue(sporsmal.id, svar === 'CHECKED' ? 'true' : '');
        // eslint-disable-next-line
    }, [ sporsmal ]);

    return (
        <div className="checkboksContainer">
            <input type="checkbox"
                id={sporsmal.id}
                name={sporsmal.id}
                ref={register}
                className="skjemaelement__input checkboks"
            />
            <label className="skjemaelement__label" htmlFor={sporsmal.id}>
                {sporsmal.sporsmalstekst}
            </label>

            <AnimateOnMount
                mounted={watch(sporsmal.id)}
                enter="undersporsmal--vis"
                leave="undersporsmal--skjul"
                start="undersporsmal"
            >
                <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} />
            </AnimateOnMount>
        </div>
    )
};
