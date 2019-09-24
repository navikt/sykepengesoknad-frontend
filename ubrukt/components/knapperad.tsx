import React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';

interface KnapperadProps {
    children: any,
    variant: string,
}

const Knapperad = ({ children, variant }: KnapperadProps) => {
    return (
        <div className={`knapperad ${variant}`}>
            {
                children.filter
                    ? children
                        .filter((child: any) => {
                            return child;
                        })
                        .map((child: any, index: number) => {
                            return <div key={index} className="knapperad__element">{child}</div>;
                        })
                    : children
            }
        </div>
    );
};

export const KnapperadSoknad = () => {
    return (
        <Knapperad variant="knapperad--medAvbryt">
            <button type="submit" className="knapp knapp--hoved js-ga-videre">{getLedetekst('sykepengesoknad.ga-videre')}</button>
        </Knapperad>
    );
};

export default Knapperad;
