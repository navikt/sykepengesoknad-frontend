import createUseContext from 'constate';
import { useState } from 'react';
import { Soknad, Sykmelding } from '../../types/types';

export const useAppStore = createUseContext(() => {
    const [unleash, setUnleash] = useState<{}>([]);
    const [soknader, setSoknader] = useState<Soknad[]>([]);
    const [sykmeldinger, setSykmeldinger] = useState<Sykmelding[]>([]);
    const [valgtSoknad, setValgtSoknad] = useState<Soknad>();
    const [valgtSykmelding, setValgtSykmelding] = useState<Sykmelding>();

    return {
        unleash, setUnleash,
        soknader, setSoknader,
        valgtSoknad, setValgtSoknad,
        sykmeldinger, setSykmeldinger,
        valgtSykmelding, setValgtSykmelding,
    };
});
