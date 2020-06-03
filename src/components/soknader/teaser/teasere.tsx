import React from 'react';
import { Soknad } from '../../../types/types';
import { Element } from 'nav-frontend-typografi';
import Teaser from './teaser';
import FremtidigeSoknaderTeaser from './fremtidige-soknader-teaser';
import Vis from '../../vis';
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus';

interface SoknaderTeasereProps {
    soknader: Soknad[];
    className?: string;
    tittel: string;
    tomListeTekst?: string;
    id: string;
}

const Teasere = ({ soknader, className, tittel, tomListeTekst, id }: SoknaderTeasereProps) => {
    return (
        <>
            <header className='inngangspanelerHeader'>
                <Element className='inngangspanelerHeader__tittel' tag='h2'>{tittel}</Element>
            </header>
            <div id={id} className={className}>
                {soknader.map((soknad, idx) => {
                    return soknad.status === RSSoknadstatus.FREMTIDIG ?
                        <FremtidigeSoknaderTeaser key={idx} soknad={soknad}/> :
                        <Teaser key={idx} soknad={soknad}/>
                })}
                <Vis hvis={soknader.length === 0}>
                    <Element className='panel'>{tomListeTekst}</Element>
                </Vis>
            </div>
        </>
    );
};

export default Teasere;
