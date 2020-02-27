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
    let feilmelding_lokal = tekster['soknad.feilmelding.' + sporsmal.tag + '.lokal'];
    const { validCheck } = useAppStore();

    return (
        <>
            <Vis hvis={sporsmal.sporsmalstekst !== null}>
                <Element tag="h3" className="skjema__sporsmal">{sporsmal.sporsmalstekst}</Element>
            </Vis>

            <div className={'skjemagruppe checkboxgruppe' + (errors[sporsmal.id] ? ' skjemagruppe--feil' : '')}>
                {sporsmal.undersporsmal.map((uspm, idx) => {
                    return <CheckboxSingle parent={sporsmal} sporsmal={uspm} key={idx} />;
                })}

                <Normaltekst tag="div" role="alert" aria-live="assertive" className="skjemaelement__feilmelding">
                    <Vis hvis={Object.entries(errors).length > 0 && !validCheck}>
                        <p>{feilmelding_lokal}</p>
                    </Vis>
                </Normaltekst>
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
    const { register, setValue, watch, getValues, clearError } = useFormContext();
    let feilmelding = tekster['soknad.feilmelding.' + parent.tag];
    const { setValidCheck } = useAppStore();

    useEffect(() => {
        const svar = hentSvar(sporsmal);
        setValue(sporsmal.id, svar === 'CHECKED' ? 'true' : '');
        // eslint-disable-next-line
    }, [ sporsmal ]);

    const valider = () => {
        const valid = harValgtNoe(parent, getValues());
        let fields = parent.undersporsmal.map(spm => spm.id);
        if (!valid) {
            fields.shift();
        }
        clearError(fields);
        setValidCheck(valid);
        return valid ? valid : feilmelding;
    };

    return (
        <div className="checkboksContainer">
            <input type="checkbox"
                id={sporsmal.id}
                name={sporsmal.id}
                ref={register({ validate: () => valider() })}
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

const harValgtNoe = (parent: Sporsmal, values: any): boolean => {
    return parent.undersporsmal.filter(uspm => {
        return values[uspm.id]
    }).length > 0;
};
