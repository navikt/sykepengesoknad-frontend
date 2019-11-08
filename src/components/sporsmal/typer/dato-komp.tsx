import React from 'react';
import dayjs from 'dayjs';
import useForm from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import { formaterEnkeltverdi, genererParseForEnkeltverdi } from '../field-utils';
import DatoVelger from '../../skjema/datovelger/dato-velger';
import { getOnChangeForDato } from '../../../utils/get-on-change';
import { useAppStore } from '../../../data/stores/app-store';
import { pathUtenSteg } from '../sporsmal-utils';
import FeilOppsummering from '../../skjema/feiloppsummering/feil-oppsummering';
import Vis from '../../../utils/vis';
import Knapperad from '../sporsmal-form/knapperad';
import tekster from '../sporsmal-tekster';

const DatoKomp = () => {
    const { handleSubmit, register, errors } = useForm();
    const { valgtSoknad, setValgtSoknad } = useAppStore();
    const history = useHistory();
    const { stegId } = useParams();
    const spmIndex = parseInt(stegId) - 1;
    const sporsmal = valgtSoknad.sporsmal[spmIndex];
    const compId = 'spm_' + stegId;
    const feilmelding = tekster['soknad.feilmelding.' + sporsmal.tag.toLowerCase()];

    const parse = genererParseForEnkeltverdi();
    const onChange = getOnChangeForDato({});

    const onSubmit = (data: any) => {
        const svar: any = { verdi: data['sporsmal_' + stegId] };
        sporsmal.svarliste = { sporsmalId: sporsmal.id, svar: [ svar ]};
        setValgtSoknad(valgtSoknad);
        history.push(pathUtenSteg(history.location.pathname) + '/' + (spmIndex + 2));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="sporsmal__form">
            <FeilOppsummering visFeilliste={true} errors={errors} />

            <Normaltekst tag="label" className="skjema__sporsmal">
                {sporsmal.sporsmalstekst}
            </Normaltekst>

            <DatoVelger
                oppdaterSporsmal={onChange}
                format={formaterEnkeltverdi}
                parse={parse}
                parseVerdi={parse}
                name="verdi"
                id={compId}
                tidligsteFom={dayjs(sporsmal.min).toDate()}
                senesteTom={dayjs(sporsmal.max).toDate()}
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

export default DatoKomp;
