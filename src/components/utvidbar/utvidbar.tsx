import './utvidbar.less'

import Chevron from 'nav-frontend-chevron'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useRef, useState } from 'react'

import { erSynligIViewport } from '../../utils/browser-utils'
import Vis from '../vis'

interface UtvidbarProps {
    erApen: boolean;
    tittel: React.ReactNode | string;
    children: React.ReactNode;
    ikon?: string;
    ikonHover?: string;
    ikonAltTekst?: string;
    className?: string;
    visLukk?: boolean;
}

const Utvidbar = (props: UtvidbarProps) => {
    const [ erApen, setErApen ] = useState<boolean>(props.erApen)
    const [ innholdHeight, setInnholdHeight ] = useState<number>(0)
    const utvidbar = useRef<HTMLDivElement>(null)
    const jsToggle = useRef<HTMLButtonElement>(null)
    const btnImage = useRef<HTMLImageElement>(null)
    const container = useRef<HTMLDivElement>(null)
    const innhold = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setErApen(props.erApen)
        setInnholdHeight(innhold.current!.offsetHeight)
    }, [ props.erApen ])

    function onTransitionEnd() {
        if (erApen) {
            window.scrollTo({ top: utvidbar.current!.offsetTop, left: 0, behavior: 'smooth' })
        } else {
            if (!erSynligIViewport(utvidbar.current!)) {
                window.scrollTo({ top: utvidbar.current!.offsetTop, left: 0, behavior: 'smooth' })
            }
            jsToggle.current!.focus()
        }
    }

    return (
        <div ref={utvidbar}
            className={`utvidbar ${props.className ? props.className : ''}`}
        >
            <button aria-expanded={erApen}
                ref={jsToggle}
                onMouseEnter={props.ikon !== undefined ? () => btnImage.current!.src = props.ikonHover! : undefined}
                onMouseLeave={props.ikon !== undefined ? () => btnImage.current!.src = props.ikon! : undefined}
                onClick={() => setErApen(!erApen)}
                className='utvidbar__toggle'
            >
                <Vis hvis={props.ikon !== undefined}>
                    <img aria-hidden='true' className='utvidbar__ikon'
                        ref={btnImage}
                        alt={props.ikonAltTekst}
                        src={props.ikon}
                    />
                </Vis>
                <Element tag='h3'>{props.tittel}</Element>
                <div className='utvidbar__handling'>
                    <Normaltekst tag='em'>
                        {erApen ? 'Lukk' : 'Åpne'}
                    </Normaltekst>
                    <Chevron type={erApen ? 'opp' : 'ned'} />
                </div>
            </button>

            <div ref={container} className={'utvidbar__innholdContainer' + (erApen ? ' apen' : '')}
                onTransitionEnd={() => onTransitionEnd()} style={{ maxHeight: erApen ? (innholdHeight * 2) + 'px' : '0' }}
            >
                <div ref={innhold} className='utvidbar__innhold'>
                    {props.children}
                    <div className='lenkerad ikke-print'>
                        <button type='button' className='lenke' aria-pressed={!erApen}
                            tabIndex={(erApen ? null : -1) as any} onClick={() => setErApen(!erApen)}
                        >
                            <Normaltekst tag='span'>Lukk</Normaltekst>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Utvidbar
