import { Back } from '@navikt/ds-icons'
import { Alert, BodyLong, BodyShort, Heading } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { Brodsmule } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import { tilLesbarDatoMedArstall } from '../../utils/dato-utils'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import { useAmplitudeInstance } from '../amplitude/amplitude'
import Banner from '../banner/banner'
import Brodsmuler from '../brodsmuler/brodsmuler'
import {
    EldreUsendtSoknad,
    harEldreUsendtSoknad,
} from '../eldre-usendt-soknad/eldre-usendt-soknad'
import RedirectTilOversikt from '../feil/redirect-til-oversikt'
import { urlTilSoknad } from './soknad-link'

const brodsmuler: Brodsmule[] = [
    {
        tittel: tekst('soknader.sidetittel'),
        mobilTittel: tekst('soknader.brodsmuler.sidetittel'),
        sti: SEPARATOR,
        erKlikkbar: true,
    },
    {
        tittel: tekst('soknad.sidetittel'),
        sti: null as any,
        erKlikkbar: false,
    },
]

const Soknaden = () => {
    const {
        soknader,
        valgtSoknad,
        setValgtSoknad,
        sykmeldinger,
        setValgtSykmelding,
    } = useAppStore()
    const { logEvent } = useAmplitudeInstance()
    const { id } = useParams<RouteParams>()

    useEffect(() => {
        const filtrertSoknad = soknader.find((soknad) => soknad.id === id)
        setValgtSoknad(filtrertSoknad)

        const sykmelding = sykmeldinger.find(
            (sm) => sm.id === filtrertSoknad?.sykmeldingId
        )
        setValgtSykmelding(sykmelding)

        logEvent('skjema åpnet', {
            skjemanavn: 'sykepengesoknad',
            soknadstype: filtrertSoknad?.soknadstype,
            soknadstatus: filtrertSoknad?.status,
        })
        // eslint-disable-next-line
    }, [id])

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
                <HotjarTrigger
                    jsTrigger={hentHotjarJsTrigger(
                        valgtSoknad.soknadstype,
                        'soknad'
                    )}
                >
                    <Fordeling />
                </HotjarTrigger>
            </div>
        </>
    )
}

export default Soknaden

const Fordeling = () => {
    const { valgtSoknad, soknader, sykmeldinger } = useAppStore()
    const { stegId } = useParams<RouteParams>()
    const stegNo = parseInt(stegId)
    const history = useHistory()
    const { logEvent } = useAmplitudeInstance()

    if (!valgtSoknad) {
        return null
    }

    if (isNaN(stegNo)) {
        history.replace(urlTilSoknad(valgtSoknad))
        return null
    }

    const tittel = tekst(hentNokkel(valgtSoknad!, stegNo) as any)
    const erUtlandssoknad =
        valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
    const erReisetilskuddsoknad =
        valgtSoknad.soknadstype === RSSoknadstype.REISETILSKUDD
    const erGradertReisetilskuddsoknad =
        valgtSoknad.soknadstype === RSSoknadstype.GRADERT_REISETILSKUDD

    switch (valgtSoknad.status) {
        // Nye søknader
        case RSSoknadstatus.NY:
        case RSSoknadstatus.UTKAST_TIL_KORRIGERING: {
            const eldreUsendtSoknad = harEldreUsendtSoknad(
                valgtSoknad,
                soknader
            )
            const usendtSykmelding = harEldreUsendtSykmelding(sykmeldinger)
            if (eldreUsendtSoknad != null && !usendtSykmelding) {
                return (<EldreUsendtSoknad eldreSoknad={eldreUsendtSoknad} />)
            }
            if (usendtSykmelding) {
                return (<UsendtSykmelding />)
            }
            return (
                <>
                    <Vis
                        hvis={stegNo > 1 || erUtlandssoknad}
                        render={() => <SporsmalSteg />}
                    />

                    <Vis
                        hvis={stegNo > 1}
                        render={() => (
                            <Link
                                to={
                                    '/soknader/' +
                                    valgtSoknad.id +
                                    SEPARATOR +
                                    (stegNo - 1)
                                }
                                className="navds-link tilbakelenke"
                                onClick={() => {
                                    logEvent('navigere', {
                                        lenketekst: tekst(
                                            'soknad.tilbakeknapp'
                                        ),
                                        fra: valgtSoknad!.sporsmal[stegNo].tag,
                                        til: valgtSoknad!.sporsmal[stegNo - 1]
                                            .tag,
                                        soknadstype: valgtSoknad?.soknadstype,
                                        stegId: stegId,
                                    })
                                }}
                            >
                                <Back className="chevron--venstre" />
                                <BodyShort as="span">
                                    {tekst('soknad.tilbakeknapp')}
                                </BodyShort>
                            </Link>
                        )}
                    />

                    <Vis
                        hvis={stegNo === 1 && !erUtlandssoknad}
                        render={() => <ViktigInformasjon />}
                    />

                    <Vis
                        hvis={stegNo === 1 && erGradertReisetilskuddsoknad}
                        render={() => <SoknadMedToDeler />}
                    />

                    <Vis
                        hvis={!erUtlandssoknad && stegNo === 1}
                        render={() => {
                            const sporsmal = valgtSoknad!.sporsmal[stegNo - 1]
                            return (
                                <Opplysninger
                                    ekspandert={true}
                                    steg={sporsmal.tag}
                                />
                            )
                        }}
                    />

                    <Vis
                        hvis={stegNo === 1 && !erUtlandssoknad}
                        render={() => (
                            <HvorforSoknadSykepenger
                                soknadstype={valgtSoknad.soknadstype}
                            />
                        )}
                    />

                    <Vis
                        hvis={
                            stegNo === 1 &&
                            (erReisetilskuddsoknad ||
                                erGradertReisetilskuddsoknad)
                        }
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
        // Tidligere søknader
        case RSSoknadstatus.AVBRUTT:
            return (
                <>
                    <Alert variant="warning">
                        <BodyShort>
                            {tekst('sykepengesoknad.avbrutt.tidspunkt')}{' '}
                            {tilLesbarDatoMedArstall(valgtSoknad!.avbruttDato)}.
                        </BodyShort>
                    </Alert>

                    <div className="avbrutt-info">
                        <BodyLong spacing>
                            {tekst(
                                'sykepengesoknad.avbrutt.informasjon-innhold-1'
                            )}
                        </BodyLong>
                        <BodyLong spacing>
                            {tekst(
                                'sykepengesoknad.avbrutt.informasjon-innhold-2'
                            )}
                        </BodyLong>
                        <BodyLong spacing>
                            {tekst(
                                'sykepengesoknad.avbrutt.informasjon-innhold-3'
                            )}
                        </BodyLong>
                        <BodyLong spacing>
                            {tekst(
                                'sykepengesoknad.avbrutt.informasjon-innhold-4'
                            )}
                        </BodyLong>
                    </div>

                    <Opplysninger ekspandert={true} steg="avbrutt-søknad" />
                    <HvorforSoknadSykepenger
                        soknadstype={valgtSoknad.soknadstype}
                    />
                    <GjenapneSoknad />
                </>
            )
    }

    // Brukeren skal ikke komme hit ved andre statuser. Sender tilbake til forsiden
    return <RedirectTilOversikt />
}
