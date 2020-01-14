import React, { useEffect } from 'react';
import { VenstreChevron } from 'nav-frontend-chevron';
import { Link, RouteComponentProps, useParams } from 'react-router-dom';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Brodsmule, IdParams, Soknad, Sykmelding } from '../../types/types';
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus';
import Banner from '../../components/banner/banner';
import { useAppStore } from '../../data/stores/app-store';
import { HotjarTrigger } from '../../components/hotjar-trigger';
import SoknadIntro from '../../components/soknaden/soknad-intro/soknad-intro';
import Opplysninger from '../../components/soknaden/opplysninger/opplysninger';
import StatusPanel from '../../components/soknaden/status/status-panel';
import VaerKlarOver from '../../components/soknaden/vaer-klar-over/vaer-klar-over';
import Oppsummering from '../../components/soknaden/oppsummering/oppsummering';
import tekster from './soknaden-tekster';
import { setBodyClass } from '../../utils/utils';
import Vis from '../../components/vis';
import SporsmalForm from '../../components/sporsmal/sporsmal-form/sporsmal-form';
import SporsmalSteg from '../../components/sporsmal/sporsmal-steg/sporsmal-steg';
import { hentNokkel } from '../../components/sporsmal/sporsmal-utils';
import { lagSendTil } from '../../utils/soknad-utils';
import './soknaden.less';

const brodsmuler: Brodsmule[] = [ {
    tittel: tekster['soknader.sidetittel'],
    sti: '/',
    erKlikkbar: true
}, {
    tittel: tekster['soknad.sidetittel'],
    sti: null,
    erKlikkbar: false,
} ];

const Soknaden = (props: RouteComponentProps<IdParams>) => {
    const { valgtSykmelding, valgtSoknad, setSendTil } = useAppStore();
    useGlobaleData(props.match.params);

    useEffect(() => {
        setBodyClass('soknaden');
        const send = lagSendTil(valgtSoknad, valgtSykmelding);
        setSendTil(send);
        // eslint-disable-next-line
    }, [valgtSoknad, valgtSykmelding]);

    if (!valgtSoknad) return null;

    return (
        <div className="limit">
            <Banner brodsmuler={brodsmuler} />
            <HotjarTrigger trigger={valgtSoknad.soknadstype}>
                <Fordeling />
            </HotjarTrigger>
        </div>
    )
};

export default Soknaden;

const Fordeling = () => {
    const { valgtSoknad } = useAppStore();
    const { stegId } = useParams();
    const stegNo = parseInt(stegId);
    const tittel = tekster[hentNokkel(valgtSoknad, stegNo)];

    switch (valgtSoknad.status) {
        // Nye søknader
        case RSSoknadstatus.NY || RSSoknadstatus.UTKAST_TIL_KORRIGERING:
            return (
                <>
                    <Vis hvis={stegNo === 1}>
                        <SoknadIntro />
                    </Vis>

                    <Vis hvis={stegNo > 1}>
                        <SporsmalSteg />
                        <Link to={'/soknader/' + valgtSoknad.id + '/' + (stegNo - 1)} className="lenke tilbakelenke">
                            <VenstreChevron />
                            <Normaltekst tag="span">{tekster['soknad.tilbakeknapp']}</Normaltekst>
                        </Link>
                    </Vis>

                    <Opplysninger ekspandert={true} />

                    <Vis hvis={tittel !== undefined}>
                        <Systemtittel className="sporsmal__tittel">{tittel}</Systemtittel>
                    </Vis>

                    <Vis hvis={stegNo === 1}>
                        <Normaltekst tag="p" className="sporsmal__intro">{tekster['sykepengesoknad.foer-du-begynner.introtekst']}</Normaltekst>
                    </Vis>

                    <SporsmalForm />
                </>
            );

        // Tidligere søknader
        case RSSoknadstatus.SENDT || RSSoknadstatus.AVBRUTT:
            return (
                <>
                    <StatusPanel />
                    <Opplysninger ekspandert={false} />
                    <Oppsummering />
                    <VaerKlarOver />
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

export const useGlobaleData = (params: any) => {
    const { soknader, valgtSoknad, setValgtSoknad, sykmeldinger, setValgtSykmelding } = useAppStore();

    if (!valgtSoknad) {
        soknader.filter(soknad => soknad.id === params.id).forEach(sok => {
            setValgtSoknad(sok);
            setValgtSykmelding(sykmeldingFraSoknad(sykmeldinger, sok));
        });
    }
};

const sykmeldingFraSoknad = (sykmeldinger: Sykmelding[], sok: Soknad) => {
    return sykmeldinger.filter(sm => sm.id === sok.sykmeldingId)[0];
};
