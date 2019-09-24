import React from 'react';
import { getLedetekst, Utvidbar } from '@navikt/digisyfo-npm';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Soknad } from '../../../../src/types/types';
import { TagTyper } from '../../../../src/types/enums';
import OppsummeringUndertekst from '../oppsummering/oppsummering-undertekst';
import Knapperad from '../../knapperad';
import OppsummeringVisning from '../oppsummering/oppsummering-visning';
import populerSoknadMedSvar from '../../../../src/utils/populer-soknad-med-svar';
import SoknadMottaker from './soknad-mottaker';
import SporsmalComponent from '../../sporsmal/sporsmal-component';
import AvbrytSoknad from '../../avbryt-soknad/avbryt-soknad';

interface SendknappProps {
    henter: boolean,
    sender: boolean,
    className?: string;
}

const Sendknapp = ({ sender, henter, className }: SendknappProps) => {
    return (
        <Hovedknapp
            className="js-send"
            disabled={sender || henter}
            spinner={sender}>{getLedetekst('sykepengesoknad.send')}
            className={className}
        </Hovedknapp>
    );
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

interface ArbeidstakerOppsummeringProps {
    soknad: Soknad,
    sidenummer: number,
}

export const ArbeidstakerOppsummering = (props: ArbeidstakerOppsummeringProps) => {
    const {
        soknad,
    } = props;

    const populertSoknad = populerSoknadMedSvar(soknad, {});

    const vaerKlarOverAtSpm = soknad.sporsmal.find((s) => {
        return s.tag === TagTyper.VAER_KLAR_OVER_AT;
    });
    const bekreftOpplysningerSpm = soknad.sporsmal.find((s) => {
        return s.tag === TagTyper.BEKREFT_OPPLYSNINGER;
    });

    return (
        <form className="soknadskjema" id="oppsummering-skjema" >
            <OppsummeringUtvidbar soknad={populertSoknad}/>
            <div className="blokk oppsummering__vaerKlarOverAt">
                <OppsummeringUndertekst sporsmal={vaerKlarOverAtSpm}/>
            </div>
            <div className="blokk">
                <SporsmalComponent
                    sporsmal={bekreftOpplysningerSpm}
                    name={bekreftOpplysningerSpm!.tag}
                    soknad={soknad}
                />
            </div>
            <SoknadMottaker
                soknad={soknad}
                skjemasvar={{}}
                mottakernavn={''}
            />
            <Knapperad variant="blokk">
                <Sendknapp className="js-send" henter={true} sender={false}/>
            </Knapperad>
            <AvbrytSoknad soknad={soknad} />
        </form>
    );
};
