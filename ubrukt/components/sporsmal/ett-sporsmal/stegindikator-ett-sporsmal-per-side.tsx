import React from 'react';
import Stegindikator from 'nav-frontend-stegindikator';
import { Soknad } from '../../../../src/types/types';
import { TagTyper } from '../../../../src/types/enums';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import parser from 'html-react-parser';
import { hentTittel } from './ett-sporsmal-per-side-utils';

interface FremdriftsbarProps {
    antallSteg: number,
    aktivtSteg: number,
}

const Fremdriftsbar = ({ aktivtSteg, antallSteg }: FremdriftsbarProps) => {
    const style = {
        width: `${((100 / antallSteg) * aktivtSteg)}%`,
    };

    return (
        <div className="fremdriftsbar">
            <span className="fremdriftsbar__tekst" style={style}>
                {parser(`${aktivtSteg}&nbsp;av&nbsp;${antallSteg}`)}
            </span>
            <div className="fremdriftsbar__fullbredde"/>
            <div className="fremdriftsbar__fremdrift" style={style}/>
        </div>
    );
};

interface StegindikatorProps {
    soknad: Soknad,
    sidenummer: number,
}

type AllProps = StegindikatorProps & RouteComponentProps;

const StegindikatorEttSporsmalPerSide = ({ soknad, sidenummer, history }: AllProps) => {
    const steg = soknad.sporsmal.filter((s) => {
        return s.tag !== TagTyper.VAER_KLAR_OVER_AT;
    });
    return (
        <div className="stegindikator-med-fremdriftsbar" role="progressbar" aria-valuenow={sidenummer} aria-valuemin={1} aria-valuemax={steg.length}>
            <Stegindikator kompakt
                onChange={(stegindex) => {
                    history.replace(`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/${soknad.id}/${stegindex + 1}`);
                }}>
                {steg.map((s, index) => {
                    const erPassert = (sidenummer - 1) > index;
                    const erAktiv = (sidenummer - 1) === index;

                    return (
                        <Stegindikator.Steg
                            index={index}
                            label={hentTittel(soknad, index + 1)}
                            aktiv={erAktiv}
                            disabled={!erPassert && !erAktiv}
                            key={`${soknad.id}-steg-${index}`}>
                            {index + 1}
                        </Stegindikator.Steg>
                    );
                })}
            </Stegindikator>
            <Fremdriftsbar aktivtSteg={sidenummer} antallSteg={steg.length}/>
        </div>
    );
};

export default withRouter(StegindikatorEttSporsmalPerSide);
