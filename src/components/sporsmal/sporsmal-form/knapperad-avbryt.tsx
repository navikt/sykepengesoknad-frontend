import { Fareknapp } from 'nav-frontend-knapper';
import React, { MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';

import { useAppStore } from '../../../data/stores/app-store';
import { tekst } from '../../../utils/tekster';
import { avbrytSoknad } from './avbryt-soknad';

type Event = MouseEvent<HTMLAnchorElement | HTMLButtonElement>;


const KnapperadAvbryt = () => {
    const { valgtSoknad, soknader, setSoknader, setValgtSoknad, setFeilmeldingTekst } = useAppStore();
    const history = useHistory();

    const handleAvbryt = (event: Event) => {
        event.preventDefault();

        avbrytSoknad({
            valgtSoknad: valgtSoknad!,
            setSoknader: setSoknader,
            soknader: soknader,
            setValgtSoknad: setValgtSoknad,
            history: history,
            setFeilmeldingTekst: setFeilmeldingTekst
        });
    };

    return (
        <div className="knapperad">
            <Fareknapp htmlType={'button'} onClick={handleAvbryt}>{tekst('sykepengesoknad.avbryt.simpel')}</Fareknapp>
        </div>
    )
};

export default KnapperadAvbryt
