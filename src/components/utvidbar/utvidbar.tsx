import './utvidbar.less'

import { Accordion } from '@navikt/ds-react'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React, { useEffect, useRef, useState } from 'react'

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
    type?: 'intern' | undefined
}

const Utvidbar = (props: UtvidbarProps) => {
    const [ erApen, setErApen ] = useState<boolean>(props.erApen)

    const btnImage = useRef<HTMLImageElement>(null)
    const { logEvent } = useAmplitudeInstance()

    useEffect(() => {
        setErApen(props.erApen)
    }, [ props ])

    const onKlikk = (e: any) => {
        if (props.amplitudeProps) {
            logEvent(erApen ? 'panel lukket' : 'panel åpnet', props.amplitudeProps)
        }
        setErApen(!erApen)
    }

    return (
        <Accordion>
            <Accordion.Item renderContentWhenClosed={true} open={erApen}
                className={`utvidbar ${props.className ? props.className : ''} ${props.type ? props.type : ''}`}
            >
                <Accordion.Header
                    type="button"
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
                        render={() => <Undertittel tag="h2">{props.tittel}</Undertittel>}
                    />

                    <Vis hvis={props.type === 'intern'}
                        render={() => <Normaltekst tag="h2">{props.tittel}</Normaltekst>}
                    />

                    <Normaltekst tag="em" className="utvidbar__handling">
                        {erApen ? 'Lukk' : 'Åpne'}
                    </Normaltekst>
                </Accordion.Header>

                <Accordion.Content>
                    {props.children}
                    <div className="lenkerad ikke-print">
                        <button type="button" className="navds-link" aria-pressed={!erApen}
                            tabIndex={(erApen ? null : -1) as any} onClick={(e: any) => {
                                e.preventDefault()
                                setErApen(!erApen)
                            }}
                        >
                            <Normaltekst tag="span">Lukk</Normaltekst>
                        </button>
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}

export default Utvidbar
