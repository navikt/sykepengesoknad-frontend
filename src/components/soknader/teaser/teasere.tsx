import { Element } from 'nav-frontend-typografi'
import React from 'react'

import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { Soknad } from '../../../types/types'
import Vis from '../../vis'
import FremtidigeSoknaderTeaser from './fremtidige-soknader-teaser'
import Teaser from './teaser'
import TidligereSoknaderTeaser from './tidligere-soknader-teaser'

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
                    switch (soknad.status) {
                        case RSSoknadstatus.FREMTIDIG:
                            return <FremtidigeSoknaderTeaser key={idx} soknad={soknad} />
                        case RSSoknadstatus.SENDT:
                            return <TidligereSoknaderTeaser key={idx} soknad={soknad} />
                        default:
                            return <Teaser key={idx} soknad={soknad} />
                    }
                })}
                <Vis hvis={soknader.length === 0}>
                    <Element className='panel'>{tomListeTekst}</Element>
                </Vis>
            </div>
        </>
    )
}

export default Teasere
