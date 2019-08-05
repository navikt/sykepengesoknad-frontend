import * as React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { ReactNode } from 'react';

interface InngangspanelIkonProps {
    ikon: string,
    ikonHover?: string,
}

export const InngangspanelIkon = ({ ikon, ikonHover }: InngangspanelIkonProps) => {
    return (
        <>
            <span className="inngangspanel__ikon inngangspanel__ikon--normal">
                <img alt="" src={ikon}/>
            </span>
            {ikonHover
                ?
                <span className="inngangspanel__ikon inngangspanel__ikon--hover">
                    <img alt="" src={ikonHover || ikon}/>
                </span>
                :
                null}
        </>
    );
};

interface InngangspanelProps {
    to: string,
    children: ReactNode,
    className: string
}

export const Inngangspanel = ({ to, children, className, ...rest }: InngangspanelProps) => {
    return (
        <Link to={to} className={cn('inngangspanel', className)} {...rest}>
            {children}
        </Link>
    );
};

export const InngangspanelInnhold = (children: ReactNode) => {
    return (
        <div className="inngangspanel__innhold">
            {children}
        </div>
    );
};

interface InngangspanelHeaderProps {
    meta: string,
    tittel: string,
    status: string,
    id: string,
}

export const InngangspanelHeader = ({ meta, tittel, status, id }: InngangspanelHeaderProps) => {
    return (
        <header className="inngangspanel__header">
            <h3 className="js-title" id={id}>
                <small className="inngangspanel__meta">
                    {meta}
                </small>
                <span className="inngangspanel__tittel">
                    {tittel}
                </span>
            </h3>
            {
                status
                    ? <p className="inngangspanel__status js-status">{status}</p>
                    : null
            }
        </header>
    );
};

interface InngangspanelTekstProps {
    children: ReactNode
}

export const InngangspanelTekst = ({ children }: InngangspanelTekstProps) => {
    return (<div className="inngangspanel__tekst">{children}</div>);
};

interface InngangspanelUndertekstProps {
    children: string,
    className?: string,
}

export const InngangspanelUndertekst = ({ children, className }: InngangspanelUndertekstProps) => {
    return (<p className={cn('inngangspanel__undertekst js-undertekst mute', className)}>{children}</p>);
};
