import React from 'react';
import useForm from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Vis from '../../../utils/vis';
import { Sporsmal } from '../../../types/types';
import Knapperad from '../sporsmal-form/knapperad';
import { useAppStore } from '../../../data/stores/app-store';
import { pathUtenSteg } from '../sporsmal-utils';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';
import { Normaltekst } from 'nav-frontend-typografi';
import tekster from '../sporsmal-tekster';

interface FormProps {
    sporsmal: Sporsmal;
    children: any;
}

export const SporsmalForm = ({ sporsmal, children }: FormProps) => {
    const { valgtSoknad, setValgtSoknad } = useAppStore();
    const history = useHistory();
    const { stegId } = useParams();
    const spmIndex = parseInt(stegId) - 1;
    const compId = 'spm_' + stegId;
    const feilmelding = tekster['soknad.feilmelding.' + sporsmal.tag.toLowerCase()];

    const { handleSubmit, register, errors, watch } = useForm();
    const formProps = { handleSubmit, register, errors, watch }

    const onSubmit = (data: any) => {
        const svar: any = { verdi: data.verdi };
        sporsmal.svarliste = { sporsmalId: sporsmal.id, svar: [ svar ] };
        setValgtSoknad(valgtSoknad);
        history.push(pathUtenSteg(history.location.pathname) + '/' + (spmIndex + 2));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="sporsmal__form">

            {React.cloneElement(children, { formProps: formProps })}

            <div role="alert" aria-live="assertive">
                <Vis hvis={errors[compId] !== undefined}>
                    <div className="skjemaelement__feilmelding">
                        <Normaltekst tag="span">{feilmelding}</Normaltekst>
                    </div>
                </Vis>
            </div>

            <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} />

            <Vis hvis={sporsmal.erHovedSporsmal}>
                <Knapperad onSubmit={onSubmit} />
            </Vis>
        </form>
    );
};

export default SporsmalForm;
