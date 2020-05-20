import React from 'react';
import Status from './status';
import Utbetaling from './utbetaling';
import { Knapp } from 'nav-frontend-knapper';
import Vis from '../../vis';
import { useAppStore } from '../../../data/stores/app-store';
import './status-panel.less';
import env from '../../../utils/environment';
import useFetch from '../../../data/rest/use-fetch';
import { RSSoknad } from '../../../types/rs-types/rs-soknad';
import { FetchState, hasData } from '../../../data/rest/utils';
import { Soknad } from '../../../types/types';
import { useHistory } from 'react-router';
import Ettersending from './ettersending';
import { getUrlTilSoknad } from '../../../utils/url-utils';
import Alertstripe from 'nav-frontend-alertstriper';
import { tekst } from '../../../utils/tekster';

const StatusPanel = () => {
    const { valgtSoknad, soknader, setSoknader, feilmeldingTekst, setFeilmeldingTekst } = useAppStore();
    const korrigerSoknad = useFetch<RSSoknad>();
    const history = useHistory();

    const korriger = () => {
        korrigerSoknad.fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad.id}/korriger`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }, (fetchState: FetchState<RSSoknad>) => {
            if (hasData(fetchState)) {
                const soknad = new Soknad(fetchState.data);
                soknader.push(soknad);
                setSoknader(soknader);
                history.push(getUrlTilSoknad(soknad.id, '1'));
                setFeilmeldingTekst('');
            } else {
                setFeilmeldingTekst(tekst('statuspanel.korrigering.feilet'));
            }
        });
    };

    return (
        <div className='panel status-panel'>
            <Vis hvis={valgtSoknad.sendtTilNAVDato || valgtSoknad.sendtTilArbeidsgiverDato}>
                <Status/>
                <Utbetaling/>
            </Vis>

            <div className='knapperad'>
                <Knapp mini type='standard' onClick={korriger}>{tekst('statuspanel.knapp.endre')}</Knapp>

                <Ettersending gjelder='nav'/>

                <Vis hvis={valgtSoknad.arbeidsgiver !== undefined}>
                    <Ettersending gjelder='arbeidsgiver'/>
                </Vis>
            </div>

            <div aria-live="polite">
                <Vis hvis={feilmeldingTekst !== ''}>
                    <Alertstripe type="feil">{feilmeldingTekst}</Alertstripe>
                </Vis>
            </div>
        </div>
    );
};

export default StatusPanel;
