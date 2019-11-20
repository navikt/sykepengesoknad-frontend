import React from 'react';
import useForm from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import tekster from '../sporsmal-tekster';
import { hentSvarVerdi, pathUtenSteg } from '../sporsmal-utils';
import FeilOppsummering from '../../skjema/feiloppsummering/feil-oppsummering';
import Vis from '../../../utils/vis';
import { Normaltekst } from 'nav-frontend-typografi';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';
import Knapperad from '../sporsmal-form/knapperad';
import { useAppStore } from '../../../data/stores/app-store';
import { SpmProps } from '../sporsmalene';

const CheckboxPanel = ({ sporsmal }: SpmProps) => {
    const { valgtSoknad, setValgtSoknad } = useAppStore();
    const history = useHistory();
    const { stegId } = useParams();
    const spmIndex = parseInt(stegId) - 1;

    const { handleSubmit, register, errors, watch } = useForm({
        defaultValues: { verdi: hentSvarVerdi(sporsmal) }
    });

    const onSubmit = (data: any) => {
        const svar: any = { verdi: data.verdi };
        sporsmal.svarliste = { sporsmalId: sporsmal.id, svar: [ svar ] };
        setValgtSoknad(valgtSoknad);
        history.push(pathUtenSteg(history.location.pathname) + '/' + (spmIndex + 2));
    };

    return (
        <>
            <Vis hvis={sporsmal.erHovedSporsmal}>
                <form onSubmit={handleSubmit(onSubmit)} className="sporsmal__form">
                    <FeilOppsummering visFeilliste={true} errors={errors} />
                    <CheckboxInput sporsmal={sporsmal} formProps={{ register, errors, watch }} />
                    <Knapperad onSubmit={onSubmit} />
                </form>
            </Vis>

            <Vis hvis={!sporsmal.erHovedSporsmal}>
                <CheckboxInput sporsmal={sporsmal} formProps={{ register, errors, watch }} />
            </Vis>
        </>
    );
};

export default CheckboxPanel;

const CheckboxInput = ({ sporsmal, formProps }: SpmProps) => {
    const { stegId } = useParams();
    const compId = 'spm_' + stegId;
    const feilmelding = tekster['soknad.feilmelding.' + sporsmal.tag.toLowerCase()];
    const watchVerdi = formProps.watch('verdi');

    return (
        <>
            <div className={'skjemaelement skjemaelement--horisontal spm_' + stegId}>
                <input type="checkbox"
                    className="skjemaelement__input checkboks"
                    name="verdi"
                    id={compId}
                    ref={formProps.register({
                        validate: (value: any) => value === true || feilmelding
                    })}
                />
                <label className="skjemaelement__label" htmlFor={compId}>
                    {sporsmal.sporsmalstekst}
                </label>
            </div>

            <div role="alert" aria-live="assertive">
                <Vis hvis={formProps.errors.verdi !== undefined}>
                    <Normaltekst tag="span" className="skjemaelement__feilmelding">
                        {formProps.errors.verdi && formProps.errors.verdi.message}
                    </Normaltekst>
                </Vis>
            </div>

            <Vis hvis={watchVerdi === true}>
                <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} />
            </Vis>
        </>
    )
};
