import { Back } from '@navikt/ds-icons'
import { BodyShort, Heading } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import Banner from '../../components/banner/banner'
import OmReisetilskudd from '../../components/om-reisetilskudd/om-reisetilskudd'
import Opplysninger from '../../components/opplysninger-fra-sykmelding/opplysninger'
import SoknadMedToDeler from '../../components/soknad-med-to-deler/soknad-med-to-deler'
import SporsmalForm from '../../components/sporsmal/sporsmal-form/sporsmal-form'
import SporsmalSteg from '../../components/sporsmal/sporsmal-steg/sporsmal-steg'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { SEPARATOR } from '../../utils/constants'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import { logEvent } from '../amplitude/amplitude'
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
import QueryStatusPanel from '../queryStatusPanel/QueryStatusPanel'
import { soknadBreadcrumb, useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import EgenmeldingsdagerArbeidsgiver from '../egenmeldingsdager-arbeidsgiver/egenmeldingsdager-arbeidsgiver'
import useSykmeldinger from '../../hooks/useSykmeldinger'
import useSykmelding from '../../hooks/useSykmelding'

import { urlTilSoknad } from './soknad-link'

const Soknaden = () => {
    const { id, stegId } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)
    const { data: soknader } = useSoknader()
    const { data: sykmeldinger } = useSykmeldinger()
    const { data: valgtSykmelding } = useSykmelding(valgtSoknad?.sykmeldingId)

    const history = useHistory()
    const stegNo = parseInt(stegId)

    useUpdateBreadcrumbs(() => [{ ...soknadBreadcrumb, handleInApp: true }], [])

    useEffect(() => {
        setBodyClass('soknaden')

        if (!valgtSoknad || stegId !== '1') return

        // finn posisjon på siste besvarte spørsmål
        history.replace(urlTilSoknad(valgtSoknad))
        // eslint-disable-next-line
    }, [valgtSoknad?.id])

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

        logEvent('skjema åpnet', {
            skjemanavn: 'sykepengesoknad',
            soknadstype: valgtSoknad.soknadstype,
            soknadstatus: valgtSoknad.status,
        })
        // eslint-disable-next-line
    }, [valgtSoknad])

    if (!valgtSoknad || !soknader || !sykmeldinger || !stegId) {
        return <QueryStatusPanel valgSoknadId={id} valgSykmeldingId={valgtSoknad?.sykmeldingId} />
    }

    const tittel = tekst(hentNokkel(valgtSoknad!, stegNo) as any)
    const erUtlandssoknad = valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && !valgtSykmelding
    const erReisetilskuddsoknad = valgtSoknad.soknadstype === RSSoknadstype.REISETILSKUDD
    const erGradertReisetilskuddsoknad = valgtSoknad.soknadstype === RSSoknadstype.GRADERT_REISETILSKUDD

    if (!erUtlandssoknad) {
        const eldreUsendtSoknad = harEldreUsendtSoknad(valgtSoknad, soknader)
        const usendteSm = eldreUsendteSykmeldinger(sykmeldinger, valgtSoknad.tom!)
        if (usendteSm.length > 0) {
            return <EldreUsendtSykmelding usendteSykmeldinger={usendteSm} />
        }
        if (eldreUsendtSoknad.eldsteSoknad) {
            return <EldreUsendtSoknad eldreSoknad={eldreUsendtSoknad.eldsteSoknad} antall={eldreUsendtSoknad.antall} />
        }
    }

    return (
        <>
            <Banner />

            <HotjarTrigger jsTrigger={hentHotjarJsTrigger(valgtSoknad.soknadstype, 'soknad')}>
                <>
                    <Vis hvis={stegNo > 1 || erUtlandssoknad} render={() => <SporsmalSteg />} />

                    <Vis
                        hvis={stegNo > 1}
                        render={() => (
                            <Link
                                to={`/soknader/${valgtSoknad.id}${SEPARATOR}${stegNo - 1}${window.location.search}`}
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
                        hvis={stegNo === 1 && valgtSoknad.opprettetAvInntektsmelding}
                        render={() => <EgenmeldingsdagerArbeidsgiver />}
                    />

                    <Vis
                        hvis={stegNo === 1 && !erUtlandssoknad}
                        render={() => <Opplysninger ekspandert={true} steg={valgtSoknad.sporsmal[stegNo - 1].tag} />}
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
                        hvis={tittel && stegNo !== 1 && !erUtlandssoknad}
                        render={() => (
                            <Heading size="medium" className="sporsmal__tittel">
                                {tittel}
                            </Heading>
                        )}
                    />

                    <SporsmalForm />
                </>
            </HotjarTrigger>
        </>
    )
}

export default Soknaden
