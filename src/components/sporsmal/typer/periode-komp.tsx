import dayjs from 'dayjs';
import useForm from 'react-hook-form';
import React, { useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { useHistory, useParams } from 'react-router-dom';
import Vis from '../../../utils/vis';
import tekster from '../sporsmal-tekster';
import { SpmProps } from '../sporsmalene';
import { hentSvarVerdi, pathUtenSteg } from '../sporsmal-utils';
import Knapperad from '../sporsmal-form/knapperad';
import { useAppStore } from '../../../data/stores/app-store';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';
import FeilOppsummering from '../../skjema/feiloppsummering/feil-oppsummering';
import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';
import './react-calendar.less';
import './react-daterange-picker.less';

const PeriodeKomp = ({ sporsmal }: SpmProps) => {
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
                    <PeriodeInput sporsmal={sporsmal} formProps={{ register, errors, watch }} />
                    <Knapperad onSubmit={onSubmit} />
                </form>
            </Vis>

            <Vis hvis={!sporsmal.erHovedSporsmal}>
                <PeriodeInput sporsmal={sporsmal} formProps={{ register, errors, watch }} />
            </Vis>
        </>
    );
};

export default PeriodeKomp;

const PeriodeInput = ({ sporsmal, formProps }: SpmProps) => {
    const { stegId } = useParams();
    const compId = 'spm_' + stegId;
    const feilmelding = tekster['soknad.feilmelding.' + sporsmal.tag.toLowerCase()];
    const [ value, setValue ] = useState<Date[]>([ dayjs(sporsmal.min).toDate(), dayjs(sporsmal.max).toDate() ]);
    const [ open, setOpen ] = useState<boolean>(false);
    const watchVerdi = formProps.watch('verdi');

    const onChange = (value: any) => {
        setValue(value);
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false)
    };

    const onOpen = () => {
        const cal: HTMLDivElement = document.querySelector('.react-calendar');
        cal.setAttribute('tabindex', '-1');
        cal.focus();
    };

    return (
        <>
            <Normaltekst className="skjema__sporsmal">
                {sporsmal.sporsmalstekst}
            </Normaltekst>

            <DateRangePicker
                id={compId}
                name="verdi"
                locale="nb-NO"
                format="dd.MM.yyyy"
                minDate={dayjs(sporsmal.min).toDate()}
                maxDate={dayjs(sporsmal.max).toDate()}
                onChange={onChange}
                onCalendarOpen={onOpen}
                onCalendarClose={onClose}
                isOpen={open}
                value={value}
                ref={formProps.register({
                    validate: (value: any) => value === true || feilmelding,
                    required: true
                })}
                calendarAriaLabel="Åpne/lukk kalender"
                clearAriaLabel="Tøm"
                dayAriaLabel="Dag"
                monthAriaLabel="Mnd"
                yearAriaLabel="År"
                nativeInputAriaLabel="Dato"
            />

            <div role="alert" aria-live="assertive">
                <Vis hvis={formProps.errors.verdi !== undefined}>
                    <Normaltekst tag="span" className="skjemaelement__feilmelding">
                        {formProps.errors.verdi && formProps.errors.verdi.message}
                    </Normaltekst>
                </Vis>
            </div>

            <Vis hvis={watchVerdi !== undefined}>
                <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} />
            </Vis>
        </>
    )
};
