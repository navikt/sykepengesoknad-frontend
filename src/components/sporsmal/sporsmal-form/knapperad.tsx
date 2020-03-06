<<<<<<< HEAD
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import tekster from './knapperad-tekster';
import { useParams, Link } from 'react-router-dom';
import { useAppStore } from '../../../data/stores/app-store';
import Vis from '../../vis';
import env from '../../../utils/environment';
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus';
=======
import React, {MouseEvent, useEffect, useRef, useState} from 'react';
import {Knapp} from 'nav-frontend-knapper';
import {Normaltekst} from 'nav-frontend-typografi';
import tekster from './knapperad-tekster';
import {useParams} from 'react-router-dom';
import {useAppStore} from '../../../data/stores/app-store';
import Vis from "../../vis";
import {getTop} from "../../../utils/browser-utils";
>>>>>>> 0f1ccc4d64bac95628c21187fdbeab57a98c218c

type Event = MouseEvent<HTMLAnchorElement | HTMLButtonElement>;

interface KnapperadProps {
    onSubmit: Function;
}

<<<<<<< HEAD
const Knapperad = ({ onSubmit }: KnapperadProps) => {
    const { valgtSoknad, soknader, setSoknader } = useAppStore();
    const { stegId } = useParams();
=======
const Knapperad = ({onSubmit}: KnapperadProps) => {
    const {valgtSoknad} = useAppStore();
    const {stegId} = useParams();
>>>>>>> 0f1ccc4d64bac95628c21187fdbeab57a98c218c
    const spmIndex = parseInt(stegId) - 2;
    const nokkel = spmIndex === valgtSoknad.sporsmal.length - 3
        ? 'sykepengesoknad.send'
        : 'sykepengesoknad.ga-videre';
    const avbrytDialog = useRef<HTMLDivElement>(null);
<<<<<<< HEAD
    const [ vilAvbryte, setVilAvbryte ] = useState<boolean>(false);

    useEffect(() => {
        if (vilAvbryte) {
            window.scrollTo({ top: avbrytDialog.current.offsetTop, left: 0, behavior: 'smooth' });
        }
    }, [ vilAvbryte ]);
=======
    const [vilAvbryte, setVilAvbryte] = useState<boolean>(false);

    useEffect(() => {
        if (vilAvbryte) {
            const end = getTop(avbrytDialog.current, 600);
            window.scrollTo(end, 800);
        }
    }, [vilAvbryte]);
>>>>>>> 0f1ccc4d64bac95628c21187fdbeab57a98c218c

    const handleVilAvbryte = (event: Event) => {
        event.preventDefault();
        setVilAvbryte(!vilAvbryte);
    };

<<<<<<< HEAD
    const handleAvbryt = () => {
        fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad.id}/avbryt`, {
            method: 'POST',
            credentials: 'include',
        }).then((response) => {
            return response.status
        }).then(status => {
            if (status === 200) {
                setSoknader(soknader.map(s => s.id === valgtSoknad.id ? { ...s, status: RSSoknadstatus.AVBRUTT } : s));
            } else {
                console.log('not cool');
            }
        })
=======
    const handleAvbryt = (event: Event) => {
        event.preventDefault();
        alert(`Nå vil jeg avbryte ${valgtSoknad.id}!!!`);
>>>>>>> 0f1ccc4d64bac95628c21187fdbeab57a98c218c
    };

    return (
        <div className="knapperad">
            <Knapp type="hoved" onClick={() => onSubmit}>{tekster[nokkel]}</Knapp>
            <div className="avbrytDialog blokk-l">
                <a className="lenke avbrytlenke avbrytDialog__trigger" onClick={handleVilAvbryte}>{tekster['sykepengesoknad.avbryt.trigger']}</a>
                <Vis hvis={vilAvbryte}>
                    <div ref={avbrytDialog} className="avbrytDialog__dialog pekeboble">
                        <Normaltekst className="blokk-s">{tekster['sykepengesoknad.avbryt.sporsmal']}</Normaltekst>
<<<<<<< HEAD
                        <div className="blokk-xs">
                            <Link className="knapp knapp--fare" onClick={handleAvbryt} to={`/soknader/${valgtSoknad.id}`} type="fare" >{tekster['sykepengesoknad.avbryt.ja']}</Link>
                        </div>
=======
                        <Knapp className="blokk-xs" onClick={handleAvbryt} type="fare">{tekster['sykepengesoknad.avbryt.ja']}</Knapp>
>>>>>>> 0f1ccc4d64bac95628c21187fdbeab57a98c218c
                        <a className="lenke" onClick={handleVilAvbryte}>{tekster['sykepengesoknad.avbryt.angre']}</a>
                    </div>
                </Vis>
            </div>
        </div>
    )
};

export default Knapperad;
