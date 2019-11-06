import React from 'react';
import Vis from '../../../utils/vis';
import { Normaltekst } from 'nav-frontend-typografi';
import useForm from 'react-hook-form';
import FeilOppsummering from '../../skjema/feiloppsummering/feil-oppsummering';
import { useAppStore } from '../../../data/stores/app-store';
import { useHistory, useParams } from 'react-router-dom';

interface CheckboxProps {
    feilmelding: string;
}

const CheckboxComp = ({ feilmelding }: CheckboxProps) => {
    const { handleSubmit, register, errors } = useForm();
    const { valgtSoknad, setValgtSoknad } = useAppStore();
    const history = useHistory();
    const { stegId } = useParams();
    const spmIndex = parseInt(stegId) - 1;
    const sporsmal = valgtSoknad.sporsmal[spmIndex];
    const compId = 'sporsmal' + stegId;

    const onSubmit = (data: any) => {
        const svar: any = { verdi: data['sporsmal_' + stegId] };
        valgtSoknad.sporsmal[spmIndex].svar = [ svar ];
        setValgtSoknad(valgtSoknad);
        history.push(history.location.pathname + '/' + (stegId + 1));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="sporsmal__form">
            <FeilOppsummering visFeilliste={true} errors={errors} />

            <div className={'skjemaelement skjemaelement--horisontal spm_' + stegId}>
                <input type="checkbox"
                    className="skjemaelement__input checkboks"
                    name={compId}
                    id={compId}
                    ref={register({
                        validate: value => value === true || feilmelding
                    })}
                />
                <label className="skjemaelement__label" htmlFor={compId}>
                    {sporsmal.sporsmalstekst}
                </label>
            </div>

            <div role="alert" aria-live="assertive">
                <Vis hvis={errors[compId] !== undefined}>
                    <div className="skjemaelement__feilmelding">
                        <Normaltekst tag="span">{feilmelding}</Normaltekst>
                    </div>
                </Vis>
            </div>
        </form>
    );
};

export default CheckboxComp;
