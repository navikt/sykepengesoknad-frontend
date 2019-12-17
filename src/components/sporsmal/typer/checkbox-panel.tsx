import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import tekster from '../sporsmal-tekster';
import { hentSvar } from '../sporsmal-utils';
import Vis from '../../../utils/vis';
import { Normaltekst } from 'nav-frontend-typografi';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';
import { SpmProps } from '../sporsmal-form/sporsmal-form';

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
                    name={compId}
                    id={compId}
                    ref={register({ required: feilmelding })}
                />
                <label className="skjemaelement__label" htmlFor={compId}>
                    {sporsmal.sporsmalstekst}
                </label>
            </div>

            <div role="alert" aria-live="assertive">
                <Vis hvis={errors.verdi !== undefined}>
                    <Normaltekst tag="span" className="skjemaelement__feilmelding">
                        {errors.verdi && errors[compId].message}
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

export default CheckboxInput;
