import React, { useEffect } from 'react';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import { RSSvartype } from '../../../types/rs-types/rs-svartype';
import { hentSvar, settSvar } from '../sporsmal-utils';
import { useAppStore } from '../../../data/stores/app-store';
import { useFormContext } from 'react-hook-form';
import Vis from '../../../utils/vis';
import { Normaltekst } from 'nav-frontend-typografi';

export const erHorisontal = (svartype: RSSvartype) => {
    return svartype === RSSvartype.RADIO_GRUPPE_TIMER_PROSENT;
};

const RadioKomp = ({ sporsmal }: SpmProps) => {
    const { visUnderspm, setVisUnderspm } = useAppStore();
    const compId = 'spm_' + sporsmal.id;
    const { register, setValue, errors } = useFormContext();

    useEffect(() => {
        setValue(compId, hentSvar(sporsmal)[compId]);
        // eslint-disable-next-line
    }, [ visUnderspm ]);

    const changeValue = (value: string) => {
        setVisUnderspm(value === 'ja');
        setValue(compId, value);
        settSvar(sporsmal, { [compId]: value })
    };

    return (
        <>
            <Vis hvis={sporsmal.sporsmalstekst !== null}>
                <div className="skjema__sporsmal">
                    <Normaltekst tag="span">{sporsmal.sporsmalstekst}</Normaltekst>
                </div>
            </Vis>

            <div className={erHorisontal(sporsmal.svartype) ? 'skjemaelement skjemaelement--horisontal' : 'skjemaelement'}>
                {sporsmal.undersporsmal.map((uspm, idx) => {
                    return (
                        <div className="radioContainer" key={idx}>
                            <input type="radio"
                                id={uspm.tag}
                                name={uspm.tag}
                                onChange={() => changeValue(uspm.tag)}
                                ref={register({ required: 'Et alternativ må velges' })}
                                className="skjemaelement__input radioknapp"
                            />
                            <label key={idx} className="skjemaelement__label">
                                {uspm.sporsmalstekst}
                            </label>
                        </div>
                    )
                })}
            </div>

            <div role="alert" aria-live="assertive">
                <Vis hvis={errors[compId] !== undefined}>
                    <Normaltekst tag="span" className="skjemaelement__feilmelding">
                        {errors[compId] && errors[compId].message}
                    </Normaltekst>
                </Vis>
            </div>
        </>
    );
};

export default RadioKomp;
