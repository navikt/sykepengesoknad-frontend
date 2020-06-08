import * as H from 'history';
import React from 'react';

import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus';
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype';
import { Soknad } from '../../../types/types';
import env from '../../../utils/environment';
import { logger } from '../../../utils/logger';
import { tekst } from '../../../utils/tekster';

interface AvbrytSoknadReq {
    valgtSoknad: Soknad;
    setSoknader: React.Dispatch<React.SetStateAction<Soknad[]>>;
    soknader: Soknad[];
    setValgtSoknad: React.Dispatch<React.SetStateAction<Soknad | undefined>>;
    history: H.History;
    setFeilmeldingTekst: React.Dispatch<React.SetStateAction<string>>;
}

export function avbrytSoknad({ valgtSoknad, setSoknader, soknader, setValgtSoknad, history, setFeilmeldingTekst }: AvbrytSoknadReq) {
    fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad!.id}/avbryt`, {
        method: 'POST',
        credentials: 'include',
    }).then((res) => {
        const status = res.status;
        if (status === 200) {
            if (valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND) {
                setSoknader(soknader.filter(s => s.id !== valgtSoknad.id));
                setValgtSoknad(undefined);
                history.push('/');
            } else {
                const nySoknad = { ...valgtSoknad, status: RSSoknadstatus.AVBRUTT, avbruttDato: new Date() };
                setSoknader(soknader.map(s => s.id === valgtSoknad!.id ? nySoknad : s) as any);
                setValgtSoknad(nySoknad);
                history.push(`/soknader/${valgtSoknad!.id}/1`);
            }


            setFeilmeldingTekst('');
        } else {
            logger.error('Feil ved AVBYTING av søknad', res);
            setFeilmeldingTekst(tekst('sykepengesoknad.avbryt.feilet'))
        }
    })
}
