import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Brodsmule, Soknad } from '../../types/types';
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus';
import Banner from '../../components/banner/banner';
import { useAppStore } from '../../data/stores/app-store';
import { IdParams } from '../../utils/util-props';
import tekster from './soknaden-tekster';
import { HotjarTrigger } from '../../components/hotjar-trigger';
import SoknadIntro from '../../components/soknaden/soknad-intro/soknad-intro';

const brodsmuler: Brodsmule[] = [{
    tittel: tekster['soknader.sidetittel'],
    sti: '/',
    erKlikkbar: true
}, {
    tittel: tekster['soknad.sidetittel'],
    sti: null,
    erKlikkbar: false,
}];

const Soknaden = (props: RouteComponentProps<IdParams>) => {
    const { soknader } = useAppStore();
    const soknad = soknader.filter(soknad => soknad.id === props.match.params.id)[0];

    return (
        <div className="limit">
            <Banner soknad={soknad} brodsmuler={brodsmuler}/>
            <HotjarTrigger trigger={soknad.soknadstype}>
                <Fordeling soknad={soknad}/>
            </HotjarTrigger>
        </div>
    )
};

export default Soknaden;

interface FordelingProps {
    soknad: Soknad;
}

const Fordeling = ({ soknad }: FordelingProps) => {
    switch (soknad.status) {

        // Nye søknader
        case RSSoknadstatus.NY || RSSoknadstatus.UTKAST_TIL_KORRIGERING:
            return (
                <>
                    <SoknadIntro/>
                    opplysninger<br/>
                    før du begynner<br/> disclaimer<br/>
                    gå videre<br/> ønsker ikke å bruke<br/>
                </>
            );

        // Tidligere søknader
        case RSSoknadstatus.SENDT || RSSoknadstatus.AVBRUTT:
            return (
                <>
                    status<br/> opplysninger<br/>
                    oppsummeringer<br/> viktig å være klar over<br/>
                </>
            );

        // Fremtidige søknader
        case RSSoknadstatus.FREMTIDIG:
            break;

        // Utgåtte søknader
        case RSSoknadstatus.KORRIGERT || RSSoknadstatus.SLETTET:
            break;
    }
};
