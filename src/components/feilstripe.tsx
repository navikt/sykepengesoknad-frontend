import React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';

interface FeilstripeProps {
    vis: boolean,
    className?: string,
}

const Feilstripe = ({ vis, className }: FeilstripeProps) => {
    const tekst = window.location.href.indexOf('heroku') === -1
        ? 'Beklager, det oppstod en feil! Vennligst prøv igjen senere.'
        : 'Denne funksjonen virker ikke på testsiden';
    return (
        <div aria-live="polite" role="alert">
            {
                vis
                    ? (
                        <Alertstripe type="feil" className={className}>
                            <p className="sist">{tekst}</p>
                        </Alertstripe>
                    )
                    : null
            }
        </div>
    );
};

export default Feilstripe;
