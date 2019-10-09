import React from 'react';
import { Soknad } from '../../../types/types';
import { Element } from 'nav-frontend-typografi';
import SoknadTeaser from './soknad-teaser';
import Vis from '../../../utils/vis';

interface SoknaderTeasereProps {
    soknader: Soknad[];
    className: string;
    tittel: string;
    tomListeTekst?: string;
    id: string;
}

const SoknaderTeasere = ({ soknader, className, tittel, tomListeTekst, id }: SoknaderTeasereProps) => {
    return (
        <>
            <header className="inngangspanelerHeader">
                <Element className="inngangspanelerHeader__tittel" tag="h2">{tittel}</Element>
            </header>
            <div id={id} className={className}>
                {soknader.map((soknad, idx) => {
                    return <SoknadTeaser key={idx} soknad={soknad}/>;
                })}
                <Vis hvis={soknader.length === 0}>
                    <Element className="panel">{tomListeTekst}</Element>
                </Vis>
            </div>
        </>
    );
};

export default SoknaderTeasere;
