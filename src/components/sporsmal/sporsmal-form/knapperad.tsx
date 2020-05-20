import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { Knapp, Fareknapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import { useParams, useHistory } from 'react-router-dom';
import { useAppStore } from '../../../data/stores/app-store';
import Vis from '../../vis';
import env from '../../../utils/environment';
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus';
import Alertstripe from 'nav-frontend-alertstriper';
import { tekst } from '../../../utils/tekster';

type Event = MouseEvent<HTMLAnchorElement | HTMLButtonElement>;

interface KnapperadProps {
    onSubmit: Function;
}

const Knapperad = ({ onSubmit }: KnapperadProps) => {
    const { valgtSoknad, setValgtSoknad, soknader, setSoknader, feilmeldingTekst, setFeilmeldingTekst } = useAppStore();
    const history = useHistory();
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

    const handleAvbryt = (event: Event) => {
        event.preventDefault();
        fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad.id}/avbryt`, {
            method: 'POST',
            credentials: 'include',
        }).then((response) => {
            return response.status
        }).then(status => {
            if (status === 200) {
                const nySoknad = { ...valgtSoknad, status: RSSoknadstatus.AVBRUTT, avbruttDato: new Date() };
                setSoknader(soknader.map(s => s.id === valgtSoknad.id ? nySoknad : s));
                setValgtSoknad(nySoknad);
                history.push(`/soknader/${valgtSoknad.id}/1`);
                setFeilmeldingTekst('');
            } else {
                setFeilmeldingTekst(tekst('sykepengesoknad.avbryt.feilet'))
            }
        })
    };

    return (
        <div className="knapperad">
            <Knapp type="hoved" onClick={() => onSubmit}>{tekst(nokkel)}</Knapp>
            <div className="avbrytDialog blokk-l">
                <button className="lenke avbrytlenke avbrytDialog__trigger" onClick={handleVilAvbryte}>
                    {tekst('sykepengesoknad.avbryt.trigger')}
                </button>
                <Vis hvis={vilAvbryte}>
                    <div ref={avbrytDialog} className="avbrytDialog__dialog pekeboble">
                        <Normaltekst className="blokk-s">{tekst('sykepengesoknad.avbryt.sporsmal')}</Normaltekst>
                        <div className="blokk-xs">
                            <Fareknapp onClick={handleAvbryt}>{tekst('sykepengesoknad.avbryt.ja')}</Fareknapp>
                        </div>
                        <div aria-live="polite">
                            <Vis hvis={feilmeldingTekst !== ''}>
                                <Alertstripe type="feil">{feilmeldingTekst}</Alertstripe>
                            </Vis>
                        </div>
                        <button className="lenke" onClick={handleVilAvbryte}>
                            {tekst('sykepengesoknad.avbryt.angre')}
                        </button>
                    </div>
                </Vis>
            </div>
        </div>
    )
};

export default Knapperad;
