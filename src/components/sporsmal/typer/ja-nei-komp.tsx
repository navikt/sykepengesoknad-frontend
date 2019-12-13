import { useFormContext } from 'react-hook-form';
import React, { useEffect, useRef } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Vis from '../../../utils/vis';
import { SpmProps } from '../sporsmal-form';
import { hentSvar, settSvar } from '../sporsmal-utils';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';


const jaNeiValg = [ {
    value: 'ja',
    label: 'Ja',
}, {
    value: 'nei',
    label: 'Nei',
} ];

const JaNeiInput = ({ sporsmal }: SpmProps) => {
    const compId = 'spm_' + sporsmal.id;
    const undersporsmal = useRef<HTMLDivElement>(null);
    const { register, setValue, watch, errors, formState: { dirty } } = useFormContext();
    const watchVerdi = watch(compId);

    useEffect(() => {
        setValue(compId, hentSvar(sporsmal)[compId]);
        console.log('hentSvar JaNeiInput', hentSvar(sporsmal)[compId]); // eslint-disable-line
        if (watchVerdi === 'ja') {
            undersporsmal.current.classList.add('aapen');
        } else {
            undersporsmal.current.classList.remove('aapen');
        }
        // eslint-disable-next-line
    }, []);

    const changeValue = (value: string) => {
        setValue(compId, value);
        settSvar(sporsmal, {[compId]: value})
    };

    return (
        <>
            <div className="inputPanelGruppe inputPanelGruppe--horisontal">
                <fieldset className="skjema__fieldset">
                    <legend className="skjema__legend">
                        <div className="medHjelpetekst">
                            <Element className="skjema__sporsmal">
                                {sporsmal.sporsmalstekst}
                            </Element>
                            <div className="hjelpetekst">
                            </div>
                        </div>
                    </legend>
                    <div className="inputPanelGruppe__inner">
                        {jaNeiValg.map((valg, idx) => {
                            const OK = hentSvar(sporsmal) === valg.value;
                            return (
                                <label className={'inputPanel radioPanel' + (OK ? ' inputPanel--checked' : '')} key={idx}>
                                    <input type="radio"
                                        name={compId}
                                        className="inputPanel__field"
                                        aria-checked={OK}
                                        checked={OK}
                                        value={valg.value}
                                        onChange={() => changeValue(valg.value)}
                                        ref={register({ required: 'Et alternativ må velges' })}
                                    />
                                    <span className="inputPanel__label">{valg.label}</span>
{/*
                                    {dirty && <p>This field is dirty</p>}
*/}
                                </label>
                            )
                        })}
                    </div>
                </fieldset>
            </div>

            <div role="alert" aria-live="assertive">
                <Vis hvis={errors[compId] !== undefined}>
                    <Normaltekst tag="span" className="skjemaelement__feilmelding">
                        {errors[compId] && errors[compId].message}
                    </Normaltekst>
                </Vis>
            </div>

            <div className="undersporsmal" ref={undersporsmal}>
                <Vis hvis={watchVerdi === 'ja'}>
                    <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} />
                </Vis>
            </div>
        </>
    )
};

export default JaNeiInput;
