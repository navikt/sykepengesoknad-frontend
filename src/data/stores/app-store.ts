import createUseContext from 'constate';
import { useState } from 'react';
import { Soknad, Sykmelding } from '../../types/types';

export const useAppStore = createUseContext(() => {
    const [unleash, setUnleash] = useState<{}>([]);
    const [soknader, setSoknader] = useState<Soknad[]>([]);
    const [sykmeldinger, setSykmeldinger] = useState<Sykmelding[]>([]);
    const [valgtSoknad, setValgtSoknad] = useState<Soknad>();
    const [valgtSykmelding, setValgtSykmelding] = useState<Sykmelding>();
    const [angreBekreftSykmeldingFeilet, setAngreBekreftSykmeldingFeilet] = useState<Function>();
    const [angrerBekreftSykmelding, setAngrerBekreftSykmelding] = useState<boolean>(false);
    const [oppdaterFeilet, setOppdaterFeilet] = useState<boolean>(false);

    return {
        unleash, setUnleash,
        soknader, setSoknader,
        valgtSoknad, setValgtSoknad,
        sykmeldinger, setSykmeldinger,
        valgtSykmelding, setValgtSykmelding,
        angreBekreftSykmeldingFeilet, setAngreBekreftSykmeldingFeilet,
        angrerBekreftSykmelding, setAngrerBekreftSykmelding,
        oppdaterFeilet, setOppdaterFeilet
    };
});
