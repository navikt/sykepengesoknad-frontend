import React from 'react';
import useForm, { FormContext } from 'react-hook-form';
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
import './sporsmal-form.less';
import SendtTil from '../../../pages/soknad/sendt-til';

export interface SpmProps {
    sporsmal: Sporsmal;
}

const SporsmalForm = () => {
    const { setValgtSoknad, valgtSoknad } = useAppStore();
    const { stegId } = useParams();
    const history = useHistory();
    const spmIndex = parseInt(stegId) - 1;
    const methods = useForm();
    const sporsmal = valgtSoknad.sporsmal[spmIndex];

    const onSubmit = () => {
        settSvar(sporsmal, methods.getValues());
        methods.reset();
        methods.unregister(sporsmal.id);
        setValgtSoknad(valgtSoknad);
        history.push(pathUtenSteg(history.location.pathname) + '/' + (spmIndex + 2));
    };

    return (
        <FormContext {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="sporsmal__form">
                <FeilOppsummering visFeilliste={true} errors={methods.errors} />
                <SporsmalSwitch sporsmal={sporsmal} />

                <Vis hvis={
                    sporsmal.svartype === RSSvartype.IKKE_RELEVANT &&
                    spmIndex === valgtSoknad.sporsmal.length - 2
                }>
                    <CheckboxPanel sporsmal={valgtSoknad.sporsmal[spmIndex + 1]} />
                    <SendtTil />
                </Vis>

                <Knapperad onSubmit={onSubmit} />
            </form>
        </FormContext>
    )
};

export default SporsmalForm;
