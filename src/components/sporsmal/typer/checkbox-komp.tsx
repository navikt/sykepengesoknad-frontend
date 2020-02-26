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
import { TagTyper } from '../../../types/enums';

const CheckboxKomp = ({ sporsmal }: SpmProps) => {
    const { errors, getValues } = useFormContext();
    const feilmelding = tekster['soknad.feilmelding.' + sporsmal.tag.toLowerCase()];

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
                    <Vis hvis={!harValgtEtt(sporsmal, getValues()) && !harValgtAnnet(sporsmal, getValues())}>
                        <span>{feilmelding}</span>
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

    useEffect(() => {
        const svar = hentSvar(sporsmal);
        setValue(sporsmal.id, svar === 'CHECKED' ? 'true' : '');
        // eslint-disable-next-line
    }, [ sporsmal ]);

    const valider = () => {
        const valid = harValgtEtt(parent, getValues()) || harValgtAnnet(parent, getValues());
        if (valid) {
            clearError(parent.undersporsmal.filter(spm => spm.tag === TagTyper.INNTEKTSKILDE_ANNET)[0].id);
            const fields = sporsmal.undersporsmal.map(spm => spm.id);
            clearError(fields);
        }
        return valid;
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

const harValgtEtt = (sporsmal: Sporsmal, values: any): boolean => {
    return sporsmal.undersporsmal.filter(spm => {
        return spm.undersporsmal[0] && values[spm.undersporsmal[0].id]
    }).length > 0;
};

const harValgtAnnet = (parent: Sporsmal, values: any): boolean => {
    return parent.undersporsmal.filter(uspm => {
        return values[uspm.id] && uspm.tag === TagTyper.INNTEKTSKILDE_ANNET
    }).length > 0;
};
