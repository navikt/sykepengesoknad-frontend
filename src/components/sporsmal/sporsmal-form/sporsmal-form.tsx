import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAppStore } from '../../../data/stores/app-store';
import { Sporsmal } from '../../../types/types';
import FeilOppsummering from '../../skjema/feiloppsummering/feil-oppsummering';
import useForm, { FormContext } from 'react-hook-form';
import Knapperad from './knapperad';
import SporsmalSwitch from '../undersporsmal/sporsmal-switch';
import { pathUtenSteg, settSvar } from '../sporsmal-utils';
import './sporsmal-form.less';

export interface SpmProps {
    sporsmal: Sporsmal;
}

const SporsmalForm = () => {
    const { setValgtSoknad, valgtSoknad, setVisUnderspm } = useAppStore();
    const { stegId } = useParams();
    const history = useHistory();
    const spmIndex = parseInt(stegId) - 1;
    const methods = useForm();
    const sporsmal = valgtSoknad.sporsmal[spmIndex];
    console.log('valgtSoknad', valgtSoknad); // eslint-disable-line

    const onSubmit = (data: Record<string, any>) => {
        setVisUnderspm(false);
        settSvar(sporsmal, data);
        methods.reset();
        methods.unregister('spm_' + sporsmal.id);
        setValgtSoknad(valgtSoknad);
        history.push(pathUtenSteg(history.location.pathname) + '/' + (spmIndex + 2));
    };

    return (
        <FormContext {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="sporsmal__form">
                <FeilOppsummering visFeilliste={true} errors={methods.errors} />
                <SporsmalSwitch sporsmal={sporsmal} />
                <Knapperad onSubmit={onSubmit} />
            </form>
        </FormContext>
    )
};

export default SporsmalForm;
