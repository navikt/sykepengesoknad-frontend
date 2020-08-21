import './inngangspanel.less'

import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React from 'react'
import { Link } from 'react-router-dom'

import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
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
            <Vis hvis={ikonHover !== undefined}>
                <span className="inngangspanel__ikon inngangspanel__ikon--hover">
                    <img alt="" src={ikonHover || ikon} />
                </span>
            </Vis>
        </>
    )
}

interface InngangspanelProps {
    to: string;
    children: React.ReactNode;
}

export const Inngangspanel = ({ to, children, }: InngangspanelProps) => {
    return (
        <Link to={to} className="inngangspanel">
            {children}
        </Link>
    )
}

interface InngangsStatusProps {
    status: RSSoknadstatus;
    tekst: string;
}

export const InngangsStatus = ({ status, tekst }: InngangsStatusProps) => {
    const type = status.toLowerCase()
    return (
        <Normaltekst className={`inngangspanel__status ${type}`}>
            {tekst}
        </Normaltekst>
    )
}

interface InngangsHeaderProps {
    tittel: string;
}

export const InngangsHeader = ({ tittel }: InngangsHeaderProps) => {
    return (
        <header className="inngangspanel__header">
            <Systemtittel tag="h3" className="inngangspanel__tittel">
                {tittel}
            </Systemtittel>
        </header>
    )
}
