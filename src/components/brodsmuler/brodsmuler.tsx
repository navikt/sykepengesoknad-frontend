import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Lenke from 'nav-frontend-lenker';
import { Brodsmule } from '../../types/types';
import personIkon from './person.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import './brodsmuler.less';
import { useAppStore } from '../../data/stores/app-store';

const BrodsmuleBit = ({ sti, tittel, sisteSmule, erKlikkbar }: Brodsmule) => {
    const erEkstern = sti && sti.includes(process.env.REACT_APP_SYKEFRAVAER_CONTEXT_ROOT!);
    const link = erEkstern
        ? <Lenke href={sti}>{tittel}</Lenke>
        : sti
            ? <Link to={sti} className="lenke">{tittel}</Link>
            : <span>{tittel}</span>;

    if (sisteSmule) {
        return (
            <li className="smule">
                <span className="vekk">Du er her:</span>
                <span>{tittel}</span>
            </li>
        );
    } else if (erKlikkbar) {
        return (
            <li className="smule">{link}</li>
        );
    }
    return (
        <li className="smule">
            <span>{tittel}</span>
        </li>
    );
};


interface BrodsmulerProps {
    brodsmuler: Brodsmule[];
}

const Brodsmuler = ({ brodsmuler }: BrodsmulerProps) => {
    const { valgtSoknad, valgtSykmelding } = useAppStore();
    const [ visCollapsed, setVisCollapsed ] = useState(true);

    const getVisCollapsed = () => {
        return brodsmuler.length > 3 && visCollapsed;
    };

    const getSynligeBrodsmuler = () => {
        if (getVisCollapsed()) {
            return [
                brodsmuler[brodsmuler.length - 2],
                brodsmuler[brodsmuler.length - 1],
            ];
        }
        return brodsmuler;
    };

    const synligeBrodsmuler = getSynligeBrodsmuler();

    return (
        <>
        <nav className="brodsmuler" aria-label="Du er her: ">
            <img src={personIkon} alt="Du" className="brodsmuler__ikon" />
            <Normaltekst tag="ul" className="brodsmuler__smuler">
                <li className="smule">
                    <Lenke href="/dittnav">Ditt NAV</Lenke>
                </li>
                <li className="smule">
                    <Lenke href="/sykefravaer">Ditt Sykefravær</Lenke>
                </li>
                {
                    getVisCollapsed() &&
                    <li className="smule">
                        <button aria-label="Vis hele brødsmulestien"
                            className="js-toggle"
                            onClick={() => setVisCollapsed(false)}>
                            ...
                        </button>
                    </li>
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
            </Normaltekst>
        </nav>
            <span>sok <strong>{
                valgtSoknad &&
                valgtSoknad.id.substring(valgtSoknad.id.length - 6, valgtSoknad.id.length)
            }</strong></span>
            &nbsp;&nbsp;
            <span>syk <strong>{
                valgtSykmelding &&
                valgtSykmelding.id.substring(valgtSykmelding.id.length - 6, valgtSykmelding.id.length)
            }</strong></span>
            <br />
            <br />
            </>
    );
};

export default Brodsmuler;
