import React from 'react';
import { useParams } from 'react-router-dom';
import { Innholdstittel } from 'nav-frontend-typografi';
import { useAppStore } from '../../../data/stores/app-store';

interface TallProps {
    feilmelding: string;
    label?: string;
    undertekst?: string;
    kunHeltall: boolean;
}

const Tall = ({ feilmelding, label, undertekst, kunHeltall }: TallProps) => {
    const { valgtSoknad } = useAppStore();
    const { stegId } = useParams();
    const stegNo = parseInt(stegId);
    const sporsmal = valgtSoknad.sporsmal[stegNo];
    const compId = 'spm_' + stegId;

    return (
        <>
            <label className="skjema__sporsmal" htmlFor={compId}>
                <Innholdstittel tag="span">{sporsmal.sporsmalstekst}</Innholdstittel>
            </label>
            <input type="number"
                name={compId}
                id={compId}
                className="input--s"
            />
            {feilmelding}
        </>
    );
};

export default Tall;
