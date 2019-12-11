import React, { useEffect } from 'react';
import useForm, { FormContext, useFormContext } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import tekster from '../sporsmal-tekster';
import { hentSvar, pathUtenSteg, settSvar } from '../sporsmal-utils';
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
    const methods = useForm();

    const onSubmit = (data: any) => {
        settSvar(sporsmal, data);
        methods.reset();
        setValgtSoknad(valgtSoknad);
        history.push(pathUtenSteg(history.location.pathname) + '/' + (spmIndex + 2));
    };

    return (
        sporsmal.erHovedSporsmal
            ?
            <FormContext {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="sporsmal__form">
                    <FeilOppsummering visFeilliste={true} errors={methods.errors} />
                    <CheckboxInput sporsmal={sporsmal} />
                    <Knapperad onSubmit={onSubmit} />
                </form>
            </FormContext>
            :
            <CheckboxInput sporsmal={sporsmal} />
    );
};

export default CheckboxPanel;

const CheckboxInput = ({ sporsmal }: SpmProps) => {
    const { stegId } = useParams();
    const compId = 'spm_' + sporsmal.id;
    const feilmelding = tekster['soknad.feilmelding.' + sporsmal.tag.toLowerCase()];
    const { register, setValue, watch, errors } = useFormContext();
    const watchVerdi = watch('verdi');

    useEffect(() => {
        setValue(compId, hentSvar(sporsmal));
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className={'skjemaelement skjemaelement--horisontal spm_' + stegId}>
                <input type="checkbox"
                    className="skjemaelement__input checkboks"
                    name="verdi"
                    id={compId}
                    ref={register({
                        validate: (value: any) => value === true || feilmelding
                    })}
                />
                <label className="skjemaelement__label" htmlFor={compId}>
                    {sporsmal.sporsmalstekst}
                </label>
            </div>

            <div role="alert" aria-live="assertive">
                <Vis hvis={errors.verdi !== undefined}>
                    <Normaltekst tag="span" className="skjemaelement__feilmelding">
                        {errors.verdi && errors.verdi.message}
                    </Normaltekst>
                </Vis>
            </div>

            <div className="undersporsmal">
                <Vis hvis={watchVerdi === true}>
                    <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} />
                </Vis>
            </div>
        </>
    )
};
