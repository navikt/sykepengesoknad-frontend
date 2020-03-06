import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import tekster from './knapperad-tekster';
import { useParams, Link } from 'react-router-dom';
import { useAppStore } from '../../../data/stores/app-store';
import Vis from '../../vis';
import env from '../../../utils/environment';
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus';

type Event = MouseEvent<HTMLAnchorElement | HTMLButtonElement>;

interface KnapperadProps {
    onSubmit: Function;
}

const Knapperad = ({ onSubmit }: KnapperadProps) => {
    const { valgtSoknad, soknader, setSoknader } = useAppStore();
    const { stegId } = useParams();

    const spmIndex = parseInt(stegId) - 2;
    const nokkel = spmIndex === valgtSoknad.sporsmal.length - 3
        ? 'sykepengesoknad.send'
        : 'sykepengesoknad.ga-videre';
    const avbrytDialog = useRef<HTMLDivElement>(null);
    const [ vilAvbryte, setVilAvbryte ] = useState<boolean>(false);

    useEffect(() => {
        if (vilAvbryte) {
            window.scrollTo({ top: avbrytDialog.current.offsetTop, left: 0, behavior: 'smooth' });
        }
    }, [ vilAvbryte ]);

    const handleVilAvbryte = (event: Event) => {
        event.preventDefault();
        setVilAvbryte(!vilAvbryte);
    };

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
    };

    return (
        <div className="knapperad">
            <Knapp type="hoved" onClick={() => onSubmit}>{tekster[nokkel]}</Knapp>
            <div className="avbrytDialog blokk-l">
                <a className="lenke avbrytlenke avbrytDialog__trigger" onClick={handleVilAvbryte}>{tekster['sykepengesoknad.avbryt.trigger']}</a>
                <Vis hvis={vilAvbryte}>
                    <div ref={avbrytDialog} className="avbrytDialog__dialog pekeboble">
                        <Normaltekst className="blokk-s">{tekster['sykepengesoknad.avbryt.sporsmal']}</Normaltekst>
                        <div className="blokk-xs">
                            <Link className="knapp knapp--fare" onClick={handleAvbryt} to={`/soknader/${valgtSoknad.id}`} type="fare" >{tekster['sykepengesoknad.avbryt.ja']}</Link>
                        </div>
                        <a className="lenke" onClick={handleVilAvbryte}>{tekster['sykepengesoknad.avbryt.angre']}</a>
                    </div>
                </Vis>
            </div>
        </div>
    )
};

export default Knapperad;
