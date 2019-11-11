import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAppStore } from '../../../data/stores/app-store';
import useForm from 'react-hook-form';
import FeilOppsummering from '../../skjema/feiloppsummering/feil-oppsummering';
import Knapperad from '../sporsmal-form/knapperad';
import { pathUtenSteg } from '../sporsmal-utils';
import { Normaltekst } from 'nav-frontend-typografi';

const jaNeiValg = [ {
    value: 'ja',
    label: 'Ja',
}, {
    value: 'nei',
    label: 'Nei',
} ];

export const JaNeiKomp = () => {
    const { handleSubmit, errors } = useForm();
    const { valgtSoknad, setValgtSoknad } = useAppStore();
    const [ valgt, setValgt ] = useState<string>();
    const history = useHistory();
    const { stegId } = useParams();
    const spmIndex = parseInt(stegId) - 1;
    const sporsmal = valgtSoknad.sporsmal[spmIndex];
    const compId = 'spm_' + stegId;

    const onSubmit = (data: any) => {
        const svar: any = { verdi: data.verdi };
        sporsmal.svarliste = { sporsmalId: sporsmal.id, svar: [ svar ] };
        setValgtSoknad(valgtSoknad);
        history.push(pathUtenSteg(history.location.pathname) + '/' + (spmIndex + 2));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="sporsmal__form">
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
                                    />
                                    <span className="inputPanel__label">{valg.label}</span>
                                </label>
                            )
                        })}
                    </div>
                </fieldset>
            </div>

            <Knapperad onSubmit={onSubmit} />
        </form>
    );
};

export default JaNeiKomp;
