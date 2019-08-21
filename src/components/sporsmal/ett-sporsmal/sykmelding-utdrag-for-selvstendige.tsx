import React from 'react';
import {
    Bjorn,
    getLedetekst,
    SykmeldingNokkelOpplysning,
    SykmeldingPerioder,
    tilLesbarDatoMedArstall,
    tilLesbarPeriodeMedArstall,
    Utvidbar,
} from '@navikt/digisyfo-npm';
import {Normaltekst} from 'nav-frontend-typografi';
import {Sykmelding, TidsPeriode} from '../../../types/types';

interface SykmeldingopplysningForsikringProps {
    sykmelding: Sykmelding,
    className: string,
}

export const SykmeldingopplysningForsikring = ({ sykmelding, className }: SykmeldingopplysningForsikringProps) => {
    const nokkel = sykmelding.sporsmal.harForsikring
        ? 'sykepengesoknad.sykmelding-utdrag.forsikring-ja-2'
        : 'sykepengesoknad.sykmelding-utdrag.forsikring-nei';
    return sykmelding.sporsmal.harForsikring !== null
        ? (
            <SykmeldingNokkelOpplysning className={className}
                tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.forsikring')}
            >
                <Normaltekst>{getLedetekst(nokkel)}</Normaltekst>
            </SykmeldingNokkelOpplysning>)
        : null;
};

export const SykmeldingopplysningFravaersperioder = ({ sykmelding, className }: SykmeldingopplysningForsikringProps) => {
    return sykmelding.sporsmal.harAnnetFravaer !== null
        ? (
            <SykmeldingNokkelOpplysning
                className={className}
                tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.egenmelding-papir')}
            >
                {
                    sykmelding.sporsmal.fravaersperioder.length > 0
                        ? (
                            <ul className="nokkelopplysning__liste">
                                {
                                    sykmelding.sporsmal.fravaersperioder.map((p: TidsPeriode) => {
                                        return <li key={tilLesbarDatoMedArstall(p.fom)}>{tilLesbarPeriodeMedArstall(p.fom, p.tom)}</li>;
                                    })
                                }
                            </ul>
                        )
                        : (<Normaltekst>{getLedetekst('sykepengesoknad.sykmelding-utdrag.egenmelding-papir-nei')}</Normaltekst>)
                }
            </SykmeldingNokkelOpplysning>
        )
        : null;
};

interface SykmeldingUtdragForSelvstendigeProps {
    erApen: boolean,
    erOppdelt: boolean,
    sykmelding: Sykmelding,
}

const SykmeldingUtdragForSelvstendige = ({ erApen, sykmelding, erOppdelt }: SykmeldingUtdragForSelvstendigeProps) => {
    return (
        <Utvidbar className="blokk js-sykmelding-utdrag"
            Overskrift="h2"
            erApen={erApen}
            visLukklenke={!erApen}
            tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.tittel')}
            variant="lilla"
            ikon="svg/plaster.svg"
            ikonHover="svg/plaster_hover.svg"
            ikonAltTekst="Plaster-ikon">
            <div>
                <SykmeldingPerioder perioder={sykmelding.mulighetForArbeid.perioder}/>
                {
                    erOppdelt
                    && <Bjorn className="blokk" nokkel="sykepengesoknad.sykmelding-utdrag.oppdelt.bjorn"/>
                }
                <SykmeldingNokkelOpplysning tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.dato-sykmeldingen-ble-skrevet')}>
                    <Normaltekst className="js-utstedelsesdato">{tilLesbarDatoMedArstall(sykmelding.bekreftelse.utstedelsesdato)}</Normaltekst>
                </SykmeldingNokkelOpplysning>
                <SykmeldingNokkelOpplysning tittel={getLedetekst('din-sykmelding.arbeidssituasjon.tittel.2')}>
                    <>
                        <Normaltekst className="js-arbeidssituasjon blokk--s">
                            {getLedetekst(`din-sykmelding.arbeidssituasjon.alternativ.${sykmelding.valgtArbeidssituasjon.toLowerCase()}`)}
                        </Normaltekst>
                    </>
                </SykmeldingNokkelOpplysning>
            </div>
        </Utvidbar>
    );
};

export default SykmeldingUtdragForSelvstendige;
