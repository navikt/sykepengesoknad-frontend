import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Lenke from 'nav-frontend-lenker';
import { Brodsmule } from '../../types/types';
import personIkon from '../../img/person.svg';

import './brodsmuler.less';

const BrodsmuleBit = ({ sti, tittel, sisteSmule, erKlikkbar }: Brodsmule) => {
    const erEkstern = sti && sti.includes(process.env.REACT_APP_SYKEFRAVAER_CONTEXT_ROOT!);
    const link = erEkstern
        ? <Lenke className="js-smule js-smule-a brodsmuler__smule" href={sti}>{tittel}</Lenke>
        : <Link className="js-smule brodsmuler__smule" to={sti}>{tittel}</Link>;

    if (sisteSmule) {
        return (
            <span className="js-smuletekst">
                <span className="vekk">Du er her:</span>
                <span className="brodsmule">{tittel}</span>
            </span>
        );
    } else if (erKlikkbar) {
        return (
            <span className="js-smuletekst">
                {link}
                <span className="brodsmule__skille"> / </span>
            </span>
        );
    }
    return (
        <span>
            <span className="brodsmuler__smule">{tittel}</span>
            <span className="brodsmule__skille"> / </span>
        </span>
    );
};

interface BrodsmulerProps {
    brodsmuler: Brodsmule[],
}

const Brodsmuler = ({ brodsmuler }: BrodsmulerProps) => {
    const [visCollapsed, setVisCollapsed] = useState(true);

    const getSynligeBrodsmuler = () => {
        if (getVisCollapsed()) {
            return [
                brodsmuler[brodsmuler.length - 2],
                brodsmuler[brodsmuler.length - 1],
            ];
        }
        return brodsmuler;
    };

    const getVisCollapsed = () => {
        return brodsmuler.length > 3 && visCollapsed;
    };

    const synligeBrodsmuler = getSynligeBrodsmuler();

    return (
        <nav className="brodsmuler" aria-label="Du er her: ">
            <img src={personIkon} alt="Du" className="brodsmuler__ikon"/>
            <div className="brodsmuler__smuler">
                <Lenke href="/dittnav" className="js-smule brodsmuler__smule">Ditt NAV</Lenke>
                {
                    getVisCollapsed() &&
                    <span>
                        <button aria-label="Vis hele brødsmulestien"
                            className="js-toggle brodsmuler__smule"
                            onClick={() => setVisCollapsed(false)}>
                            ...
                        </button>
                    </span>
                }
                {
                    synligeBrodsmuler
                        .map((smule, index) => {
                            return {
                                ...smule,
                                sisteSmule: synligeBrodsmuler.length === index + 1,
                            };
                        })
                        .map((smule, index) => {
                            return <BrodsmuleBit key={index} {...smule} />;
                        })
                }
            </div>
        </nav>
    );
};

export default Brodsmuler;
