import constate from 'constate';
import { useState } from 'react';

import { SvarTil } from '../../types/enums';
import { Soknad, Sykmelding, UnleashToggles } from '../../types/types';

export const [ AppStoreProvider, useAppStore ] = constate(() => {
    const [ unleash, setUnleash ] = useState<UnleashToggles>();
    const [ soknader, setSoknader ] = useState<Soknad[]>([]);
    const [ sykmeldinger, setSykmeldinger ] = useState<Sykmelding[]>([]);
    const [ valgtSoknad, setValgtSoknad ] = useState<Soknad>();
    const [ valgtSykmelding, setValgtSykmelding ] = useState<Sykmelding>();
    const [ sendTil, setSendTil ] = useState<SvarTil[]>([]);
    const [ top, setTop ] = useState<number>(0);
    const [ validCheck, setValidCheck ] = useState<boolean>();
    const [ feilmeldingTekst, setFeilmeldingTekst ] = useState<string>('');
    const [ rerenderSporsmalForm, setRerenderSporsmalForm ] = useState<number>(new Date().getUTCMilliseconds());

    return {
        unleash, setUnleash,
        soknader, setSoknader,
        valgtSoknad, setValgtSoknad,
        sykmeldinger, setSykmeldinger,
        valgtSykmelding, setValgtSykmelding,
        sendTil, setSendTil,
        top, setTop,
        validCheck, setValidCheck,
        feilmeldingTekst, setFeilmeldingTekst,
        rerenderSporsmalForm, setRerenderSporsmalForm,
    };
});
