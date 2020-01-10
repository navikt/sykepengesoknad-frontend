import { useFormContext } from 'react-hook-form';
import React, { useEffect } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Vis from '../../../utils/vis';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import { hentSvar } from '../sporsmal-utils';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';
import AnimateOnMount from '../../animate-on-mount';
import TagBjorn from '../bjorn/tag-bjorn';
import { AvgittAvTyper, TagTyper } from '../../../types/enums';
import Bjorn from '../bjorn/bjorn';
import SporsmalBjorn from '../bjorn/sporsmal-bjorn';
import { useAppStore } from '../../../data/stores/app-store';
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype';
import SporsmalHjelpetekst from '../sporsmal-hjelpetekst';

const jaNeiValg = [ {
    value: 'ja',
    label: 'Ja',
}, {
    value: 'nei',
    label: 'Nei',
} ];

const JaNeiInput = ({ sporsmal }: SpmProps) => {
    const { valgtSoknad } = useAppStore();
    const { register, setValue, errors, watch } = useFormContext();
    const watchVerdi = watch(sporsmal.id);

    const visAvgittAvBjorn = () => {
        const undersporsmal = sporsmal.undersporsmal.find(uspm => uspm.tag === TagTyper.EGENMELDINGER_NAR);
        if (undersporsmal) {
            return undersporsmal.svarliste.svar.some(svaret => svaret.avgittAv === AvgittAvTyper.TIDLIGERE_SOKNAD);
        }
        return false;
    };

    useEffect(() => {
        setValue(sporsmal.id, hentSvar(sporsmal));
        // eslint-disable-next-line
    }, [ sporsmal.id ]);

    const changeValue = (value: string) => {
        setValue(sporsmal.id, value);
    };

    return (
        <>
            <Vis hvis={valgtSoknad.soknadstype === RSSoknadstype.ARBEIDSTAKERE && sporsmal.tag === TagTyper.FERIE_V2}>
                <Bjorn nokkel="sykepengesoknad.ferie_v2.bjorn" className="blokk-m" />
            </Vis>

            <div className="inputPanelGruppe inputPanelGruppe--horisontal">
                <fieldset className="skjema__fieldset">
                    <legend className="skjema__legend">
                        <div className="medHjelpetekst">
                            <Element className="skjema__sporsmal">
                                {sporsmal.sporsmalstekst}
                            </Element>
                            <SporsmalHjelpetekst sporsmal={sporsmal} />
                        </div>
                    </legend>
                    <div className="inputPanelGruppe__inner">
                        {jaNeiValg.map((valg, idx) => {
                            const OK = watchVerdi === valg.value;
                            return (
                                <label className={'inputPanel radioPanel' + (OK ? ' inputPanel--checked' : '')} key={idx}>
                                    <input type="radio"
                                        name={sporsmal.id}
                                        className="inputPanel__field"
                                        aria-checked={OK}
                                        checked={OK}
                                        value={valg.value}
                                        onChange={() => changeValue(valg.value)}
                                        ref={register({ required: 'Et alternativ må velges' })}
                                    />
                                    <span className="inputPanel__label">{valg.label}</span>
                                </label>
                            )
                        })}
                    </div>
                </fieldset>
            </div>

            <div role="alert" aria-live="assertive">
                <Vis hvis={errors[sporsmal.id] !== undefined}>
                    <Normaltekst tag="span" className="skjemaelement__feilmelding">
                        {errors[sporsmal.id] && errors[sporsmal.id].message}
                    </Normaltekst>
                </Vis>
            </div>

            <AnimateOnMount
                mounted={watchVerdi === 'ja'}
                enter="undersporsmal--vis"
                leave="undersporsmal--skjul"
                start="undersporsmal"
            >
                <>
                    <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} />
                    <TagBjorn sporsmal={sporsmal} className="press" />
                </>
            </AnimateOnMount>

            <Vis hvis={visAvgittAvBjorn()}>
                <Bjorn className="press" nokkel="sykepengesoknad.egenmeldingsdager.preutfylt-melding" />
            </Vis>

            <SporsmalBjorn sporsmal={sporsmal} />
        </>
    )
};

export default JaNeiInput;
