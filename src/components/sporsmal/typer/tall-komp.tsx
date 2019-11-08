import React from 'react';
import useForm from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import { useAppStore } from '../../../data/stores/app-store';
import FeilOppsummering from '../../skjema/feiloppsummering/feil-oppsummering';
import Knapperad from '../sporsmal-form/knapperad';
import Vis from '../../../utils/vis';
import { pathUtenSteg } from '../sporsmal-utils';
import tekster from '../sporsmal-tekster';

interface TallKompProps {
    label?: string;
    undertekst?: string;
    desimaler: number;
}

const TallKomp = ({ label, undertekst, desimaler }: TallKompProps) => {
    const { handleSubmit, register, errors } = useForm();
    const { valgtSoknad, setValgtSoknad } = useAppStore();
    const history = useHistory();
    const { stegId } = useParams();
    const spmIndex = parseInt(stegId) - 1;
    const sporsmal = valgtSoknad.sporsmal[spmIndex];
    const compId = 'spm_' + stegId;
    const feilmelding = tekster['soknad.feilmelding.' + sporsmal.tag.toLowerCase()];

    const onSubmit = (data: any) => {
        const svar: any = { verdi: data['sporsmal_' + stegId] };
        sporsmal.svarliste = { sporsmalId: sporsmal.id, svar: [ svar ]};
        setValgtSoknad(valgtSoknad);
        history.push(pathUtenSteg(history.location.pathname) + '/' + (spmIndex + 2));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="sporsmal__form">
            <FeilOppsummering visFeilliste={true} errors={errors} />

            <label className="skjema__sporsmal" htmlFor={compId}>
                <Normaltekst tag="span">{sporsmal.sporsmalstekst}</Normaltekst>
            </label>

            <input type="number"
                className="input--s"
                name="verdi"
                id={compId}
                ref={register({
                    validate: value => value === true || feilmelding
                })}
            />

            <div role="alert" aria-live="assertive">
                <Vis hvis={errors[compId] !== undefined}>
                    <div className="skjemaelement__feilmelding">
                        <Normaltekst tag="span">{feilmelding}</Normaltekst>
                    </div>
                </Vis>
            </div>

            <Knapperad onSubmit={onSubmit} />
        </form>
    );
};

export default TallKomp;
