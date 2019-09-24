import React from 'react';
import { SykmeldingUtdrag as SykmeldingUtdragForArbeidstakere } from '@navikt/digisyfo-npm';
import { Soknad, Sykmelding } from '../../../../src/types/types';
import { RSSoknadstype } from '../../../../src/types/rs-types/rs-soknadstype';
import { useAppStore } from '../../../../src/stores/app-store';
import SykmeldingUtdragForSelvstendige from './sykmelding-utdrag-for-selvstendige';

interface UtdragProps {
    soknad: Soknad,
    erApen: boolean,
    erOppdelt: boolean,
}

const SykmeldingUtdrag = ({ soknad, erApen, erOppdelt }: UtdragProps) => {
    const {sykmeldinger, setSykmelding} = useAppStore();
    const sykmelding = sykmeldinger.filter((melding: Sykmelding) => melding.id === soknad.sykmeldingId)[0];
    setSykmelding(sykmelding);

    return (
        soknad.soknadstype === RSSoknadstype.ARBEIDSTAKERE && sykmelding
            ? <SykmeldingUtdragForArbeidstakere
                erApen={erApen}
                sykmelding={sykmelding}
                sykepengesoknad={{ _erOppdelt: erOppdelt }}
            />
            : soknad.soknadstype === RSSoknadstype.SELVSTENDIGE_OG_FRILANSERE && sykmelding
            ? <SykmeldingUtdragForSelvstendige
                erApen={erApen}
                sykmelding={sykmelding}
                erOppdelt={erOppdelt}
            />
            : null
    )
};

export default SykmeldingUtdrag;
