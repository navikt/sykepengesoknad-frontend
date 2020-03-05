import React, { useEffect, useState } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Knapperad from './knapperad';
import { Sporsmal } from '../../../types/types';
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
import './sporsmal-form.less';
import { useAmplitudeInstance } from '../../amplitude/amplitude';
import env from '../../../utils/environment';
import { FetchState, hasData } from '../../../data/rest/utils';
import { RSMottakerResponse } from '../../../types/rs-types/rest-response/rs-mottakerresponse';
import { RSMottaker } from '../../../types/rs-types/rs-mottaker';
import useFetch from '../../../data/rest/use-fetch';

export interface SpmProps {
    sporsmal: Sporsmal;
}

const SporsmalForm = () => {
    const { setValgtSoknad, valgtSoknad, sendTil, setTop, setOppdaterSporsmalId, setSendTil } = useAppStore();
    const { logEvent } = useAmplitudeInstance();
    const [ erSiste, setErSiste ] = useState<boolean>(false);
    const { stegId } = useParams();
    const history = useHistory();
    const spmIndex = parseInt(stegId) - 1;
    const methods = useForm();
    const sporsmal = valgtSoknad.sporsmal[spmIndex];
    const nesteSporsmal = valgtSoknad.sporsmal[spmIndex + 1];
    const mottaker = useFetch<RSMottakerResponse>();
    const send = useFetch<{}>();

    useEffect(() => {
        const snartSlutt = sporsmal.svartype === RSSvartype.IKKE_RELEVANT || sporsmal.svartype === RSSvartype.CHECKBOX_PANEL;
        const sisteSide = snartSlutt && spmIndex === valgtSoknad.sporsmal.length - 2;
        setErSiste(sisteSide);
        if (sisteSide) hentMottaker();
        // eslint-disable-next-line
    }, [ spmIndex ]);

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
                }
                else if (m === RSMottaker.ARBEIDSGIVER) {
                    setSendTil([ SvarTil.ARBEIDSGIVER ]);
                }
                else if (m === RSMottaker.ARBEIDSGIVER_OG_NAV) {
                    setSendTil([ SvarTil.NAV, SvarTil.ARBEIDSGIVER ]);
                }
            }
        })
    };

    const sendSoknad = () => {
        send.fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad.id}/send`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }, (fetchState: FetchState<{}>) => {
            if (hasData(fetchState) === false) {
                // TODO: Burde håndtere dette med en feilmeldingskomponent, så den blir stående igjen på siste side
                console.log('Feilmelding fra backend:', fetchState);
            }
        })
    };

    const oppdaterVedInnsending = () => {
        sendTil.forEach(mottaker => {
            if (mottaker === SvarTil.NAV) {
                valgtSoknad.sendtTilNAVDato = new Date()
            }
            if (mottaker === SvarTil.ARBEIDSGIVER) {
                valgtSoknad.sendtTilArbeidsgiverDato = new Date();
            }
        });
        valgtSoknad.status = RSSoknadstatus.SENDT;
    };

    const onSubmit = () => {
        settSvar(sporsmal, methods.getValues());
        if (erSiste) {
            settSvar(nesteSporsmal, methods.getValues());
            sendSoknad();
            oppdaterVedInnsending();
            logEvent('Søknad sendt', { soknadstype: valgtSoknad.soknadstype });
        } else {
            logEvent('Spørsmål svart', { soknadstype: valgtSoknad.soknadstype, sporsmalstag: sporsmal.tag, svar: sporsmal.svarliste.svar[0].verdi })
        }

        methods.reset();
        setValgtSoknad(valgtSoknad);
        setOppdaterSporsmalId(spmIndex);
        setTop(0);
        erSiste
            ? history.push(pathUtenSteg(history.location.pathname).replace('soknader', 'kvittering'))
            : history.push(pathUtenSteg(history.location.pathname) + SEPARATOR + (spmIndex + 2));
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
