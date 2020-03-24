import React, { useEffect } from 'react';
import { VenstreChevron } from 'nav-frontend-chevron';
import { Link, useParams } from 'react-router-dom';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Brodsmule } from '../../types/types';
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus';
import Banner from '../../components/banner/banner';
import { useAppStore } from '../../data/stores/app-store';
import { HotjarTrigger } from '../../components/hotjar-trigger';
import SoknadIntro from '../../components/soknaden/soknad-intro/soknad-intro';
import Opplysninger from '../../components/soknaden/opplysninger/opplysninger';
import StatusPanel from '../../components/soknaden/status/status-panel';
import Oppsummering from '../../components/soknaden/oppsummering/oppsummering';
import tekster from './soknaden-tekster';
import { setBodyClass } from '../../utils/utils';
import Vis from '../../components/vis';
import SporsmalForm from '../../components/sporsmal/sporsmal-form/sporsmal-form';
import SporsmalSteg from '../../components/sporsmal/sporsmal-steg/sporsmal-steg';
import { hentNokkel } from '../../components/sporsmal/sporsmal-utils';
import { SEPARATOR } from '../../utils/constants';
import AlertStripe from 'nav-frontend-alertstriper';
import './soknaden.less';

const brodsmuler: Brodsmule[] = [ {
    tittel: tekster['soknader.sidetittel'],
    sti: SEPARATOR,
    erKlikkbar: true
}, {
    tittel: tekster['soknad.sidetittel'],
    sti: null,
    erKlikkbar: false,
} ];

export const useGlobaleData = (soknadId: string) => {
    const { soknader, setValgtSoknad, sykmeldinger, setValgtSykmelding } = useAppStore();
    console.log('sykmeldinger', sykmeldinger); // eslint-disable-line
    soknader.filter(soknad => soknad.id === soknadId).forEach(sok => {
        setValgtSoknad(sok);
        const sykmelding = sykmeldinger.filter(sm => sm.id === sok.sykmeldingId)[0];
        setValgtSykmelding(sykmelding);
    });
};

const Soknaden = () => {
    const { valgtSykmelding, valgtSoknad } = useAppStore();
    const { id } = useParams();
    useGlobaleData(id);

    useEffect(() => {
        if (valgtSoknad !== null && valgtSoknad !== undefined && valgtSykmelding !== null && valgtSykmelding !== undefined) {
            setBodyClass('soknaden');
        }
        // eslint-disable-next-line
    }, [ valgtSoknad, valgtSykmelding ]);

    if (!valgtSoknad) return null;

    return (
        <div className='limit'>
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
        case RSSoknadstatus.NY:
        case RSSoknadstatus.UTKAST_TIL_KORRIGERING:
            return (
                <>
                    <Vis hvis={valgtSoknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING}>
                        <AlertStripe type='info' className='blokk-s'>
                            <span>{tekster['sykepengesoknad.utkast-til-korrigering.info']}</span>
                        </AlertStripe>
                    </Vis>

                    <Vis hvis={stegNo === 1}>
                        <SoknadIntro />
                    </Vis>

                    <Vis hvis={stegNo > 1}>
                        <SporsmalSteg />
                        <Link to={'/soknader/' + valgtSoknad.id + SEPARATOR + (stegNo - 1)} className='lenke tilbakelenke'>
                            <VenstreChevron />
                            <Normaltekst tag='span'>{tekster['soknad.tilbakeknapp']}</Normaltekst>
                        </Link>
                    </Vis>

                    <Opplysninger ekspandert={true} />

                    <Vis hvis={tittel !== undefined}>
                        <Systemtittel className='sporsmal__tittel'>{tittel}</Systemtittel>
                    </Vis>

                    <Vis hvis={stegNo === 1}>
                        <Normaltekst tag='p' className='sporsmal__intro'>
                            {tekster['sykepengesoknad.foer-du-begynner.introtekst']}
                        </Normaltekst>
                    </Vis>

                    <SporsmalForm />
                </>
            );

        // Tidligere søknader
        case RSSoknadstatus.SENDT:
        case RSSoknadstatus.AVBRUTT:
            return (
                <>
                    <StatusPanel />
                    <Opplysninger ekspandert={false} />
                    <Oppsummering />
                </>
            );

        // Fremtidige søknader
        case RSSoknadstatus.FREMTIDIG:
            return null;

        // Utgåtte søknader
        case RSSoknadstatus.KORRIGERT:
        case RSSoknadstatus.SLETTET:
            return null;
    }
};
