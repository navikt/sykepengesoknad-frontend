import createUseContext from 'constate';
import { useState } from 'react';
import { Soknad, Sykmelding } from '../types/types';

export const useAppStore = createUseContext(() => {
    const [soknader, setSoknader] = useState<Soknad[]>([]);
    const [visFeil, setVisFeil] = useState<boolean>(true);
    const [soknad, setSoknad] = useState<Soknad>();
    const [sykmeldinger, setSykmeldinger] = useState<Sykmelding[]>([]);
    const [sykmelding, setSykmelding] = useState<Sykmelding>();
    return {
        soknader, setSoknader,
        visFeil, setVisFeil,
        soknad, setSoknad,
        sykmeldinger, setSykmeldinger,
        sykmelding, setSykmelding,
    };
});
