import React from 'react';
import { getHtmlLedetekst } from '@navikt/digisyfo-npm';
import { Normaltekst } from 'nav-frontend-typografi';
import parser from 'html-react-parser';
import { TidsPeriode } from '../../../src/types/types';
import { antallVirkedagerIPeriode, antallVirkedagerIPerioder } from '../../../src/utils/periode-utils';
import { RSSoknadsperiode } from '../../../src/types/rs-types/rs-soknadsperiode';

interface BeregnetArbeidsgradProps {
    stillingsprosent: number,
}

const BeregnetArbeidsgrad = ({ stillingsprosent }: BeregnetArbeidsgradProps) => {
    return (
        <Normaltekst>
            {parser(getHtmlLedetekst('sykepengesoknad.angi-tid.dette-tilsvarer', {
                '%STILLINGSPROSENT%': stillingsprosent,
            }))}
        </Normaltekst>
    );
};

export default BeregnetArbeidsgrad;

export const getStillingsprosent = (
    antallTimerIArbeid: string,
    normalArbeidstid: string,
    periode: RSSoknadsperiode,
    ferieOgPermisjonPerioder: TidsPeriode[] = []) => {

    const ANTALL_VIRKEDAGER_I_EN_UKE = 5;
    const virkedager = antallVirkedagerIPeriode(periode) - antallVirkedagerIPerioder(ferieOgPermisjonPerioder, periode.fom);
    const _antallTimerIArbeid = tilInt(antallTimerIArbeid);
    const _normalArbeidstid = tilInt(normalArbeidstid);
    const desimaltall = _antallTimerIArbeid / ((_normalArbeidstid / ANTALL_VIRKEDAGER_I_EN_UKE) * virkedager);

    if (!_antallTimerIArbeid || !_normalArbeidstid || virkedager === 0) {
        return 0;
    }
    return Math.round(desimaltall * 100);
};

const tilInt = (streng: string): number => {
    return !streng ? 0 : parseFloat(streng.replace(',', '.'));
};
