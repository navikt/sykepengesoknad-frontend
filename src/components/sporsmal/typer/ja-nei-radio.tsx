import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Vis from '../../../utils/vis';
import { useAppStore } from '../../../data/stores/app-store';
import useForm from 'react-hook-form';
import FeilOppsummering from '../../skjema/feiloppsummering/feil-oppsummering';

interface JaNeiRadioProps {
    feilmelding: string;
    intro: string;
}

export const JaNeiRadio = (props: JaNeiRadioProps) => {
    const { handleSubmit, errors } = useForm();
    const { valgtSoknad, setValgtSoknad } = useAppStore();
    const history = useHistory();
    const { stegId } = useParams();
    const spmIndex = parseInt(stegId);
    const sporsmal = valgtSoknad.sporsmal[spmIndex];
    const compId = 'spm_' + stegId;

    const onSubmit = (data: any) => {
        const svar: any = { verdi: data['sporsmal_' + stegId] };
        valgtSoknad.sporsmal[spmIndex].svar = [ svar ];
        setValgtSoknad(valgtSoknad);
        history.push(history.location.pathname + '/' + (stegId + 1));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="sporsmal__form">
            <FeilOppsummering visFeilliste={true} errors={errors} />

            <div className="inputPanelGruppe inputPanelGruppe--horisontal">
                <fieldset className="skjema__fieldset">
                    <legend className="skjema__legend">
                        <div className="medHjelpetekst">
                            <h3>{sporsmal.sporsmalstekst} {sporsmal.tag}</h3>
                            <div className="hjelpetekst">
                            </div>
                        </div>
                    </legend>
                    <div className="inputPanelGruppe__inner">
                        <label className="inputPanel radioPanel" htmlFor={compId + '_ja'}>
                            <input id={compId + '_ja'} className="inputPanel__field" type="radio" name={compId} aria-checked="false" value="ja" />
                            <span className="inputPanel__label">Ja</span>
                        </label>
                        <label className="inputPanel radioPanel inputPanel--checked" htmlFor={compId + '_nei'}>
                            <input id={compId + '_nei'} className="inputPanel__field" type="radio" name={compId} aria-checked="true" value="nei" />
                            <span className="inputPanel__label">Nei</span>
                        </label>
                    </div>
                </fieldset>

                <Vis hvis={props.intro !== undefined}>
                    <p className="skjema__sporsmal">{props.intro}</p>
                </Vis>
            </div>
        </form>
    );
};

export default JaNeiRadio;
