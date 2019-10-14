import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Brodsmule, Soknad } from '../../types/types';
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus';
import Banner from '../../components/banner/banner';
import { useAppStore } from '../../data/stores/app-store';
import { IdParams } from '../../utils/util-props';
import tekster from './soknaden-tekster';
import { HotjarTrigger } from '../../components/hotjar-trigger';
import SoknadIntro from '../../components/soknaden/soknad-intro/soknad-intro';
import Opplysninger from '../../components/soknaden/opplysninger/opplysninger';

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
    const { soknader, soknad, setSoknad, sykmeldinger, setSykmelding } = useAppStore();

    useEffect(() => {
        let petisjon: Soknad;
        soknader.filter(soknad => soknad.id === props.match.params.id).map(soknad => {
            petisjon = soknad;
            setSoknad(soknad);
        });
        sykmeldinger.filter(sm => sm.id === petisjon.sykmeldingId).map(melding => {
            setSykmelding(melding);
        });
        console.log('soknad', soknad); // eslint-disable-line
        // eslint-disable-next-line
    }, [soknader, sykmeldinger]);

    if (!soknad) return null;

    return (
        <div className="limit">
            <Banner brodsmuler={brodsmuler}/>
            <HotjarTrigger trigger={soknad.soknadstype}>
                <Fordeling/>
            </HotjarTrigger>
        </div>
    )
};

export default Soknaden;

const Fordeling = () => {
    const { soknad } = useAppStore();

    switch (soknad.status) {

        // Nye søknader
        case RSSoknadstatus.NY || RSSoknadstatus.UTKAST_TIL_KORRIGERING:
            return (
                <>
                    <SoknadIntro/>
                    <Opplysninger/>

                    før du begynner<br/> disclaimer<br/>
                    gå videre<br/> ønsker ikke å bruke<br/>
                </>
            );

        // Tidligere søknader
        case RSSoknadstatus.SENDT || RSSoknadstatus.AVBRUTT:
            return (
                <>
                    status<br/>
                    <Opplysninger/>
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
