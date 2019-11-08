import React from 'react';
import parser from 'html-react-parser';
import { useHistory, useParams } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import Stegindikator from 'nav-frontend-stegindikator';
import { Sporsmal } from '../../../types/types';
import { TagTyper } from '../../../types/enums';
import tekster from '../sporsmal-tekster';
import { hentNokkel, pathUtenSteg } from '../sporsmal-utils';
import StegindikatorSteg from 'nav-frontend-stegindikator/lib/stegindikator-steg';
import { useAppStore } from '../../../data/stores/app-store';
import './sporsmal-steg.less';

interface FremdriftsbarProps {
    antallSteg: number;
}

const Fremdriftsbar = ({ antallSteg }: FremdriftsbarProps) => {
    const { stegId } = useParams();
    const stegNo = parseInt(stegId);
    const style = {
        width: `${((100 / antallSteg) * stegNo)}%`,
    };

    return (
        <div className="fremdriftsbar">
            <Normaltekst tag="span" className="fremdriftsbar__tekst" style={style}>
                {parser(`${stegId}&nbsp;av&nbsp;${antallSteg}`)}
            </Normaltekst>
            <div className="fremdriftsbar__fullbredde" />
            <div className="fremdriftsbar__fremdrift" style={style} />
        </div>
    );
};

const SporsmalSteg = () => {
    const { valgtSoknad } = useAppStore();
    const history = useHistory();
    const { stegId } = useParams();
    const aktivtSteg = parseInt(stegId);
    const steg = valgtSoknad.sporsmal.filter(s => s.tag !== TagTyper.VAER_KLAR_OVER_AT);

    return (
        <div className="stegindikator-med-fremdriftsbar" role="progressbar"
            aria-valuenow={aktivtSteg} aria-valuemin={1} aria-valuemax={steg.length}
        >
            <Stegindikator kompakt
                onChange={(stegIndex) => {
                    history.push(pathUtenSteg(history.location.pathname) + '/' + (stegIndex + 1));
                }}
            >
                {steg.map((sporsmal: Sporsmal, index) => {
                    const erPassert = (aktivtSteg - 1) > index;
                    const erAktiv = (aktivtSteg - 1) === index;

                    return (
                        <StegindikatorSteg aktiv={erAktiv} index={index}
                            label={tekster[hentNokkel(valgtSoknad, index + 1)]}
                            disabled={!erPassert && !erAktiv} key={`${valgtSoknad.id}-steg-${index}`}
                        >
                            {index + 1}
                        </StegindikatorSteg>
                    );
                })}
            </Stegindikator>
            <Fremdriftsbar antallSteg={steg.length} />
        </div>
    );
};

export default SporsmalSteg;
