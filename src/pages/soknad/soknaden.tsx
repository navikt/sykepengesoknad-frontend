import './soknaden.less'

import AlertStripe from 'nav-frontend-alertstriper'
import { VenstreChevron } from 'nav-frontend-chevron'
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

import Banner from '../../components/banner/banner'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import { HotjarTrigger } from '../../components/hotjar-trigger'
import Opplysninger from '../../components/opplysninger-fra-sykmelding/opplysninger'
import SoknadIntro from '../../components/soknad-intro/soknad-intro'
import SporsmalForm from '../../components/sporsmal/sporsmal-form/sporsmal-form'
import SporsmalSteg from '../../components/sporsmal/sporsmal-steg/sporsmal-steg'
import { hentNokkel } from '../../components/sporsmal/sporsmal-utils'
import StatusPanel from '../../components/status/statuspanel'
import Vis from '../../components/vis'
import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { Brodsmule } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import { tekst } from '../../utils/tekster'
import { getUrlTilSoknad } from '../../utils/url-utils'
import { setBodyClass } from '../../utils/utils'
import RedirectTilOversikt from '../feil/redirect-til-oversikt'

const brodsmuler: Brodsmule[] = [ {
    tittel: tekst('soknader.sidetittel'),
    sti: SEPARATOR,
    erKlikkbar: true
}, {
    tittel: tekst('soknad.sidetittel'),
    sti: null as any,
    erKlikkbar: false,
} ]

const Soknaden = () => {
    const { soknader, valgtSoknad, setValgtSoknad, sykmeldinger, setValgtSykmelding } = useAppStore()
    const { id } = useParams()

    useEffect(() => {
        const filtrertSoknad = soknader.filter(soknad => soknad.id === id)[0]
        setValgtSoknad(filtrertSoknad)

        const sykmelding = sykmeldinger.filter(sm => sm.id === filtrertSoknad.sykmeldingId)[0]
        setValgtSykmelding(sykmelding)
        // eslint-disable-next-line
    }, [id]);

    useEffect(() => {
        setBodyClass('soknaden')
    }, [])

    if (!valgtSoknad) return null

    if (valgtSoknad.id !== id) return null

    return (
        <>
            <Banner />
            <div className='limit'>
                <Brodsmuler brodsmuler={brodsmuler} />
                <HotjarTrigger trigger={valgtSoknad.soknadstype}>
                    <Fordeling />
                </HotjarTrigger>
            </div>
        </>
    )
}

export default Soknaden

const Fordeling = () => {
    const { valgtSoknad } = useAppStore()
    const { stegId } = useParams()
    const stegNo = parseInt(stegId)
    const history = useHistory()
    if (!valgtSoknad) {
        return null
    }
    if (isNaN(stegNo)) {
        history.replace(getUrlTilSoknad(valgtSoknad, '1'))
        return null
    }

    const tittel = tekst(hentNokkel(valgtSoknad!, stegNo))
    const erUtlandssoknad = valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND

    switch (valgtSoknad.status) {
        // Nye søknader
        case RSSoknadstatus.NY:
        case RSSoknadstatus.UTKAST_TIL_KORRIGERING:
            return (
                <>
                    <Vis hvis={valgtSoknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING}>
                        <AlertStripe type='info' className='blokk-s'>
                            <span>{tekst('sykepengesoknad.utkast-til-korrigering.info')}</span>
                        </AlertStripe>
                    </Vis>

                    <Vis hvis={stegNo === 1 && !erUtlandssoknad}>
                        <SoknadIntro />
                    </Vis>

                    <Vis hvis={stegNo > 1 || erUtlandssoknad}>
                        <SporsmalSteg />
                    </Vis>

                    <Vis hvis={stegNo > 1}>
                        <Link to={'/soknader/' + valgtSoknad.id + SEPARATOR + (stegNo - 1)}
                            className='lenke tilbakelenke'>
                            <VenstreChevron />
                            <Normaltekst tag='span'>{tekst('soknad.tilbakeknapp')}</Normaltekst>
                        </Link>
                    </Vis>


                    <Vis hvis={!erUtlandssoknad}>
                        <Opplysninger ekspandert={true} />
                    </Vis>

                    <Vis hvis={tittel !== undefined}>
                        <Systemtittel className='sporsmal__tittel'>{tittel}</Systemtittel>
                    </Vis>

                    <SporsmalForm />
                </>
            )

        // Tidligere søknader
        case RSSoknadstatus.AVBRUTT:
            return (
                <>
                    <StatusPanel />
                    <Opplysninger ekspandert={false} />
                </>
            )
    }

    // Brukeren skal ikke komme hit ved andre statuser. Sender tilbake til forsiden
    return (<RedirectTilOversikt />)

}
