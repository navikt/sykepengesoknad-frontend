import { Back } from '@navikt/ds-icons'
import { BodyShort, Heading } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import Banner from '../../components/banner/banner'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import OmReisetilskudd from '../../components/om-reisetilskudd/om-reisetilskudd'
import Opplysninger from '../../components/opplysninger-fra-sykmelding/opplysninger'
import SoknadMedToDeler from '../../components/soknad-med-to-deler/soknad-med-to-deler'
import SporsmalForm from '../../components/sporsmal/sporsmal-form/sporsmal-form'
import SporsmalSteg from '../../components/sporsmal/sporsmal-steg/sporsmal-steg'
import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { Brodsmule } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import { useAmplitudeInstance } from '../amplitude/amplitude'
import { EldreUsendtSoknad, harEldreUsendtSoknad } from '../eldre-usendt/eldre-usendt-soknad'
import { EldreUsendtSykmelding } from '../eldre-usendt/eldre-usendt-sykmelding'
import { eldreUsendteSykmeldinger } from '../eldre-usendt/eldreUsendteSykmeldinger'
import FristSykepenger from '../frist-sykepenger/frist-sykepenger'
import { hentHotjarJsTrigger, HotjarTrigger } from '../hotjar-trigger'
import { ViktigInformasjon } from '../soknad-intro/viktig-informasjon'
import { hentNokkel } from '../sporsmal/sporsmal-utils'
import Vis from '../vis'
import useSoknad from '../../hooks/useSoknad'
import useSoknader from '../../hooks/useSoknader'

import { urlTilSoknad } from './soknad-link'

const brodsmuler: Brodsmule[] = [
    {
        tittel: tekst('soknader.sidetittel'),
        mobilTittel: tekst('soknader.brodsmuler.sidetittel'),
        sti: SEPARATOR + window.location.search,
        erKlikkbar: true,
    },
    {
        tittel: tekst('soknad.sidetittel'),
        sti: null as any,
        erKlikkbar: false,
    },
]

const Soknaden = () => {
    const { id, stegId } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)

    const { sykmeldinger, setValgtSykmelding } = useAppStore()
    const { logEvent } = useAmplitudeInstance()
    const history = useHistory()

    useEffect(() => {
        if (!valgtSoknad) return

        if (
            !stegId ||
            (valgtSoknad.status !== RSSoknadstatus.NY && valgtSoknad.status !== RSSoknadstatus.UTKAST_TIL_KORRIGERING)
        ) {
            const url = urlTilSoknad(valgtSoknad).replace('/sendt/', '/kvittering/')
            history.push(url)
            return
        }

        const sykmelding = sykmeldinger.find((sm) => sm.id === valgtSoknad.sykmeldingId)
        setValgtSykmelding(sykmelding)

        logEvent('skjema åpnet', {
            skjemanavn: 'sykepengesoknad',
            soknadstype: valgtSoknad.soknadstype,
            soknadstatus: valgtSoknad.status,
        })
        // eslint-disable-next-line
    }, [valgtSoknad])

    useEffect(() => {
        setBodyClass('soknaden')

        if (!valgtSoknad || stegId !== '1') return

        // finn posisjon på siste besvarte spørsmål
        history.push(urlTilSoknad(valgtSoknad))
        // eslint-disable-next-line
    }, [valgtSoknad?.id])

    if (!valgtSoknad) return null

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
    const { id, stegId } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)
    const { data: soknader } = useSoknader()

    const { sykmeldinger } = useAppStore()
    const { logEvent } = useAmplitudeInstance()
    const stegNo = parseInt(stegId)

    if (!valgtSoknad || !soknader) {
        return null
    }

    const tittel = tekst(hentNokkel(valgtSoknad!, stegNo) as any)
    const erUtlandssoknad = valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
    const erReisetilskuddsoknad = valgtSoknad.soknadstype === RSSoknadstype.REISETILSKUDD
    const erGradertReisetilskuddsoknad = valgtSoknad.soknadstype === RSSoknadstype.GRADERT_REISETILSKUDD

    switch (valgtSoknad.status) {
        // Nye søknader
        case RSSoknadstatus.NY:
        case RSSoknadstatus.UTKAST_TIL_KORRIGERING: {
            if (!erUtlandssoknad) {
                const eldreUsendtSoknad = harEldreUsendtSoknad(valgtSoknad, soknader)
                const usendteSm = eldreUsendteSykmeldinger(sykmeldinger, valgtSoknad.tom!)
                if (usendteSm.length > 0) {
                    return <EldreUsendtSykmelding usendteSykmeldinger={usendteSm} />
                }
                if (eldreUsendtSoknad.eldsteSoknad) {
                    return (
                        <EldreUsendtSoknad
                            eldreSoknad={eldreUsendtSoknad.eldsteSoknad}
                            antall={eldreUsendtSoknad.antall}
                        />
                    )
                }
            }
            return (
                <>
                    <Vis hvis={stegNo > 1 || erUtlandssoknad} render={() => <SporsmalSteg />} />

                    <Vis
                        hvis={stegNo > 1}
                        render={() => (
                            <Link
                                to={'/soknader/' + valgtSoknad.id + SEPARATOR + (stegNo - 1)}
                                className="navds-link tilbakelenke"
                                onClick={() => {
                                    logEvent('navigere', {
                                        lenketekst: tekst('soknad.tilbakeknapp'),
                                        fra: valgtSoknad!.sporsmal[stegNo - 1].tag,
                                        til: valgtSoknad!.sporsmal[stegNo - 2].tag,
                                        soknadstype: valgtSoknad?.soknadstype,
                                        stegId: stegId,
                                    })
                                }}
                            >
                                <Back className="chevron--venstre" />
                                <BodyShort as="span">{tekst('soknad.tilbakeknapp')}</BodyShort>
                            </Link>
                        )}
                    />

                    <Vis hvis={stegNo === 1 && !erUtlandssoknad} render={() => <ViktigInformasjon />} />

                    <Vis hvis={stegNo === 1 && erGradertReisetilskuddsoknad} render={() => <SoknadMedToDeler />} />

                    <Vis
                        hvis={!erUtlandssoknad && stegNo === 1}
                        render={() => {
                            const sporsmal = valgtSoknad!.sporsmal[stegNo - 1]
                            return <Opplysninger ekspandert={true} steg={sporsmal.tag} />
                        }}
                    />

                    <Vis
                        hvis={stegNo === 1 && !erUtlandssoknad}
                        render={() => <FristSykepenger soknadstype={valgtSoknad.soknadstype} />}
                    />

                    <Vis
                        hvis={stegNo === 1 && (erReisetilskuddsoknad || erGradertReisetilskuddsoknad)}
                        render={() => <OmReisetilskudd />}
                    />

                    <Vis
                        hvis={tittel}
                        render={() => (
                            <Heading size="medium" className="sporsmal__tittel">
                                {tittel}
                            </Heading>
                        )}
                    />

                    <SporsmalForm />
                </>
            )
        }
        default:
            return null
    }
}
