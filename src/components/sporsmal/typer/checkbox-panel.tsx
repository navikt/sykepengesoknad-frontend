import React from 'react';
import Vis from '../../../utils/vis';
import { Normaltekst } from 'nav-frontend-typografi';
import useForm from 'react-hook-form';
import FeilOppsummering from '../../skjema/feiloppsummering/feil-oppsummering';
import { useAppStore } from '../../../data/stores/app-store';
import { useHistory, useParams } from 'react-router-dom';
import Knapperad from '../sporsmal-form/knapperad';
import { hentSvarVerdi, pathUtenSteg } from '../sporsmal-utils';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';
import tekster from '../sporsmal-tekster';

const CheckboxPanel = () => {
    const {valgtSoknad, setValgtSoknad} = useAppStore();
    const history = useHistory();
    const {stegId} = useParams();
    const spmIndex = parseInt(stegId) - 1;
    const sporsmal = valgtSoknad.sporsmal[spmIndex];
    const compId = 'sporsmal' + stegId;
    const feilmelding = tekster['soknad.feilmelding.' + sporsmal.tag.toLowerCase()];

    const {handleSubmit, register, errors} = useForm({
        defaultValues: {verdi: hentSvarVerdi(sporsmal)}
    });

    const onSubmit = (data: any) => {
        const svar: any = {verdi: data.verdi};
        sporsmal.svarliste = {sporsmalId: sporsmal.id, svar: [svar]};
        setValgtSoknad(valgtSoknad);
        history.push(pathUtenSteg(history.location.pathname) + '/' + (spmIndex + 2));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="sporsmal__form">
            <FeilOppsummering visFeilliste={true} errors={errors} />

            <div className={'skjemaelement skjemaelement--horisontal spm_' + stegId}>
                <input type="checkbox"
                    className="skjemaelement__input checkboks"
                    name="verdi"
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

            <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} />

            <Knapperad onSubmit={onSubmit} />
        </form>
    );
};

export default CheckboxPanel;
