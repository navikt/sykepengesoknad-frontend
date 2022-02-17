import './inngangspanel.less'

import Etikett from 'nav-frontend-etiketter'
import React from 'react'

import SoknadLink from '../../../pages/soknad/soknad-link'
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { Soknad } from '../../../types/types'
import Vis from '../../vis'

interface InngangsIkonProps {
    ikon: string;
    ikonHover?: string;
}

export const InngangsIkon = ({ ikon, ikonHover }: InngangsIkonProps) => {
    return (
        <>
            <span className="inngangspanel__ikon inngangspanel__ikon--normal">
                <img alt="" src={ikon} />
            </span>
            <Vis hvis={ikonHover}
                render={() =>
                    <span className="inngangspanel__ikon inngangspanel__ikon--hover">
                        <img alt="" src={ikonHover || ikon} />
                    </span>
                }
            />
        </>
    )
}

interface InngangspanelProps {
    soknad: Soknad;
    children: React.ReactNode;
    className?: string;
}

export const Inngangspanel = ({ soknad, children, className }: InngangspanelProps) => {
    return (
        <SoknadLink soknad={soknad} className={`inngangspanel ${className}`}>
            {children}
        </SoknadLink>
    )
}

interface InngangsStatusProps {
    status: RSSoknadstatus;
    tekst: string;
}

export const InngangsStatus = ({ status, tekst }: InngangsStatusProps) => {
    const type = statusTilType(status)
    return (
        <div className="inngangspanel__status">
            <Etikett type={type}>{tekst}</Etikett>
        </div>
    )
}

const statusTilType = (status: RSSoknadstatus) => {
    switch (status) {
        case RSSoknadstatus.SENDT:
            return 'suksess'
        case RSSoknadstatus.UTGAATT:
        case RSSoknadstatus.FREMTIDIG:
            return 'info'
        case RSSoknadstatus.AVBRUTT:
            return 'advarsel'
        default:
            return 'info'
    }
}
