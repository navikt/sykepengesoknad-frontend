import 'nav-frontend-stegindikator-style';
import './sporsmal-steg.less';

import parser from 'html-react-parser';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppStore } from '../../../data/stores/app-store';
import { TagTyper } from '../../../types/enums';
import { Sporsmal } from '../../../types/types';
import { tekst } from '../../../utils/tekster';
import { hentNokkel } from '../sporsmal-utils';
import Steg from './steg';

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
        <div className='fremdriftsbar'>
            <Normaltekst tag='span' className='fremdriftsbar__tekst' style={style}>
                {parser(`${stegId}&nbsp;av&nbsp;${antallSteg}`)}
            </Normaltekst>
            <div className='fremdriftsbar__fullbredde' />
            <div className='fremdriftsbar__fremdrift' style={style} />
        </div>
    );
};

const SporsmalSteg = () => {
    const { valgtSoknad } = useAppStore();
    const { stegId } = useParams();
    const aktivtSteg = parseInt(stegId);
    const steg = valgtSoknad!.sporsmal.filter(s => s.tag !== TagTyper.VAER_KLAR_OVER_AT);

    return (
        <div className='stegindikator-med-fremdriftsbar' role='progressbar'
            aria-valuenow={aktivtSteg} aria-valuemin={1} aria-valuemax={steg.length}
        >
            <div className={'stegindikator stegindikator--kompakt'}>
                <ol className='stegindikator__liste'>
                    {steg.map((sporsmal: Sporsmal, idx: number) => {
                        return <Steg index={idx} key={idx} label={tekst(hentNokkel(valgtSoknad!, idx + 1))} />;
                    })}
                </ol>
            </div>
            <Fremdriftsbar antallSteg={steg.length} />
        </div>
    );
};

export default SporsmalSteg;
