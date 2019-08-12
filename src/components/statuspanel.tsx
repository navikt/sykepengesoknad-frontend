import React, { ReactNode } from 'react';
import { SykmeldingNokkelOpplysning } from '@navikt/digisyfo-npm';
import cls from 'classnames';

interface StatusNokkelopplysningProps {
    children: ReactNode,
    overskrift?: string,
    tittel: string
}

export const StatusNokkelopplysning = ({ children, overskrift = 'h2', tittel }: StatusNokkelopplysningProps) => {
    return (
        <SykmeldingNokkelOpplysning className="nokkelopplysning--statusopplysning" overskrift={overskrift} tittel={tittel}>
            {children}
        </SykmeldingNokkelOpplysning>
    );
};

interface StatusopplysningerProps {
    children: ReactNode,
}

export const Statusopplysninger = ({ children }: StatusopplysningerProps) => {
    return (
        <div className="statusopplysninger">
            {children}
        </div>
    );
};

interface StatuspanelProps {
    children: ReactNode,
    enKolonne: boolean,
    className?: string,
}

const Statuspanel = ({ children, enKolonne = false, className = 'blokk' }: StatuspanelProps) => {
    const classNames = cls('panel panel--komprimert statuspanel', className, {
        'statuspanel--toKol': !enKolonne,
        'statuspanel--enKol': enKolonne,
    });
    return (
        <div className={classNames}>
            {children}
        </div>
    );
};

export default Statuspanel;

