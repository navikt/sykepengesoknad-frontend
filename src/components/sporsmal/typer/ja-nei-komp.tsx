import { useFormContext } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Vis from '../../../utils/vis';
import { SpmProps } from '../sporsmal-form';
import { hentSvar, settSvar } from '../sporsmal-utils';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';
import AnimateOnMount from '../../animate-on-mount';


const jaNeiValg = [ {
    value: 'ja',
    label: 'Ja',
}, {
    value: 'nei',
    label: 'Nei',
} ];

const JaNeiInput = ({ sporsmal }: SpmProps) => {
    const [ lokal, setLokal ] = useState<string>('nei');
    const compId = 'spm_' + sporsmal.id;
    const { register, setValue, errors, formState: { dirty } } = useFormContext();

    useEffect(() => {
        setValue(compId, hentSvar(sporsmal)[compId]);
        // eslint-disable-next-line
    }, [ lokal ]);

    const changeValue = (value: string) => {
        setLokal(value);
        setValue(compId, value);
        settSvar(sporsmal, { [compId]: value })
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
                                    {dirty && <p>This field is dirty</p>}
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

            <AnimateOnMount mounted={lokal === 'ja'} enter="undersporsmal--vis" leave="undersporsmal--skjul" start="undersporsmal">
                <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} />
            </AnimateOnMount>
        </>
    )
};

export default JaNeiInput;
