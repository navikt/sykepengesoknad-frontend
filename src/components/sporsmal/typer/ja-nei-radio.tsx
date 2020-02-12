import { ErrorMessage, useFormContext } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Vis from '../../vis';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import { hentSvar } from '../sporsmal-utils';
import tekster from '../sporsmal-tekster';

const jaNeiValg = [ {
    value: 'JA',
    label: 'Ja',
}, {
    value: 'NEI',
    label: 'Nei',
} ];

const JaNeiRadio = ({ sporsmal }: SpmProps) => {
    const [ lokal, setLokal ] = useState<string>(hentSvar(sporsmal));
    const { register, setValue, errors } = useFormContext();

    useEffect(() => {
        const lagret = hentSvar(sporsmal);
        setValue(sporsmal.id, lagret);
        setLokal(lagret);
    }, [ sporsmal ]);

    const changeValue = (value: string) => {
        setValue(sporsmal.id, value);
        setLokal(lokal === value ? '' : value);
    };

    return (
        <React.Fragment>
            <div className={sporsmal.parentKriterie
                ? 'kriterie--' + sporsmal.parentKriterie.toLowerCase() + ' skjemaelement'
                : 'skjemaelement'
            }>

                <Element tag="h3" className="skjema__sporsmal">{sporsmal.sporsmalstekst}</Element>

                {jaNeiValg.map((valg, idx) => {
                    const OK = lokal === valg.value;
                    return (
                        <div key={idx}>
                            <div className="radioContainer">
                                <input type="radio"
                                       id={sporsmal.id + '_' + idx}
                                       name={sporsmal.id}
                                       value={valg.value}
                                       checked={OK}
                                       aria-checked={OK}
                                       onChange={() => changeValue(valg.value)}
                                       ref={register({ required: 'Et alternativ må velges' })}
                                       className="skjemaelement__input radioknapp"
                                />
                                <label className="skjemaelement__label" htmlFor={sporsmal.id + '_' + idx}>
                                    {valg.label}
                                </label>
                            </div>
                            <Vis
                                hvis={sporsmal.tag && sporsmal.tag.startsWith('INNTEKTSKILDE_') && lokal === 'JA' && OK}>
                                <div className="presisering">
                                    <Normaltekst tag="span">
                                        {tekster['soknad.presisering.' + sporsmal.tag]}
                                    </Normaltekst>
                                </div>
                            </Vis>
                        </div>

                    )
                })}
            </div>

            <div role="alert" aria-live="assertive">
                <Vis hvis={errors[sporsmal.id] !== undefined}>
                    <Normaltekst tag="span" className="skjemaelement__feilmelding">
                        <ErrorMessage as="p" errors={errors} name={sporsmal.id}/>
                    </Normaltekst>
                </Vis>
            </div>
        </React.Fragment>
    )
};

export default JaNeiRadio;
