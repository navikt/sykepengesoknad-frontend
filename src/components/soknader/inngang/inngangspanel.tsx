import React from 'react';
import { Link } from 'react-router-dom';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Vis from '../../vis';
import './inngangspanel.less';
import {useAmplitudeInstance} from "../../amplitude/amplitude";

interface InngangsIkonProps {
    ikon: string;
    ikonHover?: string;
}

export const InngangsIkon = ({ ikon, ikonHover }: InngangsIkonProps) => {
    return (
        <>
            <span className='inngangspanel__ikon inngangspanel__ikon--normal'>
                <img alt='' src={ikon} />
            </span>
            <Vis hvis={ikonHover !== undefined}>
                <span className='inngangspanel__ikon inngangspanel__ikon--hover'>
                    <img alt='' src={ikonHover || ikon} />
                </span>
            </Vis>
        </>
    );
};

interface InngangsProps {
    to: string;
    children: React.ReactNode;
}

export const Inngangspanel = ({ to, children, }: InngangsProps) => {
    return (
        <Link to={to} className='inngangspanel'>
            {children}
        </Link>
    );
};

interface InngangsHeaderProps {
    meta: string;
    tittel: string;
    status: string;
}

export const InngangsHeader = ({ meta, tittel, status }: InngangsHeaderProps) => {
    return (
        <header className='inngangspanel__header'>
            <Normaltekst className='inngangspanel__meta'>
                {meta}
            </Normaltekst>
            <Systemtittel tag='h3' className='inngangspanel__tittel'>
                {tittel}
            </Systemtittel>
            <Vis hvis={status !== null}>
                <Normaltekst className='inngangspanel__status'>{status}</Normaltekst>
            </Vis>
        </header>
    );
};
