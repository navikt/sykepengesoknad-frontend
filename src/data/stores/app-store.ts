import createUseContext from 'constate';
import { useState } from 'react';
import { Soknad, Sykmelding, UnleashToggles } from '../../types/types';
import { SvarTil } from '../../types/enums';

export const useAppStore = createUseContext(() => {
    const [ unleash, setUnleash ] = useState<UnleashToggles>();
    const [ soknader, setSoknader ] = useState<Soknad[]>([]);
    const [ sykmeldinger, setSykmeldinger ] = useState<Sykmelding[]>([]);
    const [ valgtSoknad, setValgtSoknad ] = useState<Soknad>();
    const [ valgtSykmelding, setValgtSykmelding ] = useState<Sykmelding>();
    const [ sendTil, setSendTil ] = useState<SvarTil[]>([]);
    const [ top, setTop ] = useState<number>(0);
    const [ validCheck, setValidCheck ] = useState<boolean>();
    const [ oppdaterSporsmalId, setOppdaterSporsmalId ] = useState<number>();

    return {
        unleash, setUnleash,
        soknader, setSoknader,
        valgtSoknad, setValgtSoknad,
        sykmeldinger, setSykmeldinger,
        valgtSykmelding, setValgtSykmelding,
        sendTil, setSendTil,
        top, setTop,
        validCheck, setValidCheck,
        oppdaterSporsmalId, setOppdaterSporsmalId,
    };
});
