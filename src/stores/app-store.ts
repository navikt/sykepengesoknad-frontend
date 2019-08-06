import createUseContext from 'constate';
import { useState } from 'react';
import { Soknad } from '../types/types';

export const useAppStore = createUseContext(() => {
    const [soknader, setSoknader] = useState<Soknad[]>([]);
    const [visFeil, setVisFeil] = useState<boolean>(true);
    return {
        soknader, setSoknader,
        visFeil, setVisFeil
    };
});
