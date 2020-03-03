import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Vis from '../../vis';
import Bjorn from '../bjorn/bjorn';
import TagBjorn from '../bjorn/tag-bjorn';
import SporsmalBjorn from '../bjorn/sporsmal-bjorn';
import AnimateOnMount from '../../animate-on-mount';
import { hentFormState, hentSvar } from '../hent-svar';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import SporsmalHjelpetekst from '../sporsmal-hjelpetekst';
import { useAppStore } from '../../../data/stores/app-store';
import { AvgittAvTyper, TagTyper } from '../../../types/enums';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype';
import { hentFeilmelding, sporsmalIdListe } from '../sporsmal-utils';

const jaNeiValg = [ {
    value: 'JA',
    label: 'Ja',
}, {
    value: 'NEI',
    label: 'Nei',
} ];

const JaNeiInput = ({ sporsmal }: SpmProps) => {
    const { valgtSoknad } = useAppStore();
    const { register, setValue, errors, watch, reset, getValues, clearError } = useFormContext();
    const feilmelding = hentFeilmelding(sporsmal);
    const watchVerdi = watch(sporsmal.id);

    useEffect(() => {
        if (sporsmal.erHovedsporsmal) {
            reset(hentFormState(sporsmal));
        } else {
            setValue(sporsmal.id, hentSvar(sporsmal));
        }
        // eslint-disable-next-line
    }, [ sporsmal.id ]);

    const visAvgittAvBjorn = () => {
        const undersporsmal = sporsmal.undersporsmal.find(uspm => uspm.tag === TagTyper.EGENMELDINGER_NAR);
        if (undersporsmal) {
            return undersporsmal.svarliste.svar.some(svaret => svaret.avgittAv === AvgittAvTyper.TIDLIGERE_SOKNAD);
        }
        return false;
    };

    const changeValue = (value: string) => {
        setValue(sporsmal.id, value);
    };

    const valider = (value: any) => {
        if (value === 'JA' || value === 'NEI') {
            clearError(sporsmalIdListe(sporsmal.undersporsmal));
            return true;
        }
        return false;
    };

    return (
        <>
            <Vis hvis={valgtSoknad.soknadstype === RSSoknadstype.ARBEIDSTAKERE && sporsmal.tag === TagTyper.FERIE_V2}>
                <Bjorn nokkel='sykepengesoknad.ferie_v2.bjorn' className='blokk-m' />
            </Vis>

            <div className='inputPanelGruppe inputPanelGruppe--horisontal'>
                <fieldset className={'skjema__fieldset' + (errors[sporsmal.id] ? ' skjemagruppe--feil' : '')}>
                    <legend className='skjema__legend'>
                        <div className='medHjelpetekst'>
                            <Element tag='h3' className='skjema__sporsmal'>
                                {sporsmal.sporsmalstekst}
                            </Element>
                            <SporsmalHjelpetekst sporsmal={sporsmal} />
                        </div>
                    </legend>
                    <div className='inputPanelGruppe__inner'>
                        {jaNeiValg.map((valg, idx) => {
                            const OK = getValues()[sporsmal.id] === valg.value;
                            return (
                                <label className={'inputPanel radioPanel' + (OK ? ' inputPanel--checked' : '')} key={idx}>
                                    <input type='radio'
                                        name={sporsmal.id}
                                        id={sporsmal.id + '_' + idx}
                                        className='inputPanel__field'
                                        aria-checked={OK}
                                        checked={OK}
                                        value={valg.value}
                                        onChange={() => changeValue(valg.value)}
                                        ref={register({
                                            validate: (value) => valider(value),
                                            required: feilmelding.global
                                        })}
                                    />
                                    <span className='inputPanel__label'>{valg.label}</span>
                                </label>
                            )
                        })}
                    </div>
                </fieldset>
            </div>

            <Normaltekst tag='div' role='alert' aria-live='assertive' className='skjemaelement__feilmelding'>
                <Vis hvis={errors[sporsmal.id] !== undefined}>
                    <p>{feilmelding.lokal}</p>
                </Vis>
            </Normaltekst>

            <AnimateOnMount
                mounted={watchVerdi === sporsmal.kriterieForVisningAvUndersporsmal}
                enter='undersporsmal--vis'
                leave='undersporsmal--skjul'
                start='undersporsmal'
            >
                <>
                    <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} />
                    <TagBjorn sporsmal={sporsmal} className='press' />
                </>
            </AnimateOnMount>

            <Vis hvis={visAvgittAvBjorn()}>
                <Bjorn className='press' nokkel='sykepengesoknad.egenmeldingsdager.preutfylt-melding' />
            </Vis>

            <SporsmalBjorn sporsmal={sporsmal} />
        </>
    )
};

export default JaNeiInput;
