import { Tag } from '@navikt/ds-react'
import React from 'react'

import { RSSoknadstatus, RSSoknadstatusType } from '../../../types/rs-types/rs-soknadstatus'
import SoknadLink from '../../soknad/soknad-link'
import Vis from '../../vis'
import { RSSoknadmetadata } from '../../../types/rs-types/rs-soknadmetadata'

interface InngangsIkonProps {
    ikon: string
    ikonHover?: string
}

export const InngangsIkon = ({ ikon, ikonHover }: InngangsIkonProps) => {
    return (
        <>
            <span className="inngangspanel__ikon inngangspanel__ikon--normal">
                <img alt="" src={ikon} />
            </span>
            <Vis
                hvis={ikonHover}
                render={() => (
                    <span className="inngangspanel__ikon inngangspanel__ikon--hover">
                        <img alt="" src={ikonHover || ikon} />
                    </span>
                )}
            />
        </>
    )
}

interface InngangspanelProps {
    soknad: RSSoknadmetadata
    children: React.ReactNode
    className?: string
}

export const Inngangspanel = ({ soknad, children, className }: InngangspanelProps) => {
    return (
        <SoknadLink soknad={soknad} className={`inngangspanel ${className}`}>
            {children}
        </SoknadLink>
    )
}

interface InngangsStatusProps {
    status: RSSoknadstatusType
    tekst: string
}

export const InngangsStatus = ({ status, tekst }: InngangsStatusProps) => {
    const type = statusTilType(status)
    return (
        <div className="inngangspanel__status">
            <Tag variant={type} size="small">
                {tekst}
            </Tag>
        </div>
    )
}

const statusTilType = (status: RSSoknadstatusType) => {
    switch (status) {
        case RSSoknadstatus.SENDT:
            return 'success'
        case RSSoknadstatus.UTGAATT:
        case RSSoknadstatus.FREMTIDIG:
            return 'info'
        case RSSoknadstatus.AVBRUTT:
            return 'warning'
        default:
            return 'info'
    }
}
