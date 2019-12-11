import useForm, { FormContext, useFormContext } from 'react-hook-form';
import React, { useEffect, useRef } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { useHistory, useParams } from 'react-router-dom';
import Vis from '../../../utils/vis';
import { SpmProps } from '../sporsmalene';
import Knapperad from '../sporsmal-form/knapperad';
import { useAppStore } from '../../../data/stores/app-store';
import { hentSvar, pathUtenSteg, settSvar } from '../sporsmal-utils';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';
import FeilOppsummering from '../../skjema/feiloppsummering/feil-oppsummering';

const jaNeiValg = [ {
    value: 'ja',
    label: 'Ja',
}, {
    value: 'nei',
    label: 'Nei',
} ];

export const JaNeiKomp = ({ sporsmal }: SpmProps) => {
    const { valgtSoknad, setValgtSoknad } = useAppStore();
    const history = useHistory();
    const { stegId } = useParams();
    const spmIndex = parseInt(stegId) - 1;
    const methods = useForm();

    const onSubmit = (data: any) => {
        settSvar(sporsmal, data);
        methods.reset();
        setValgtSoknad(valgtSoknad);
        history.push(pathUtenSteg(history.location.pathname) + '/' + (spmIndex + 2));
    };

    return (
        sporsmal.erHovedSporsmal
            ?
            <FormContext {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="sporsmal__form">
                    <FeilOppsummering visFeilliste={true} errors={methods.errors} />
                    <JaNeiInput sporsmal={sporsmal} />
                    <Knapperad onSubmit={onSubmit} />
                </form>
            </FormContext>
            :
            <JaNeiInput sporsmal={sporsmal} />
    );
};

export default JaNeiKomp;

const JaNeiInput = ({ sporsmal }: SpmProps) => {
    const compId = 'spm_' + sporsmal.id;
    const undersporsmal = useRef<HTMLDivElement>(null);
    const { register, setValue, watch, errors, formState: { dirty } } = useFormContext();
    const watchVerdi = watch(compId);

    useEffect(() => {
        setValue(compId, hentSvar(sporsmal));
        // eslint-disable-next-line
    }, [ compId ]);

    useEffect(() => {
        if (watchVerdi === 'ja') {
            undersporsmal.current.classList.add('aapen');
        } else {
            undersporsmal.current.classList.remove('aapen');
        }
    }, [ watchVerdi ]);

    const changeValue = (value: string) => {
        setValue(compId, value);
        settSvar(sporsmal, value);
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
                            const alt = '_' + valg.label.toLowerCase();
                            const OK = hentSvar(sporsmal)[compId] === valg.value;
                            console.log('OK', OK); // eslint-disable-line
                            return (
                                <label className={'inputPanel radioPanel' + (OK ? ' inputPanel--checked' : '')} key={idx}>
                                    <input type="radio"
                                        name={compId}
                                        id={compId + alt}
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

            <div className="undersporsmal" ref={undersporsmal}>
                <Vis hvis={watchVerdi === 'ja'}>
                    <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} />
                </Vis>
            </div>
        </>
    )
};
