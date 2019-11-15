import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import tekster from '../sporsmal-tekster';
import { Sporsmal } from '../../../types/types';
import FeilOppsummering from '../../skjema/feiloppsummering/feil-oppsummering';
import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';
import './react-calendar.less';
import './react-daterange-picker.less';

interface DatoProps {
    sporsmal: Sporsmal;
    register: Function;
    errors: any;
}

const startDato = dayjs('2019-11-11').toDate();
const stoppDato = dayjs('2019-11-12').toDate();

const DatoKomp = ({ sporsmal, register, errors }: DatoProps) => {
    const { stegId } = useParams();
    const compId = 'spm_' + stegId;
    const feilmelding = tekster['soknad.feilmelding.' + sporsmal.tag.toLowerCase()];
    const [ value, setValue ] = useState<Date[]>([ dayjs(sporsmal.min).toDate(), dayjs(sporsmal.max).toDate() ]);
    const [ open, setOpen ] = useState<boolean>(false);

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

    console.log('sporsmal.min', dayjs(sporsmal.min).toDate()); // eslint-disable-line
    console.log('sporsmal.max', dayjs(sporsmal.max).toDate()); // eslint-disable-line
    // const parse = genererParseForEnkeltverdi();
    // const onChange = getOnChangeForDato({});

    return (
        <>
            <FeilOppsummering visFeilliste={true} errors={errors} />

            <Normaltekst tag="label" className="skjema__sporsmal">
                {sporsmal.sporsmalstekst}
            </Normaltekst>

            <DateRangePicker
                id={compId}
                name="verdi"
                locale="nb-NO"
                format="dd.MM.yyyy"
                /*
                                minDate={dayjs(sporsmal.min).toDate()}
                                maxDate={dayjs(sporsmal.max).toDate()}
                */
                onChange={onChange}
                onCalendarClose={onClose}
                isOpen={open}
                value={value}
                ref={register({
                    validate: (value: any) => value === true || feilmelding,
                    required: true
                })}
                calendarAriaLabel="Åpne/lukk kalender"
                clearAriaLabel="Tøm"
                dayAriaLabel="Dag"
                monthAriaLabel="Mnd"
                yearAriaLabel="År"
                nativeInputAriaLabel="Dato"
                onCalendarOpen={onOpen}
            />
        </>
    );
};

export default DatoKomp;
