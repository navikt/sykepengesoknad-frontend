import createUseContext from 'constate';
import { useState } from 'react';
import { Soknad } from '../types/types';

export const useAppStore = createUseContext(() => {
    const [soknader, setSoknader] = useState<Soknad[]>([]);
    return { soknader, setSoknader };
});
