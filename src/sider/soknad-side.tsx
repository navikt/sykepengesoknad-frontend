import * as React from 'react';
import { Brodsmule, Soknad } from '../types/types';
import { RSSoknadstatus } from '../types/rs-types/rs-soknadstatus';
import Banner from '../components/banner/banner';
import { getLedetekst } from "@navikt/digisyfo-npm";
import Feilmelding from '../components/feilmelding';
import { HotjarTrigger } from '../components/hotjar-trigger';
import { HotjarTriggerType } from '../types/enums';
import { RouteComponentProps } from 'react-router';
import { useAppStore } from '../stores/app-store';
import { IdParams } from '../utils/util-props';
import { RSSoknadstype } from '../types/rs-types/rs-soknadstype';
import Vis from '../utils/vis';
import { Innholdstittel } from 'nav-frontend-typografi';

const brodsmuler: Brodsmule[] = [{
    tittel: getLedetekst('landingsside.sidetittel'),
    sti: '/sykefravaer',
    erKlikkbar: true,
}, {
    tittel: getLedetekst('soknader.sidetittel'),
    sti: '/soknader',
    erKlikkbar: false
}];

const SoknadSide = (props: RouteComponentProps<IdParams>) => {
    const { soknader } = useAppStore();
    const soknad = soknader.filter(soknad => soknad.id === props.match.params.id)[0];

    return (
        <Vis hvis={soknad.status === RSSoknadstatus.NY || soknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING}>
            <div className="limit">
                <Banner soknad={soknad} brodsmuler={brodsmuler}/>
                <div className="begrensning begrensning--soknad">
                    <TriggerByType soknad={soknad} sti={props.location.pathname}/>
                </div>
            </div>
        </Vis>
    )
};

export default SoknadSide;

interface TriggerProps {
    soknad: Soknad;
    sti: string;
}

const TriggerByType = ({ soknad, sti }: TriggerProps) => {
    console.log('soknad.soknadstype', soknad.soknadstype); //tslint:disable-line FJERNES
    switch (soknad.soknadstype) {
        case RSSoknadstype.ARBEIDSTAKERE: {
            return (
                <HotjarTrigger hotjarTrigger={HotjarTriggerType.SOKNAD_ARBEIDSTAKER}>
                    <Innholdstittel>SoknadArbeidstaker</Innholdstittel>
                </HotjarTrigger>
            )
        }
        case RSSoknadstype.SELVSTENDIGE_OG_FRILANSERE: {
            return (
                <HotjarTrigger hotjarTrigger={HotjarTriggerType.SOKNAD_FRILANSER_NAERINGSDRIVENDE}>
                    <Innholdstittel>SoknadSelvstendig</Innholdstittel>
                </HotjarTrigger>
            )
        }
        case RSSoknadstype.OPPHOLD_UTLAND: {
            return (
                <HotjarTrigger hotjarTrigger={HotjarTriggerType.SOKNAD_OPPHOLD_UTENFOR_NORGE}>
                    <Innholdstittel>SoknadUtlandSkjemaContainer</Innholdstittel>
                </HotjarTrigger>
            )
        }
        case RSSoknadstype.ARBEIDSLEDIG: {
            return (
                <HotjarTrigger hotjarTrigger={HotjarTriggerType.SOKNAD_ARBEIDSLEDIG}>
                    <Innholdstittel>SoknadArbeidsledig</Innholdstittel>
                </HotjarTrigger>
            )
        }
        default:
            return <Feilmelding/>;
    }
};
