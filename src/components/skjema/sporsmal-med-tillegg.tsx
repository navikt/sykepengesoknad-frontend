import React, { useEffect, useState } from 'react';
import Vis from '../../../src/utils/vis';
import { erSynligIViewport, getTop } from '../../utils/browser-utils';
import { Sporsmal } from '../../types/types';

interface SporsmalMedTilleggProps {
    children: React.ReactNode;
    sporsmal: Sporsmal;
    visTillegg: Function;
    className: string;
    informasjon: React.ReactElement;
}

const SporsmalMedTillegg = (props: SporsmalMedTilleggProps) => {
    const [erApen, setErApen] = useState(getErApen(props));
    const [containerClassName, setContainerClassName] = useState('');
    const [hoyde, setHoyde] = useState(!erApen ? '0' : 'auto');
    const [visInnhold, setVisInnhold] = useState(erApen);
    const [opacity, setOpacity] = useState(erApen ? 1 : 0);
    const [harAnimasjon, setHarAnimasjon] = useState(false);
    let gammelHoyde: string;
    let hovedsporsmal: HTMLDivElement;
    let container: HTMLDivElement; // eslint-disable-line
    let tilleggsinnhold: HTMLDivElement;

    useEffect(() => {
        if (erApen) {
            apne();
        } else {
            lukk();
        }
        // eslint-disable-next-line
    }, []);

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
        // Setter høyde til auto:
        setTimeout(() => {
            setHoyde('auto');
            setContainerClassName('');
        }, 0);
    }

    function scrollToHovedsporsmal() {
        if (!erSynligIViewport(hovedsporsmal)) {
            const end = getTop(hovedsporsmal, 600);
            scrollTo(end, 600);
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
            const hoyde: string = tilleggsinnhold ? tilleggsinnhold.offsetHeight.toString() : 'auto';
            setErApen(true);
            setHoyde(hoyde);
            setContainerClassName(`${containerClassName} animerer`);
        }, 0);
    }

    function lukk() {
        const hoyde = tilleggsinnhold && tilleggsinnhold.offsetHeight ? tilleggsinnhold.offsetHeight.toString() : gammelHoyde;
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
            <div ref={(c) => {
                hovedsporsmal = c as HTMLDivElement;
            }}>
                {sporsmal}
            </div>
            <div ref={(c) => {
                container = c as HTMLDivElement;
            }}
                style={{ height: hoyde }}
                className={getContainerClass()}
                onTransitionEnd={() => {
                    onHoydeTransitionEnd();
                }}
            >
                <Vis hvis={visInnhold}>
                    <div className="js-tillegg"
                        ref={(c) => {
                            tilleggsinnhold = c as HTMLDivElement;
                        }}>
                        <div className="tilleggsinnhold__innhold" style={{ opacity: opacity }}>
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
