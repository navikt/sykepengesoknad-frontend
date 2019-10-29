import React, { useEffect, useRef, useState } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { erSynligIViewport } from '../utils/browser-utils';
import Chevron from 'nav-frontend-chevron';
import './utvidbar.less';

interface UtvidbarProps {
    erApen: boolean;
    tittel: React.ReactNode | string;
    children: React.ReactNode;
    ikon: string;
    ikonHover?: string;
    ikonAltTekst?: string;
    className?: string;
    visLukk?: boolean;
}

const Utvidbar = (props: UtvidbarProps) => {
    const [erApen, setErApen] = useState<boolean>(props.erApen);
    const utvidbar = useRef<HTMLDivElement>(null);
    const jsToggle = useRef<HTMLButtonElement>(null);
    const btnImage = useRef<HTMLImageElement>(null);
    const innhold = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (erApen) {
            setErApen(true);
        } else {
            setErApen(false);
        }
        // eslint-disable-next-line
    }, []);

    function onTransitionEnd() {
        if (erApen) {
            window.scrollTo({top: 600, left: utvidbar.current.offsetWidth, behavior: 'smooth'});
        } else {
            if (!erSynligIViewport(utvidbar.current)) {
                window.scrollTo({top: 600, left: utvidbar.current.offsetWidth, behavior: 'smooth'});
            }
            jsToggle.current.focus();
        }
    }

    return (
        <div ref={utvidbar}
            className={`utvidbar ${props.className ? props.className : ''}`}
        >
            <button aria-expanded={erApen}
                ref={jsToggle}
                onMouseEnter={() => btnImage.current.src = props.ikonHover}
                onMouseLeave={() => btnImage.current.src = props.ikon}
                onClick={() => setErApen(!erApen)}
                className="utvidbar__toggle"
            >
                <img aria-hidden="true" className="utvidbar__ikon"
                    ref={btnImage}
                    alt={props.ikonAltTekst}
                    src={props.ikon}
                />
                <Element tag="h3">{props.tittel}</Element>
                <div className="utvidbar__handling">
                    <Normaltekst tag="em">
                        {erApen ? 'Lukk' : 'Åpne'}
                    </Normaltekst>
                    <Chevron type={erApen ? 'opp' : 'ned'} />
                </div>
            </button>
            <div className={'utvidbar__innholdContainer' + (erApen ? ' apen' : '')}
                onTransitionEnd={() => onTransitionEnd()} style={{maxHeight: erApen ? innhold.current.offsetHeight + 'px' : '0'}}
            >
                <div ref={innhold} className="utvidbar__innhold">
                    {props.children}
                    <div className="knapperad ikke-print">
                        <button type="button" className="lenke" aria-pressed={!erApen}
                            tabIndex={erApen ? null : -1} onClick={() => setErApen(!erApen)}
                        >
                            Lukk
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Utvidbar;
