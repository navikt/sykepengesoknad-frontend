import * as React from 'react';
import { Brodsmule, Soknad } from '../types/types';
import { RSSoknadstatus } from '../types/rs-types/rs-soknadstatus';
import Banner from '../components/banner/banner';
import { getLedetekst } from "@navikt/digisyfo-npm";
import Feilmelding from '../components/feilmelding';
import { HotjarTrigger } from '../components/hotjar-trigger';
import SoknadArbeidstaker from '../components/soknad/arbeidstaker/soknad-arbeidstaker';
import { HotjarTriggerType } from '../types/enums';
import SoknadSelvstendig from '../components/soknad/soknad-selvstendig';
import { RouteComponentProps } from 'react-router';
import { useAppStore } from '../stores/app-store';
import { IdParams } from '../utils/util-props';
import { RSSoknadstype } from '../types/rs-types/rs-soknadstype';

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
    const { soknader, setSoknad } = useAppStore();
    const soknad = soknader.filter(soknad => soknad.id === props.match.params.id)[0];
    setSoknad(soknad);

    return (
        soknad.status === RSSoknadstatus.NY ||
        soknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING
            ?
            <div className="limit">
                <Banner soknad={soknad} brodsmuler={brodsmuler}/>
                <div className="begrensning begrensning--soknad">
                    <TriggerByType soknad={soknad} sti={props.location.pathname} />
                </div>
            </div>
            :
            null
    )
};

export default SoknadSide;

interface TriggerProps {
    soknad: Soknad;
    sti: string;
}

const TriggerByType = ({soknad, sti}: TriggerProps) => {
    console.log('soknad.soknadstype', soknad.soknadstype); //tslint:disable-line FJERNES
    switch (soknad.soknadstype) {
        case RSSoknadstype.ARBEIDSTAKERE: {
            return (
                <HotjarTrigger hotjarTrigger={HotjarTriggerType.SOKNAD_ARBEIDSTAKER}>
                    <SoknadArbeidstaker soknad={soknad} sti={sti}/>
                </HotjarTrigger>
            )
        }
        case RSSoknadstype.SELVSTENDIGE_OG_FRILANSERE: {
            return (
                <HotjarTrigger hotjarTrigger={HotjarTriggerType.SOKNAD_FRILANSER_NAERINGSDRIVENDE}>
                    <SoknadSelvstendig soknad={soknad} sti={sti}/>
                </HotjarTrigger>
            )
        }
        /*
                case RSSoknadstype.OPPHOLD_UTLAND: {
                    return (
                        <HotjarTrigger hotjarTrigger={HotjarTriggerType.SOKNAD_OPPHOLD_UTENFOR_NORGE}>
                            <SoknadUtlandSkjemaContainer {...props} />
                        </HotjarTrigger>
                    )
                }
        */
        default:
            return <Feilmelding/>;
    }
};
