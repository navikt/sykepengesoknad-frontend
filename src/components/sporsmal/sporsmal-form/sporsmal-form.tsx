import React, { useEffect, useState } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Knapperad from './knapperad';
import { Soknad, Sporsmal } from '../../../types/types';
import SporsmalSwitch from '../sporsmal-switch';
import { pathUtenSteg } from '../sporsmal-utils';
import { useAppStore } from '../../../data/stores/app-store';
import FeilOppsummering from '../../skjema/feiloppsummering/feil-oppsummering';
import Vis from '../../vis';
import { RSSvartype } from '../../../types/rs-types/rs-svartype';
import CheckboxPanel from '../typer/checkbox-panel';
import SendtTil from '../../../pages/soknad/sendt-til';
import { SEPARATOR } from '../../../utils/constants';
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus';
import { SvarTil } from '../../../types/enums';
import Oppsummering from '../../soknaden/oppsummering/oppsummering';
import { settSvar } from '../sett-svar';
import { useAmplitudeInstance } from '../../amplitude/amplitude';
import env from '../../../utils/environment';
import { FetchState, hasData } from '../../../data/rest/utils';
import { RSMottakerResponse } from '../../../types/rs-types/rest-response/rs-mottakerresponse';
import { RSMottaker } from '../../../types/rs-types/rs-mottaker';
import useFetch from '../../../data/rest/use-fetch';
import { sporsmalToRS } from '../../../types/rs-types/rs-sporsmal';
import { RSOppdaterSporsmalResponse } from '../../../types/rs-types/rest-response/rs-oppdatersporsmalresponse';
import './sporsmal-form.less';
import { hentSvar } from '../hent-svar';

export interface SpmProps {
    sporsmal: Sporsmal;
}

const SporsmalForm = () => {
    const { soknader, setSoknader, setValgtSoknad, valgtSoknad, sendTil, setTop, setSendTil } = useAppStore();
    const { logEvent } = useAmplitudeInstance();
    const [ erSiste, setErSiste ] = useState<boolean>(false);
    const { stegId } = useParams();
    const history = useHistory();
    const spmIndex = parseInt(stegId) - 1;
    const methods = useForm();
    let restFeilet = false;
    let sporsmal = valgtSoknad.sporsmal[spmIndex];
    const nesteSporsmal = valgtSoknad.sporsmal[spmIndex + 1];
    const mottaker = useFetch<RSMottakerResponse>();

    useEffect(() => {
        const snartSlutt = sporsmal.svartype === RSSvartype.IKKE_RELEVANT || sporsmal.svartype === RSSvartype.CHECKBOX_PANEL;
        const sisteSide = snartSlutt && spmIndex === valgtSoknad.sporsmal.length - 2;
        setErSiste(sisteSide);
        if (sisteSide) hentMottaker();
        // eslint-disable-next-line
    }, [ spmIndex ]);

    const sendOppdaterSporsmal = async() => {
        let soknad = valgtSoknad;

        const res = await fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${soknad.id}/sporsmal/${sporsmal.id}`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(sporsmalToRS(sporsmal)),
            headers: { 'Content-Type': 'application/json' }
        });

        try {
            const data: RSOppdaterSporsmalResponse = await res.json();
            const httpCode = res.status;
            if ([ 200, 201, 203, 206 ].includes(httpCode)) {
                if (data.mutertSoknad) {
                    soknad = new Soknad(data.mutertSoknad);
                } else {
                    const spm = data.oppdatertSporsmal;
                    soknad.sporsmal[spmIndex] = new Sporsmal(spm, undefined, true);
                }
                soknader[soknader.findIndex(sok => sok.id === soknad.id)] = soknad;
                setSoknader(soknader);
                setValgtSoknad(soknad);
            } else {
                restFeilet = true;
                methods.setError('syfosoknad', 'rest-feilet', 'Opps');
            }
        } catch (e) {
            restFeilet = true;
            methods.setError('syfosoknad', 'rest-feilet', 'Opps');
        }
    };

    const hentMottaker = () => {
        mottaker.fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad.id}/finnMottaker`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }, (fetchState: FetchState<RSMottakerResponse>) => {
            if (hasData(fetchState)) {
                const m = fetchState.data.mottaker;
                if (m === RSMottaker.NAV) {
                    setSendTil([ SvarTil.NAV ]);
                } else if (m === RSMottaker.ARBEIDSGIVER) {
                    setSendTil([ SvarTil.ARBEIDSGIVER ]);
                } else if (m === RSMottaker.ARBEIDSGIVER_OG_NAV) {
                    setSendTil([ SvarTil.NAV, SvarTil.ARBEIDSGIVER ]);
                }
            }
        })
    };

    const sendSoknad = async() => {
        const res = await fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad.id}/send`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });

        try {
            const httpCode = res.status;
            if ([ 200, 201, 203, 206 ].includes(httpCode)) {
                sendTil.forEach(mottaker => {
                    if (mottaker === SvarTil.NAV) {
                        valgtSoknad.sendtTilNAVDato = new Date()
                    }
                    if (mottaker === SvarTil.ARBEIDSGIVER) {
                        valgtSoknad.sendtTilArbeidsgiverDato = new Date();
                    }
                });
                valgtSoknad.status = RSSoknadstatus.SENDT;
                setValgtSoknad(valgtSoknad);
                soknader[soknader.findIndex(sok => sok.id === valgtSoknad.id)] = valgtSoknad;
                setSoknader(soknader);
            } else {
                restFeilet = true;
                methods.setError('syfosoknad', 'rest-feilet', 'Opps');
            }
        } catch (e) {
            restFeilet = true;
            methods.setError('syfosoknad', 'rest-feilet', 'Opps');
        }
    };

    const onSubmit = async() => {
        settSvar(sporsmal, methods.getValues());
        if (erSiste) {
            settSvar(nesteSporsmal, methods.getValues());
            sporsmal = nesteSporsmal;
            await sendOppdaterSporsmal();
            await sendSoknad();
            logEvent('Søknad sendt', { soknadstype: valgtSoknad.soknadstype });
        } else {
            await sendOppdaterSporsmal();
            logEvent(
                'Spørsmål svart',
                {
                    soknadstype: valgtSoknad.soknadstype,
                    sporsmalstag: sporsmal.tag,
                    svar: hentSvar(sporsmal)
                }
            )
        }

        if (restFeilet) {
            methods.setError('syfosoknad', 'rest-feilet', 'Opps')
        } else {
            methods.clearError();
            methods.reset();
            setTop(0);
            erSiste
                ? history.push(pathUtenSteg(history.location.pathname).replace('soknader', 'kvittering'))
                : history.push(pathUtenSteg(history.location.pathname) + SEPARATOR + (spmIndex + 2));
        }
    };

    return (
        <FormContext {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className={'sporsmal__form ' + nesteSporsmal.tag.toLowerCase()}>
                <SporsmalSwitch sporsmal={sporsmal} />

                <Vis hvis={erSiste}>
                    <Oppsummering />
                    <CheckboxPanel sporsmal={nesteSporsmal} />
                    <SendtTil />
                </Vis>

                <FeilOppsummering errors={methods.errors} sporsmal={sporsmal} />
                <Knapperad onSubmit={onSubmit} />
            </form>
        </FormContext>
    )
};

export default SporsmalForm;
