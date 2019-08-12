import * as React from 'react';
import EttSporsmalPerSide from './ett-sporsmal-per-side';
import { validerDenneSiden, validerForegaendeSider } from '../../validering/valider-ett-sporsmal-per-side';
import SoknadStatusSjekker from '../../soknad/status/soknad-status-sjekker';
import soknadSetup from '../../../utils/soknad-setup';

const EttSporsmalPerSideContainer = (props: any) => {
    return (
        <SoknadStatusSjekker {...props} Component={EttSporsmalPerSide} valider={validerForegaendeSider}/>
    );
};

export default soknadSetup(validerDenneSiden, EttSporsmalPerSideContainer, true);
