import createUseContext from 'constate';
import { useState } from 'react';
import { Soknad, Sykmelding } from '../../types/types';
import { SvarTil } from '../../types/enums';

export const useAppStore = createUseContext(() => {
    const [ unleash, setUnleash ] = useState<{}>([]);
    const [ soknader, setSoknader ] = useState<Soknad[]>([]);
    const [ sykmeldinger, setSykmeldinger ] = useState<Sykmelding[]>([]);
    const [ valgtSoknad, setValgtSoknad ] = useState<Soknad>();
    const [ valgtSykmelding, setValgtSykmelding ] = useState<Sykmelding>();
    const [ sendTil, setSendTil ] = useState<SvarTil[]>([]);

    return {
        unleash, setUnleash,
        soknader, setSoknader,
        valgtSoknad, setValgtSoknad,
        sykmeldinger, setSykmeldinger,
        valgtSykmelding, setValgtSykmelding,
        sendTil, setSendTil,
    };
});
