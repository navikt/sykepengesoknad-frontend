import React from 'react';
import useForm from 'react-hook-form';
import { useParams } from 'react-router-dom';
import tekster from '../sporsmal-tekster';
import { Sporsmal } from '../../../types/types';
import { hentSvarVerdi } from '../sporsmal-utils';
import FeilOppsummering from '../../skjema/feiloppsummering/feil-oppsummering';

interface CheckboxPanelProps {
    sporsmal: Sporsmal;
    register: Function;
    errors: any;
}

const CheckboxPanel = ({ sporsmal, register, errors }: CheckboxPanelProps) => {
    const { stegId } = useParams();
    const compId = 'spm_' + stegId;
    const feilmelding = tekster['soknad.feilmelding.' + sporsmal.tag.toLowerCase()];

    useForm({
        defaultValues: { verdi: hentSvarVerdi(sporsmal) }
    });

    return (
        <>
           <FeilOppsummering visFeilliste={true} errors={errors} />

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
        </>
    );
};

export default CheckboxPanel;
