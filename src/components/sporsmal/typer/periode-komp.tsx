import useForm, { FormContext, useFormContext } from 'react-hook-form';
import React, { useEffect } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { useHistory, useParams } from 'react-router-dom';
import Vis from '../../../utils/vis';
import tekster from '../sporsmal-tekster';
import { SpmProps } from '../sporsmalene';
import { hentSvar, pathUtenSteg, settSvar } from '../sporsmal-utils';
import Knapperad from '../sporsmal-form/knapperad';
import { useAppStore } from '../../../data/stores/app-store';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';
import FeilOppsummering from '../../skjema/feiloppsummering/feil-oppsummering';
import Flatpickr from 'react-flatpickr';
import { Norwegian } from 'flatpickr/dist/l10n/no.js'
import './flatpickr.less';

const PeriodeKomp = ({ sporsmal }: SpmProps) => {
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
                    <PeriodeInput sporsmal={sporsmal} />
                    <Knapperad onSubmit={onSubmit} />
                </form>
            </FormContext>
            :
            <PeriodeInput sporsmal={sporsmal} />
    );
};

export default PeriodeKomp;

const PeriodeInput = ({ sporsmal }: SpmProps) => {
    const compId = 'spm_' + sporsmal.id;
    const feilmelding = tekster['soknad.feilmelding.' + sporsmal.tag.toLowerCase()];
    const { register, setValue, watch, errors } = useFormContext();
    const watchVerdi = watch(compId);

    const onChange = (value: any) => {
        setValue(compId, value);
    };

    useEffect(() => {
        setValue(compId, hentSvar(sporsmal));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        register({
            name: compId,
            validate: { required: feilmelding },
            required: true
        });
    }, [ register, compId, feilmelding ]);

    return (
        <>
            <Normaltekst className="skjema__sporsmal">
                {sporsmal.sporsmalstekst}
            </Normaltekst>

            <Flatpickr
                id={compId}
                name={compId}
                onChange={onChange}
                value={watchVerdi}
                options={{
                    minDate: new Date(sporsmal.min),
                    maxDate: new Date(sporsmal.max),
                    mode: 'range',
                    enableTime: false,
                    dateFormat: 'F j, Y',
                    altInput: true,
                    altFormat: 'd.m.Y',
                    locale: Norwegian
                }}
            />

            <div role="alert" aria-live="assertive">
                <Vis hvis={errors[compId] !== undefined}>
                    <Normaltekst tag="span" className="skjemaelement__feilmelding">
                        {errors[compId] && errors[compId].message}
                    </Normaltekst>
                </Vis>
            </div>

            <div className="undersporsmal">
                <Vis hvis={watchVerdi !== undefined}>
                    <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} />
                </Vis>
            </div>
        </>
    )
};
