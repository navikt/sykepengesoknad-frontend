import React, { useEffect } from 'react';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import { hentSvar } from '../hent-svar';
import { useFormContext } from 'react-hook-form';
import Vis from '../../vis';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import AnimateOnMount from '../../animate-on-mount';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';
import tekster from '../sporsmal-tekster';
import { Sporsmal } from '../../../types/types';
import { useAppStore } from '../../../data/stores/app-store';

const CheckboxKomp = ({ sporsmal }: SpmProps) => {
    const { errors } = useFormContext();

    return (
        <>
            <Vis hvis={sporsmal.sporsmalstekst !== null}>
                <Element tag="h3" className="skjema__sporsmal">{sporsmal.sporsmalstekst}</Element>
            </Vis>

            <div className={'skjemagruppe checkboxgruppe' + (errors[sporsmal.id] ? ' skjemagruppe--feil' : '')}>
                {sporsmal.undersporsmal.map((uspm, idx) => {
                    return <CheckboxSingle parent={sporsmal} sporsmal={uspm} key={idx} />;
                })}
            </div>
        </>
    )
};

export default CheckboxKomp;

interface CheckboxProps {
    parent: Sporsmal;
}

type AllProps = SpmProps & CheckboxProps;

const CheckboxSingle = ({ parent, sporsmal }: AllProps) => {
    const { register, setValue, watch, errors } = useFormContext();
    const { valgtSoknad } = useAppStore();

    useEffect(() => {
        const svar = hentSvar(sporsmal);
        setValue(sporsmal.id, svar === 'CHECKED' ? 'true' : '');
        // eslint-disable-next-line
    }, [ sporsmal ]);

    const valider = (value: any) => {
        const hoved: Sporsmal[] = valgtSoknad.sporsmal.filter(spm => spm.id = parent.id);
        // const sieblings = hoved.undersporsmal;
        // console.log('valgtSoknad', valgtSoknad); // eslint-disable-line
        // console.log('parent.id', parent.id); // eslint-disable-line
        // console.log('sporsmal.id', sporsmal.id); // eslint-disable-line
        // console.log('hoved', hoved); // eslint-disable-line
        return true;
    };

    return (
        <div className="checkboksContainer">
            <input type="checkbox"
                id={sporsmal.id}
                name={sporsmal.id}
                ref={register({ validate: value => valider(value) })}
                className="skjemaelement__input checkboks"
            />
            <label className="skjemaelement__label" htmlFor={sporsmal.id}>
                {sporsmal.sporsmalstekst}
            </label>

            <Normaltekst tag="div" role="alert" aria-live="assertive" className="skjemaelement__feilmelding">
                <Vis hvis={errors[parent.id]}>
                    <span>{sporsmal.tag && tekster['soknad.feilmelding.' + sporsmal.tag + '_lokal']}</span>
                </Vis>
            </Normaltekst>

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
