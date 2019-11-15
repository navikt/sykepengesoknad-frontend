import useForm from 'react-hook-form';
import React, { useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { useParams } from 'react-router-dom';
import { Sporsmal } from '../../../types/types';
import { hentSvarVerdi } from '../sporsmal-utils';
import FeilOppsummering from '../../skjema/feiloppsummering/feil-oppsummering';

const jaNeiValg = [ {
    value: 'ja',
    label: 'Ja',
}, {
    value: 'nei',
    label: 'Nei',
} ];

interface JaNeiProps {
    sporsmal: Sporsmal;
    register: Function;
    errors: any;
}

export const JaNeiKomp = ({ sporsmal, register, errors }: JaNeiProps) => {
    const [ valgt, setValgt ] = useState<string>('');
    const { stegId } = useParams();
    const compId = 'spm_' + stegId;

    useForm({
        defaultValues: { verdi: hentSvarVerdi(sporsmal) }
    });

    return (
        <>
            <FeilOppsummering visFeilliste={true} errors={errors} />

            <div className="inputPanelGruppe inputPanelGruppe--horisontal">
                <fieldset className="skjema__fieldset">
                    <legend className="skjema__legend">
                        <div className="medHjelpetekst">
                            <Normaltekst className="skjema__sporsmal">
                                <strong>{sporsmal.sporsmalstekst}</strong>
                            </Normaltekst>
                            <div className="hjelpetekst">
                            </div>
                        </div>
                    </legend>
                    <div className="inputPanelGruppe__inner">
                        {jaNeiValg.map((valg, idx) => {
                            const alt = '_' + valg.label.toLowerCase();
                            const OK = valgt === valg.value;
                            return (
                                <label className={'inputPanel radioPanel' + (OK ? ' inputPanel--checked' : '')}
                                    htmlFor={compId + alt} key={idx}
                                >
                                    <input type="radio"
                                        name="verdi"
                                        id={compId + alt}
                                        className="inputPanel__field"
                                        aria-checked={OK}
                                        checked={OK}
                                        value={valg.value}
                                        onChange={() => setValgt(valg.value)}
                                        ref={register({
                                            validate: (value: any) => value !== undefined || 'Må fylles ut!'
                                        })}
                                    />
                                    <span className="inputPanel__label">{valg.label}</span>
                                </label>
                            )
                        })}
                    </div>
                </fieldset>
            </div>
        </>
    );
};

export default JaNeiKomp;
