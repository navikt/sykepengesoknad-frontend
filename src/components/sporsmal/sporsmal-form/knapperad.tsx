import React, {MouseEvent, useEffect, useRef, useState} from 'react';
import {Knapp} from 'nav-frontend-knapper';
import {Normaltekst} from 'nav-frontend-typografi';
import tekster from './knapperad-tekster';
import {useParams} from 'react-router-dom';
import {useAppStore} from '../../../data/stores/app-store';
import Vis from "../../vis";
import {getTop} from "../../../utils/browser-utils";

type Event = MouseEvent<HTMLAnchorElement | HTMLButtonElement>;

interface KnapperadProps {
    onSubmit: Function;
}

const Knapperad = ({onSubmit}: KnapperadProps) => {
    const {valgtSoknad} = useAppStore();
    const {stegId} = useParams();
    const spmIndex = parseInt(stegId) - 2;
    const nokkel = spmIndex === valgtSoknad.sporsmal.length - 3
        ? 'sykepengesoknad.send'
        : 'sykepengesoknad.ga-videre';
    const avbrytDialog = useRef<HTMLDivElement>(null);
    const [vilAvbryte, setVilAvbryte] = useState<boolean>(false);

    useEffect(() => {
        if (vilAvbryte) {
            const end = getTop(avbrytDialog.current, 600);
            window.scrollTo(end, 800);
        }
    }, [vilAvbryte]);

    const handleVilAvbryte = (event: Event) => {
        event.preventDefault();
        setVilAvbryte(!vilAvbryte);
    };

    const handleAvbryt = (event: Event) => {
        event.preventDefault();
        alert(`Nå vil jeg avbryte ${valgtSoknad.id}!!!`);
    };

    return (
        <div className="knapperad">
            <Knapp type="hoved" onClick={() => onSubmit}>{tekster[nokkel]}</Knapp>
            <div className="avbrytDialog blokk-l">
                <a className="lenke avbrytlenke avbrytDialog__trigger" onClick={handleVilAvbryte}>{tekster['sykepengesoknad.avbryt.trigger']}</a>
                <Vis hvis={vilAvbryte}>
                    <div ref={avbrytDialog} className="avbrytDialog__dialog pekeboble">
                        <Normaltekst className="blokk-s">{tekster['sykepengesoknad.avbryt.sporsmal']}</Normaltekst>
                        <Knapp className="blokk-xs" onClick={handleAvbryt} type="fare">{tekster['sykepengesoknad.avbryt.ja']}</Knapp>
                        <a className="lenke" onClick={handleVilAvbryte}>{tekster['sykepengesoknad.avbryt.angre']}</a>
                    </div>
                </Vis>
            </div>
        </div>
    )
};

export default Knapperad;
