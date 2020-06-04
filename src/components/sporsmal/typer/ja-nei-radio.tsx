import { useFormContext } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Vis from '../../vis';
import { hentSvar } from '../hent-svar';
import { hentFeilmelding } from '../sporsmal-utils';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import { tekst } from '../../../utils/tekster';
import { useAppStore } from '../../../data/stores/app-store';

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
    const { setRerenderSporsmalForm } = useAppStore();

    const feilmelding = hentFeilmelding(sporsmal);

    useEffect(() => {
        const lagret = hentSvar(sporsmal);
        setValue(sporsmal.id, lagret);
        setLokal(lagret);
        // eslint-disable-next-line
    }, [sporsmal]);

    const changeValue = (value: string) => {
        setValue(sporsmal.id, value);
        setLokal(lokal === value ? '' : value);
        // Force rerender siden setValue kun trigger rerender første gangen
        setRerenderSporsmalForm(new Date().getUTCMilliseconds())
    };

    const presisering = (valgt: boolean) => {
        const spm = sporsmal;
        return (spm.tag && spm.tag.startsWith('INNTEKTSKILDE_') && lokal === 'JA' && valgt)
            ? <div className='presisering'>
                <Normaltekst tag='span'>
                    {tekst('soknad.presisering.' + spm.tag)}
                </Normaltekst>
            </div>
            : <></>
    };

    return (
        <>
            <div className={sporsmal.parentKriterie
                ? 'kriterie--' + sporsmal.parentKriterie.toLowerCase() + ' skjemaelement'
                : 'skjemaelement'
            }>

                <Element tag='h3' className='skjema__sporsmal'>{sporsmal.sporsmalstekst}</Element>

                {jaNeiValg.map((valg, idx) => {
                    const OK = lokal === valg.value;
                    return (
                        <div className="radioContainer" key={idx}>
                            <input type='radio'
                                id={sporsmal.id + '_' + idx}
                                name={sporsmal.id}
                                value={valg.value}
                                checked={OK}
                                aria-checked={OK}
                                onChange={() => changeValue(valg.value)}
                                ref={register({ required: feilmelding.global })}
                                className='skjemaelement__input radioknapp'
                            />
                            <label className='skjemaelement__label' htmlFor={sporsmal.id + '_' + idx}>
                                {valg.label}
                            </label>
                            {presisering(OK)}
                        </div>
                    )
                })}
            </div>

            <div role='alert' aria-live='assertive'>
                <Vis hvis={errors[sporsmal.id]}>
                    <Normaltekst tag='span' className='skjemaelement__feilmelding'>
                        <p>{feilmelding.lokal}</p>
                    </Normaltekst>
                </Vis>
            </div>
        </>
    )
};

export default JaNeiRadio;
