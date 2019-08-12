import React from 'react';
import { getLedetekst, Utvidbar } from '@navikt/digisyfo-npm';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Soknad, Sykmelding } from '../../../types/types';
import { TagTyper } from '../../../types/enums';
import OppsummeringVisning from '../oppsummering/oppsummering-visning';
import populerSoknadMedSvar from '../../../utils/populer-soknad-med-svar';

interface SendknappProps {
    sender: boolean,
    henter: boolean,
}

export const Sendknapp = ({ sender, henter }: SendknappProps) => {
    return (
        <Hovedknapp
            className="js-send"
            disabled={sender || henter}
            spinner={sender}>{getLedetekst('sykepengesoknad.send')}
        </Hovedknapp>);
};

interface OppsummeringUtvidbarProps {
    soknad: Soknad,
}

export const OppsummeringUtvidbar = ({ soknad }: OppsummeringUtvidbarProps) => {
    const _soknad = {
        ...soknad,
        sporsmal: soknad.sporsmal.filter((s) => {
            return s.tag !== TagTyper.VAER_KLAR_OVER_AT;
        }),
    };
    return (
        <Utvidbar className="blokk js-soknad-oppsummering" tittel={getLedetekst('sykepengesoknad.oppsummering.tittel')} erApen={false}>
            <OppsummeringVisning soknad={_soknad}/>
        </Utvidbar>
    );
};

interface SoknadArbeidstakerOppsummeringProps {
    handleSubmit: () => void,
    soknad: Soknad,
    skjemasvar: {},
    sendSoknad: () => void,
    sykmelding: Sykmelding,
    sidenummer: number,
}

export const SoknadArbeidstakerOppsummering = ({ handleSubmit, soknad, skjemasvar, sendSoknad, sykmelding }: SoknadArbeidstakerOppsummeringProps) => {
    const populertSoknad = populerSoknadMedSvar(soknad, skjemasvar);

    const vaerKlarOverAtSpm = soknad.sporsmal.find((s) => {
        return s.tag === TagTyper.VAER_KLAR_OVER_AT;
    });
    const bekreftOpplysningerSpm = soknad.sporsmal.find((s) => {
        return s.tag === TagTyper.BEKREFT_OPPLYSNINGER;
    });

    const onSubmit = () => {
        sendSoknad(populertSoknad);
    };

    return (
        <form className="soknadskjema" id="oppsummering-skjema" onSubmit={handleSubmit(onSubmit)}>
            {skjemasvar && <OppsummeringUtvidbar soknad={populertSoknad}/>}
            <div className="blokk oppsummering__vaerKlarOverAt">
                <OppsummeringUndertekst {...vaerKlarOverAtSpm} />
            </div>
            <div className="blokk">
                <Sporsmal sporsmal={bekreftOpplysningerSpm} name={bekreftOpplysningerSpm.tag} soknad={soknad}/>
            </div>
            <SoknadMottaker soknad={soknad} skjemasvar={skjemasvar}
                mottakernavn={sykmelding ? sykmelding.mottakendeArbeidsgiver.navn : null}
            />
            {/*
            <Feilstripe vis={sendingFeilet}/>
            <Knapperad variant="blokk">
                <ConnectedSendknapp className="js-send" sender={sender} soknad={soknad}/>
            </Knapperad>
            */}
            <AvbrytSoknadContainer sykepengesoknad={soknad}/>
        </form>
    );
};

