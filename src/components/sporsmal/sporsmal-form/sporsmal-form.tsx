import React, { useEffect, useState } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Knapperad from './knapperad';
import { Sporsmal } from '../../../types/types';
import SporsmalSwitch from '../sporsmal-switch';
import { pathUtenSteg, settSvar } from '../sporsmal-utils';
import { useAppStore } from '../../../data/stores/app-store';
import FeilOppsummering from '../../skjema/feiloppsummering/feil-oppsummering';
import Vis from '../../vis';
import { RSSvartype } from '../../../types/rs-types/rs-svartype';
import CheckboxPanel from '../typer/checkbox-panel';
import SendtTil from '../../../pages/soknad/sendt-til';
import { SEPARATOR } from '../../../utils/constants';
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus';
import { SvarTil } from '../../../types/enums';
import './sporsmal-form.less';
import Oppsummering from "../../soknaden/oppsummering/oppsummering";

export interface SpmProps {
    sporsmal: Sporsmal;
}

const SporsmalForm = () => {
    const { setValgtSoknad, valgtSoknad, sendTil } = useAppStore();
    const [ erSiste, setErSiste ] = useState<boolean>(false);
    const { stegId } = useParams();
    const history = useHistory();
    const spmIndex = parseInt(stegId) - 1;
    const methods = useForm();
    const sporsmal = valgtSoknad.sporsmal[spmIndex];

    useEffect(() => {
        const snartSlutt = sporsmal.svartype === RSSvartype.IKKE_RELEVANT || sporsmal.svartype === RSSvartype.CHECKBOX_PANEL;
        setErSiste(snartSlutt && spmIndex === valgtSoknad.sporsmal.length - 2);
    }, [ spmIndex, sporsmal, valgtSoknad ]);

    const onSubmit = () => {
        if (sporsmal.svartype === RSSvartype.BEHANDLINGSDAGER) {
            sporsmal.undersporsmal.forEach(uspm => {
                settSvar(uspm, methods.getValues());
            })
        }
        settSvar(sporsmal, methods.getValues());
        if (erSiste) {
            settSvar(valgtSoknad.sporsmal[spmIndex + 1], methods.getValues());
            sendTil.map(svar => {
                svar === SvarTil.NAV
                    ? valgtSoknad.sendtTilNAVDato = new Date()
                    : valgtSoknad.sendtTilArbeidsgiverDato = new Date();
                return svar;
            });
            valgtSoknad.status = RSSoknadstatus.SENDT;
            setValgtSoknad(valgtSoknad);
        }
        methods.reset();
        //methods.unregister(sporsmal.id);
        setValgtSoknad(valgtSoknad);
        erSiste
            ? history.push(pathUtenSteg(history.location.pathname).replace('soknader', 'kvittering'))
            : history.push(pathUtenSteg(history.location.pathname) + SEPARATOR + (spmIndex + 2));
    };

    return (
        <FormContext {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="sporsmal__form">
                <FeilOppsummering visFeilliste={true} errors={methods.errors} />
                <SporsmalSwitch sporsmal={sporsmal} />

                <Vis hvis={erSiste}>
                    <Oppsummering/>
                    <CheckboxPanel sporsmal={valgtSoknad.sporsmal[spmIndex + 1]}/>
                    <SendtTil/>
                </Vis>

                <Knapperad onSubmit={onSubmit} />
            </form>
        </FormContext>
    )
};

export default SporsmalForm;
