import './soknaden.less'

import { Back } from '@navikt/ds-icons'
import { Alert, BodyShort, Heading } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import { useAmplitudeInstance } from '../../components/amplitude/amplitude'
import Banner from '../../components/banner/banner'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import { EldreUsendtSoknad, harEldreUsendtSoknad } from '../../components/eldre-usendt-soknad/eldre-usendt-soknad'
import { hentHotjarJsTrigger, HotjarTrigger } from '../../components/hotjar-trigger'
import HvorforSoknadSykepenger from '../../components/hvorfor-soknad-sykepenger/hvorfor-soknad-sykepenger'
import OmReisetilskudd from '../../components/om-reisetilskudd/om-reisetilskudd'
import Opplysninger from '../../components/opplysninger-fra-sykmelding/opplysninger'
import { ViktigInformasjon } from '../../components/soknad-intro/viktig-informasjon'
import SoknadMedToDeler from '../../components/soknad-med-to-deler/soknad-med-to-deler'
import SporsmalForm from '../../components/sporsmal/sporsmal-form/sporsmal-form'
import SporsmalSteg from '../../components/sporsmal/sporsmal-steg/sporsmal-steg'
import { hentNokkel } from '../../components/sporsmal/sporsmal-utils'
import Vis from '../../components/vis'
import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { Brodsmule } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import { urlTilSoknad } from './soknad-link'

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
    const { logEvent } = useAmplitudeInstance()
    const { id } = useParams<RouteParams>()

    useEffect(() => {
        const filtrertSoknad = soknader.find(soknad => soknad.id === id)
        setValgtSoknad(filtrertSoknad)

        const sykmelding = sykmeldinger.find(sm => sm.id === filtrertSoknad?.sykmeldingId)
        setValgtSykmelding(sykmelding)

        logEvent('skjema åpnet', {
            skjemanavn: 'sykepengesoknad',
            soknadstype: filtrertSoknad?.soknadstype,
            soknadstatus: filtrertSoknad?.status,
        })
        // eslint-disable-next-line
    }, [ id ])

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
                <HotjarTrigger jsTrigger={hentHotjarJsTrigger(valgtSoknad.soknadstype, 'soknad')}>
                    <Fordeling />
                </HotjarTrigger>
            </div>
        </>
    )
}

export default Soknaden

const Fordeling = () => {
    const { valgtSoknad, soknader } = useAppStore()
    const { stegId } = useParams<RouteParams>()
    const stegNo = parseInt(stegId)
    const history = useHistory()
    const { logEvent } = useAmplitudeInstance()

    if (!valgtSoknad) {
        return null
    }

    if (isNaN(stegNo) || (valgtSoknad.status !== RSSoknadstatus.NY && valgtSoknad.status !== RSSoknadstatus.UTKAST_TIL_KORRIGERING)) {
        history.replace(urlTilSoknad(valgtSoknad))
        return null
    }

    const tittel = tekst(hentNokkel(valgtSoknad!, stegNo) as any)
    const erUtlandssoknad = valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
    const erReisetilskuddsoknad = valgtSoknad.soknadstype === RSSoknadstype.REISETILSKUDD
    const erGradertReisetilskuddsoknad = valgtSoknad.soknadstype === RSSoknadstype.GRADERT_REISETILSKUDD

    const eldreUsendtSoknad = harEldreUsendtSoknad(valgtSoknad, soknader)
    if (eldreUsendtSoknad != null) {
        return (<EldreUsendtSoknad eldreSoknad={eldreUsendtSoknad} />)
    }
    return (
        <>
            <Vis hvis={valgtSoknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING}
                render={() =>
                    <Alert variant="info" className="blokk-s">
                        <span>{tekst('sykepengesoknad.utkast-til-korrigering.info')}</span>
                    </Alert>
                }
            />

            <Vis hvis={stegNo > 1 || erUtlandssoknad}
                render={() => <SporsmalSteg />}
            />

            <Vis hvis={stegNo > 1}
                render={() =>
                    <Link to={'/soknader/' + valgtSoknad.id + SEPARATOR + (stegNo - 1)}
                        className="navds-link tilbakelenke"
                        onClick={() => { logEvent('navigere', {
                            lenketekst: tekst('soknad.tilbakeknapp'),
                            fra: valgtSoknad!.sporsmal[stegNo].tag,
                            til: valgtSoknad!.sporsmal[stegNo - 1].tag,
                            'soknadstype': valgtSoknad?.soknadstype,
                            'stegId': stegId
                        })}}
                    >
                        <Back className="chevron--venstre" />
                        <BodyShort as="span">{tekst('soknad.tilbakeknapp')}</BodyShort>
                    </Link>
                }
            />

            <Vis hvis={stegNo === 1 && !erUtlandssoknad}
                render={() =>
                    <ViktigInformasjon />
                }
            />

            <Vis hvis={stegNo === 1 && erGradertReisetilskuddsoknad}
                render={() =>
                    <SoknadMedToDeler />
                }
            />

            <Vis hvis={!erUtlandssoknad && (stegNo === 1)}
                render={
                    () => {
                        const sporsmal = valgtSoknad!.sporsmal[ stegNo - 1 ]
                        return <Opplysninger ekspandert={true} steg={sporsmal.tag} />
                    }}
            />

            <Vis hvis={stegNo === 1 && !erUtlandssoknad}
                render={() =>
                    <HvorforSoknadSykepenger soknadstype={valgtSoknad.soknadstype} />
                }
            />

            <Vis hvis={stegNo === 1 && (erReisetilskuddsoknad || erGradertReisetilskuddsoknad)}
                render={() => <OmReisetilskudd />}
            />

            <Vis hvis={tittel}
                render={() => <Heading size="medium" className="sporsmal__tittel">{tittel}</Heading>}
            />

            <SporsmalForm />
        </>
    )
}
