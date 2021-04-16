import './inngangspanel.less'

import Etikett from 'nav-frontend-etiketter'
import React from 'react'
import { Link } from 'react-router-dom'

import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import VisBlock from '../../vis-block'

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
            <VisBlock hvis={ikonHover !== undefined}
                render={() => {
                    return (
                        <span className="inngangspanel__ikon inngangspanel__ikon--hover">
                            <img alt="" src={ikonHover || ikon} />
                        </span>
                    )
                }}
            />
        </>
    )
}

interface InngangspanelProps {
    to: string;
    children: React.ReactNode;
    className?: string;
}

export const Inngangspanel = ({ to, children, className }: InngangspanelProps) => {
    return (
        <Link to={to} className={`inngangspanel ${className || ''}`}>
            {children}
        </Link>
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
