import createUseContext from 'constate';
import useFetch from '../rest/use-fetch';
import { Ledetekster } from '../types/types';
import { lagHentLedeteksterInfo } from '../rest/api';

export const useFetchStore = createUseContext(() => {
    const ledetekster = useFetch<Ledetekster>(lagHentLedeteksterInfo);

    return { ledetekster };
});
