import React from 'react';
import { useParams } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import tekster from '../sporsmal-tekster';
import { Sporsmal } from '../../../types/types';
import FeilOppsummering from '../../skjema/feiloppsummering/feil-oppsummering';
import Vis from '../../../utils/vis';

interface TallKompProps {
    sporsmal: Sporsmal;
    register: Function;
    errors: any;
    label?: string;
    undertekst?: string;
    desimaler: number;
}

const TallKomp = ({ sporsmal, register, errors, label, undertekst, desimaler }: TallKompProps) => {
    console.log('sporsmal', sporsmal); // eslint-disable-line
    const { stegId } = useParams();
    const compId = 'spm_' + stegId;
    const feilmelding = tekster['soknad.feilmelding.' + sporsmal.tag.toLowerCase()];

    return (
        <>
            <FeilOppsummering visFeilliste={true} errors={errors} />

            <Vis hvis={sporsmal.sporsmalstekst !== null}>
                <label className="skjema__sporsmal" htmlFor={compId}>
                    <Normaltekst tag="span">{sporsmal.sporsmalstekst}</Normaltekst>
                </label>
            </Vis>

            <input type="number"
                className="input--s"
                name="verdi"
                id={compId}
                ref={register({
                    validate: (value: any) => value === true || feilmelding
                })}
            />
        </>
    );
};

export default TallKomp;
