import './utvidbar.less'

import { Accordion } from '@navikt/ds-react'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React, { useEffect, useRef, useState } from 'react'

import { erSynligIViewport } from '../../utils/browser-utils'
import { useAmplitudeInstance } from '../amplitude/amplitude'
import Vis from '../vis'

interface UtvidbarProps {
    erApen: boolean
    tittel: React.ReactNode | string
    children: React.ReactNode
    ikon?: string
    ikonHover?: string
    amplitudeProps?: object
    ikonAltTekst?: string
    className?: string
    visLukk?: boolean
    type?: 'intern' | undefined
    fixedHeight?: boolean
}

const Utvidbar = (props: UtvidbarProps) => {
    const [ erApen, setErApen ] = useState<boolean>(props.erApen)
    const [ innholdHeight, setInnholdHeight ] = useState<number>(0)

    const utvidbar = useRef<HTMLDivElement>(null)
    const jsToggle = useRef<HTMLButtonElement>(null)
    const btnImage = useRef<HTMLImageElement>(null)
    const container = useRef<HTMLDivElement>(null)
    const innhold = useRef<HTMLDivElement>(null)
    const { logEvent } = useAmplitudeInstance()

    useEffect(() => {
        setErApen(props.erApen)
        console.log('innhold.current', innhold.current) // eslint-disable-line
        setInnholdHeight(
            props.fixedHeight
                ? 3000
                : innhold.current!.offsetHeight
        )
    }, [ props ])

    const onKlikk = () => {
        if (props.amplitudeProps) {
            logEvent(erApen ? 'panel lukket' : 'panel åpnet', props.amplitudeProps)
        }
        setErApen(!erApen)
        if (!erSynligIViewport(utvidbar.current)) {
            window.scrollTo({ top: utvidbar.current?.offsetTop, left: 0, behavior: 'smooth' })
        }
    }

    return (
        <Accordion>
            <Accordion.Item ref={utvidbar} renderContentWhenClosed={true}
                className={`utvidbar ${props.className ? props.className : ''} ${props.type ? props.type : ''}`}
            >
                <Accordion.Header
                    className="utvidbar__toggle"
                    ref={jsToggle}
                    onMouseEnter={props.ikon !== undefined ? () => btnImage.current!.src = props.ikonHover! : undefined}
                    onMouseLeave={props.ikon !== undefined ? () => btnImage.current!.src = props.ikon! : undefined}
                    onClick={onKlikk}
                >
                    <Vis hvis={props.ikon}
                        render={() =>
                            <img aria-hidden="true" className="utvidbar__ikon"
                                ref={btnImage}
                                alt={props.ikonAltTekst}
                                src={props.ikon}
                            />
                        }
                    />

                    <Vis hvis={props.type === undefined}
                        render={() => <Undertittel tag="h2" className="utvidbar__tittel">{props.tittel}</Undertittel>}
                    />

                    <Vis hvis={props.type === 'intern'}
                        render={() => <Normaltekst tag="h2" className="utvidbar__tittel">{props.tittel}</Normaltekst>}
                    />

                    <Normaltekst tag="em" className="utvidbar__handling">
                        {erApen ? 'Lukk' : 'Åpne'}
                    </Normaltekst>
                </Accordion.Header>

                <Accordion.Content ref={container} className={'utvidbar__innholdContainer' + (erApen ? ' apen' : '')}
                    style={{ maxHeight: erApen ? (innholdHeight * 2) + 'px' : '0' }}
                >
                    <div ref={innhold} className="utvidbar__innhold">
                        {props.children}
                        <div className="lenkerad ikke-print">
                            <button type="button" className="lenke" aria-pressed={!erApen}
                                tabIndex={(erApen ? null : -1) as any} onClick={() => setErApen(!erApen)}
                            >
                                <Normaltekst tag="span">Lukk</Normaltekst>
                            </button>
                        </div>
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}

export default Utvidbar
