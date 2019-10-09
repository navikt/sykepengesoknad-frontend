import createUseContext from 'constate';
import { useState } from 'react';
import { Soknad, Sykmelding } from '../../types/types';

export const useAppStore = createUseContext(() => {
    const [decorator, setDecorator] = useState<string>();
    const [soknader, setSoknader] = useState<Soknad[]>([]);
    const [visFeil, setVisFeil] = useState<boolean>(true);
    const [soknad, setSoknad] = useState<Soknad>();
    const [sykmeldinger, setSykmeldinger] = useState<Sykmelding[]>([]);
    const [sykmelding, setSykmelding] = useState<Sykmelding>();
    const [vis, setVis] = useState<boolean>(false);
    const [angreBekreftSykmeldingFeilet, setAngreBekreftSykmeldingFeilet] = useState<Function>();
    const [angrerBekreftSykmelding, setAngrerBekreftSykmelding] = useState<boolean>(false);
    const [oppdaterFeilet, setOppdaterFeilet] = useState<boolean>(false);

    return {
        decorator, setDecorator,
        soknader, setSoknader,
        visFeil, setVisFeil,
        soknad, setSoknad,
        sykmeldinger, setSykmeldinger,
        sykmelding, setSykmelding,
        vis, setVis,
        angreBekreftSykmeldingFeilet, setAngreBekreftSykmeldingFeilet,
        angrerBekreftSykmelding, setAngrerBekreftSykmelding,
        oppdaterFeilet, setOppdaterFeilet
    };
});
