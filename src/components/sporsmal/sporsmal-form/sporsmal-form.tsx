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
        console.log('sporsmal', sporsmal); // eslint-disable-line
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
