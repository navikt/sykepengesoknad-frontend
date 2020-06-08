import './sporsmal-form.less';

import React, { useEffect, useState } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';

import useFetch from '../../../data/rest/use-fetch';
import { FetchState, hasData } from '../../../data/rest/utils';
import { useAppStore } from '../../../data/stores/app-store';
import { SvarTil, TagTyper } from '../../../types/enums';
import { RSMottakerResponse } from '../../../types/rs-types/rest-response/rs-mottakerresponse';
import { RSOppdaterSporsmalResponse } from '../../../types/rs-types/rest-response/rs-oppdatersporsmalresponse';
import { RSMottaker } from '../../../types/rs-types/rs-mottaker';
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus';
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype';
import { sporsmalToRS } from '../../../types/rs-types/rs-sporsmal';
import { RSSvartype } from '../../../types/rs-types/rs-svartype';
import { Soknad, Sporsmal } from '../../../types/types';
import { SEPARATOR } from '../../../utils/constants';
import env from '../../../utils/environment';
import { logger } from '../../../utils/logger';
import { useAmplitudeInstance } from '../../amplitude/amplitude';
import Oppsummering from '../../oppsummering/oppsummering';
import FeilOppsummering from '../../skjema/feiloppsummering/feil-oppsummering';
import Vis from '../../vis';
import { hentSvar } from '../hent-svar';
import { settSvar } from '../sett-svar';
import SporsmalSwitch from '../sporsmal-switch';
import { pathUtenSteg } from '../sporsmal-utils';
import CheckboxPanel from '../typer/checkbox-panel';
import Knapperad from './knapperad';
import skalViseKnapperad from './skal-vise-knapperad';

export interface SpmProps {
    sporsmal: Sporsmal;
}

const SporsmalForm = () => {
    const { soknader, setSoknader, setValgtSoknad, valgtSoknad, sendTil, setTop, setSendTil, rerenderSporsmalForm } = useAppStore();
    const { logEvent } = useAmplitudeInstance();
    const [ erSiste, setErSiste ] = useState<boolean>(false);
    const { stegId } = useParams();
    const history = useHistory();
    const spmIndex = parseInt(stegId) - 1;
    const methods = useForm();
    const erUtlandssoknad = valgtSoknad!.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
    let restFeilet = false;
    let sporsmal = valgtSoknad!.sporsmal[spmIndex];
    const nesteSporsmal = valgtSoknad!.sporsmal[spmIndex + 1];
    const mottaker = useFetch<RSMottakerResponse>();

    useEffect(() => {
        function erSiste() {
            const snartSlutt = sporsmal.svartype === RSSvartype.IKKE_RELEVANT || sporsmal.svartype === RSSvartype.CHECKBOX_PANEL;
            if (erUtlandssoknad) {
                return sporsmal.tag === TagTyper.BEKREFT_OPPLYSNINGER_UTLAND_INFO
            }
            return snartSlutt && spmIndex === valgtSoknad!.sporsmal.length - 2;

        }

        const sisteSide = erSiste();
        setErSiste(sisteSide);
        if (sisteSide) hentMottaker();
        // eslint-disable-next-line
    }, [spmIndex]);

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    useEffect(() => {
    }, [ rerenderSporsmalForm ]);

    const sendOppdaterSporsmal = async() => {
        let soknad = valgtSoknad;

        const res = await fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${soknad!.id}/sporsmal/${sporsmal.id}`, {
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
                    erSiste ?
                        soknad!.sporsmal[spmIndex + 1] = new Sporsmal(spm, undefined as any, true) :
                        soknad!.sporsmal[spmIndex] = new Sporsmal(spm, undefined as any, true);
                }
                soknader[soknader.findIndex(sok => sok.id === soknad!.id)] = soknad as any;
                setSoknader(soknader);
                setValgtSoknad(soknad);
            } else {
                logger.error('Feil ved kall OPPDATER_SPORSMAL', res);
                restFeilet = true;
            }
        } catch (e) {
            logger.error('Feil ved kall OPPDATER_SPORSMAL', e);
            restFeilet = true;
        }
    };


    const hentMottaker = () => {
        mottaker.fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad!.id}/finnMottaker`, {
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
            } else {
                logger.error('Klarte ikke hente MOTTAKER av søknad', fetchState);
            }
        })
    };

    const sendSoknad = async() => {
        const res = await fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad!.id}/send`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });

        try {
            const httpCode = res.status;
            if ([ 200, 201, 203, 206 ].includes(httpCode)) {
                sendTil.forEach(mottaker => {
                    if (mottaker === SvarTil.NAV) {
                        valgtSoknad!.sendtTilNAVDato = new Date()
                    }
                    if (mottaker === SvarTil.ARBEIDSGIVER) {
                        valgtSoknad!.sendtTilArbeidsgiverDato = new Date();
                    }
                });
                valgtSoknad!.status = RSSoknadstatus.SENDT;
                setValgtSoknad(valgtSoknad);
                soknader[soknader.findIndex(sok => sok.id === valgtSoknad!.id)] = valgtSoknad!;
                setSoknader(soknader);
            } else {
                logger.error('Feil ved sending av søknad', res);
                restFeilet = true;
            }
        } catch (e) {
            logger.error('Feil ved sending av søknad', e);
            restFeilet = true;
        }
    };

    const onSubmit = async() => {
        settSvar(sporsmal, methods.getValues());
        if (erSiste) {
            if (!erUtlandssoknad) {
                settSvar(nesteSporsmal, methods.getValues());
                sporsmal = nesteSporsmal;
            }
            await sendOppdaterSporsmal();

            await sendSoknad();
            logEvent('Søknad sendt', { soknadstype: valgtSoknad!.soknadstype });
        } else {
            await sendOppdaterSporsmal();
            logEvent(
                'Spørsmål svart',
                {
                    soknadstype: valgtSoknad!.soknadstype,
                    sporsmalstag: sporsmal.tag,
                    svar: hentSvar(sporsmal)
                }
            )
        }

        if (restFeilet) {
            methods.setError('syfosoknad', 'rest-feilet', 'Beklager, det oppstod en feil');
            sporsmal = valgtSoknad!.sporsmal[spmIndex];
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
            <form onSubmit={methods.handleSubmit(onSubmit)}
                className={'sporsmal__form ' + nesteSporsmal?.tag?.toLowerCase()}>
                <SporsmalSwitch sporsmal={sporsmal} />

                <Vis hvis={erSiste && !erUtlandssoknad}>
                    <Oppsummering />
                    <CheckboxPanel sporsmal={nesteSporsmal} />
                </Vis>

                <Vis hvis={erSiste && erUtlandssoknad}>
                    <CheckboxPanel sporsmal={sporsmal} />
                </Vis>

                <FeilOppsummering errors={methods.errors} sporsmal={sporsmal} />

                <Vis hvis={skalViseKnapperad(valgtSoknad!, sporsmal, methods.getValues())}>
                    <Knapperad onSubmit={onSubmit} />
                </Vis>
            </form>
        </FormContext>
    )
};

export default SporsmalForm;
