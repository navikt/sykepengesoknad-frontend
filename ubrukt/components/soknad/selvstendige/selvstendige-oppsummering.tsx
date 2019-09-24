import React from 'react';
import { getLedetekst, Utvidbar } from '@navikt/digisyfo-npm';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Soknad } from '../../../../src/types/types';
import { TagTyper } from '../../../../src/types/enums';
import OppsummeringVisning from '../oppsummering/oppsummering-visning';
import OppsummeringUndertekst from '../oppsummering/oppsummering-undertekst';
import populerSoknadMedSvar from '../../../../src/utils/populer-soknad-med-svar';
import Feilstripe from '../../feilstripe';
import Knapperad from '../../knapperad';
import CheckboxComp from '../../sporsmal/checkbox-comp';
import AvbrytSoknad from '../../avbryt-soknad/avbryt-soknad';

interface OppsummeringUtvidbarProps {
    soknad: Soknad,
}

const OppsummeringUtvidbar = ({ soknad }: OppsummeringUtvidbarProps) => {
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

export const hentSporsmalForOppsummering = (soknad: Soknad) => {
    return soknad.sporsmal.filter((s) => {
        return s.tag === TagTyper.BEKREFT_OPPLYSNINGER;
    });
};

interface SelvstendigeOppsummeringProps {
    soknad: Soknad,
}

const SelvstendigeOppsummering = (props: SelvstendigeOppsummeringProps) => {
    const { soknad } = props;
    const populertSoknad = populerSoknadMedSvar(soknad, {});
    const sporsmal = hentSporsmalForOppsummering(soknad)[0];
    const vaerKlarOverAtSpm = soknad.sporsmal.find((s) => {
        return s.tag === TagTyper.VAER_KLAR_OVER_AT;
    });

    return (
        <form className="soknadskjema" id="oppsummering-skjema">
            <OppsummeringUtvidbar soknad={populertSoknad}/>
            <div className="blokk redaksjonelt-innhold oppsummering__vaerKlarOverAt">
                <OppsummeringUndertekst sporsmal={vaerKlarOverAtSpm} overskriftsnivaa={3} />
            </div>
            <div className="blokk">
                <CheckboxComp {...sporsmal} name={sporsmal.tag} soknad={soknad}/>
            </div>
            <Feilstripe vis={false}/>
            <Knapperad variant="knapperad--medAvbryt">
                <Hovedknapp className="js-send">{getLedetekst('sykepengesoknad.send')}</Hovedknapp>
            </Knapperad>
            <AvbrytSoknad soknad={soknad}/>
        </form>
    );
};

export default SelvstendigeOppsummering;
