import React, { useEffect, useRef, useState } from 'react';

import { Sporsmal } from '../../types/types';
import { erSynligIViewport } from '../../utils/browser-utils';
import Vis from '../vis';


interface SporsmalMedTilleggProps {
    children: React.ReactNode;
    sporsmal: Sporsmal;
    visTillegg: Function;
    className?: string;
    informasjon?: React.ReactElement;
}

const SporsmalMedTillegg = (props: SporsmalMedTilleggProps) => {
    const [ erApen, setErApen ] = useState<boolean>(getErApen(props));
    const [ containerClassName, setContainerClassName ] = useState<string>('');
    const [ hoyde, setHoyde ] = useState<string>(!erApen ? '0' : 'auto');
    const [ visInnhold, setVisInnhold ] = useState<boolean>(erApen);
    const [ opacity, setOpacity ] = useState<number>(erApen ? 1 : 0);
    const [ harAnimasjon, setHarAnimasjon ] = useState<boolean>(false);
    let gammelHoyde: string;
    const hovedsporsmal = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLDivElement>(null);
    const tilleggsinnhold = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (erApen) {
            apne();
        } else {
            lukk();
        }
    }, [ erApen ]);

    function onHoydeTransitionEnd() {
        if (!harAnimasjon) {
            return;
        }

        setContainerClassName(containerClassName.replace(' animerer', ''));

        if (erApen) {
            setHarAnimasjon(false);
            setAutoHoyde();
            fadeIn();
            setTimeout(() => {
                scrollToHovedsporsmal();
            }, 300);
            return;
        }
        setVisInnhold(false);
        setHarAnimasjon(false);
        setOpacity(0);
        scrollToHovedsporsmal();
    }

    function getContainerClass() {
        return `tilleggssporsmal__innholdContainer${containerClassName}`;
    }

    function getErApen(props: SporsmalMedTilleggProps) {
        return props.visTillegg(props);
    }

    function setAutoHoyde() {
        /* Fjerner animasjonsklassen slik at Safari ikke
        tegner komponenten på nytt når høyde settes til 'auto': */
        gammelHoyde = hoyde;
        setContainerClassName('');
        setTimeout(() => {
            setHoyde('auto');
            setContainerClassName('');
        }, 0);
    }

    function scrollToHovedsporsmal() {
        if (!erSynligIViewport(hovedsporsmal.current!)) {
            //const end = getTop(hovedsporsmal.current, 600);
            //window.scrollTo(end, 600);
        }
    }

    function fadeIn() {
        setOpacity(1);
    }

    function apne() {
        setHoyde('0');
        setContainerClassName(' tilleggssporsmal__innholdContainer--medAnimasjon');
        setVisInnhold(true);
        setHarAnimasjon(true);

        setTimeout(() => {
            const hoyde: string = tilleggsinnhold ? tilleggsinnhold.current!.offsetHeight.toString() : 'auto';
            setErApen(true);
            setHoyde(hoyde);
            setContainerClassName(`${containerClassName} animerer`);
        }, 0);
    }

    function lukk() {
        const hoyde = tilleggsinnhold.current!.offsetHeight ? tilleggsinnhold.current!.offsetHeight.toString() : gammelHoyde;
        setHoyde(hoyde);
        setOpacity(0);

        setTimeout(() => {
            setHarAnimasjon(true);
            setContainerClassName(' tilleggssporsmal__innholdContainer--medAnimasjon animerer');
            setHoyde('0');
            setErApen(false);
        }, 0);
    }

    const { children, sporsmal, className, informasjon } = props;

    return (
        <div className={className}>
            <div ref={hovedsporsmal}>
                {sporsmal}
            </div>
            <div ref={container}
                style={{ height: hoyde }}
                className={getContainerClass()}
                onTransitionEnd={() => onHoydeTransitionEnd()}
            >
                <Vis hvis={visInnhold}>
                    <div className='js-tillegg' ref={tilleggsinnhold}>
                        <div className='tilleggsinnhold__innhold' style={{ opacity: opacity }}>
                            {children}
                        </div>
                    </div>
                </Vis>
            </div>
            {informasjon}
        </div>
    );
};

export default SporsmalMedTillegg;
