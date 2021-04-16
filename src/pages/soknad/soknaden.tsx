import './soknaden.less'

import AlertStripe from 'nav-frontend-alertstriper'
import { VenstreChevron } from 'nav-frontend-chevron'
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import Banner from '../../components/banner/banner'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import { HotjarTrigger } from '../../components/hotjar-trigger'
import OmReisetilskudd from '../../components/om-reisetilskudd/om-reisetilskudd'
import Opplysninger from '../../components/opplysninger-fra-sykmelding/opplysninger'
import SoknadIntro from '../../components/soknad-intro/soknad-intro'
import SporsmalForm from '../../components/sporsmal/sporsmal-form/sporsmal-form'
import SporsmalSteg from '../../components/sporsmal/sporsmal-steg/sporsmal-steg'
import { hentNokkel } from '../../components/sporsmal/sporsmal-utils'
import StatusPanel from '../../components/status/statuspanel'
import VisBlock from '../../components/vis-block'
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
    mobilTittel: tekst('soknader.brodsmuler.sidetittel'),
    sti: SEPARATOR,
    erKlikkbar: true
}, {
    tittel: tekst('soknad.sidetittel'),
    sti: null as any,
    erKlikkbar: false,
} ]

const Soknaden = () => {
    const { soknader, valgtSoknad, setValgtSoknad, sykmeldinger, setValgtSykmelding } = useAppStore()
    const { id } = useParams<RouteParams>()

    useEffect(() => {
        const filtrertSoknad = soknader.find(soknad => soknad.id === id)
        setValgtSoknad(filtrertSoknad)

        const sykmelding = sykmeldinger.find(sm => sm.id === filtrertSoknad?.sykmeldingId)
        setValgtSykmelding(sykmelding)
        // eslint-disable-next-line
    }, [ id ]);

    useEffect(() => {
        setBodyClass('soknaden')
    }, [])

    if (!valgtSoknad) return null

    if (valgtSoknad.id !== id) return null

    return (
        <>
            <Banner />
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <HotjarTrigger soknadstype={valgtSoknad.soknadstype}>
                    <Fordeling />
                </HotjarTrigger>
            </div>
        </>
    )
}

export default Soknaden

const Fordeling = () => {
    const { valgtSoknad } = useAppStore()
    const { stegId } = useParams<RouteParams>()
    const stegNo = parseInt(stegId)
    const history = useHistory()
    if (!valgtSoknad) {
        return null
    }
    if (isNaN(stegNo)) {
        history.replace(getUrlTilSoknad(valgtSoknad))
        return null
    }

    const tittel = tekst(hentNokkel(valgtSoknad!, stegNo) as any)
    const erUtlandssoknad = valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
    const erReisetilskuddsoknad = valgtSoknad.soknadstype === RSSoknadstype.REISETILSKUDD

    switch (valgtSoknad.status) {
        // Nye søknader
        case RSSoknadstatus.NY:
        case RSSoknadstatus.UTKAST_TIL_KORRIGERING:
            return (
                <>
                    <VisBlock hvis={valgtSoknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING}
                        render={() => {
                            return (
                                <AlertStripe type="info" className="blokk-s">
                                    <span>{tekst('sykepengesoknad.utkast-til-korrigering.info')}</span>
                                </AlertStripe>
                            )
                        }}
                    />

                    <VisBlock hvis={stegNo === 1 && !erUtlandssoknad}
                        render={() => <SoknadIntro />}
                    />

                    <VisBlock hvis={stegNo > 1 || erUtlandssoknad}
                        render={() => <SporsmalSteg />}
                    />

                    <VisBlock hvis={stegNo > 1}
                        render={() => {
                            return (
                                <Link to={'/soknader/' + valgtSoknad.id + SEPARATOR + (stegNo - 1)}
                                    className="lenke tilbakelenke">
                                    <VenstreChevron />
                                    <Normaltekst tag="span">{tekst('soknad.tilbakeknapp')}</Normaltekst>
                                </Link>
                            )
                        }}
                    />

                    <VisBlock hvis={!erUtlandssoknad}
                        render={() => <Opplysninger ekspandert={true} />}
                    />

                    <VisBlock hvis={stegNo === 1 && erReisetilskuddsoknad}
                        render={() => <OmReisetilskudd />}
                    />

                    <VisBlock hvis={tittel !== undefined}
                        render={() => <Systemtittel className="sporsmal__tittel">{tittel}</Systemtittel>}
                    />

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
