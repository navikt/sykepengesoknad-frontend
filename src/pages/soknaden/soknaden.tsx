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
import Nederst from '../../components/soknaden/nederst/nederst';
import StatusPanel from '../../components/soknaden/status/status-panel';
import VaerKlarOver from '../../components/soknaden/vaer-klar-over/vaer-klar-over';
import Oppsummering from '../../components/soknaden/oppsummering/oppsummering';

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
    const { soknader, valgtSoknad, setValgtSoknad, sykmeldinger, setValgtSykmelding } = useAppStore();

    useEffect(() => {
        let petisjon: Soknad;
        soknader.filter(soknad => soknad.id === props.match.params.id).forEach(sok => {
            petisjon = sok;
            setValgtSoknad(sok);
            console.log('valgtSoknad', sok); // eslint-disable-line
        });
        sykmeldinger.filter(sm => sm.id === petisjon.sykmeldingId).forEach(melding => {
            setValgtSykmelding(melding);
            console.log('valgtSykmelding', melding); // eslint-disable-line
        });
        // eslint-disable-next-line
    }, []);

    if (!valgtSoknad) return null;

    return (
        <div className="limit">
            <Banner brodsmuler={brodsmuler}/>
            <HotjarTrigger trigger={valgtSoknad.soknadstype}>
                <Fordeling/>
            </HotjarTrigger>
        </div>
    )
};

export default Soknaden;

const Fordeling = () => {
    const { valgtSoknad } = useAppStore();

    switch (valgtSoknad.status) {

        // Nye søknader
        case RSSoknadstatus.NY || RSSoknadstatus.UTKAST_TIL_KORRIGERING:
            return (
                <>
                    <SoknadIntro/>
                    <Opplysninger/>
                    <Nederst/>
                </>
            );

        // Tidligere søknader
        case RSSoknadstatus.SENDT || RSSoknadstatus.AVBRUTT:
            return (
                <>
                    <StatusPanel/>
                    <Opplysninger/>
                    <Oppsummering/>
                    <VaerKlarOver/>
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
