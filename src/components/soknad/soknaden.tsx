import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import OmReisetilskudd from '../../components/om-reisetilskudd/om-reisetilskudd'
import Opplysninger from '../../components/opplysninger-fra-sykmelding/opplysninger'
import SoknadMedToDeler from '../../components/soknad-med-to-deler/soknad-med-to-deler'
import SporsmalForm from '../../components/sporsmal/sporsmal-form/sporsmal-form'
import Fremdriftsbar from '../sporsmal/fremdriftsbar/fremdriftsbar'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { logEvent } from '../amplitude/amplitude'
import { EldreUsendtSoknad, harEldreUsendtSoknad } from '../eldre-usendt/eldre-usendt-soknad'
import { EldreUsendtSykmelding } from '../eldre-usendt/eldre-usendt-sykmelding'
import { eldreUsendteSykmeldinger } from '../eldre-usendt/eldreUsendteSykmeldinger'
import FristSykepenger from '../frist-sykepenger/frist-sykepenger'
import { hentHotjarJsTrigger, HotjarTrigger } from '../hotjar-trigger'
import { ViktigInformasjon } from '../soknad-intro/viktig-informasjon'
import Vis from '../vis'
import useSoknad from '../../hooks/useSoknad'
import useSoknader from '../../hooks/useSoknader'
import { soknadBreadcrumb, useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import EgenmeldingsdagerArbeidsgiver from '../egenmeldingsdager-arbeidsgiver/egenmeldingsdager-arbeidsgiver'
import useSykmeldinger from '../../hooks/useSykmeldinger'
import useSykmelding from '../../hooks/useSykmelding'
import { Feedback } from '../feedback/feedback'
import { Banner } from '../banner/banner'

import { urlTilSoknad } from './soknad-link'
import { SporsmalTittel } from './sporsmal-tittel'

export const Soknaden = () => {
    const router = useRouter()
    const { id, stegId } = router.query as { id: string; stegId: string }
    const { data: valgtSoknad } = useSoknad(id)
    const { data: soknader } = useSoknader()
    const { data: sykmeldinger } = useSykmeldinger()
    const { data: valgtSykmelding } = useSykmelding(valgtSoknad?.sykmeldingId)

    const stegNo = parseInt(stegId)
    const spmIndex = stegNo - 1

    useUpdateBreadcrumbs(() => [{ ...soknadBreadcrumb, handleInApp: true }], [])

    useEffect(() => {
        if (!valgtSoknad || stegId !== '1') return

        // finn posisjon på siste besvarte spørsmål
        router.push(urlTilSoknad(valgtSoknad), undefined, { shallow: true })
        // eslint-disable-next-line
    }, [valgtSoknad?.id])

    useEffect(() => {
        if (!valgtSoknad) return

        if (
            !stegId ||
            (valgtSoknad.status !== RSSoknadstatus.NY && valgtSoknad.status !== RSSoknadstatus.UTKAST_TIL_KORRIGERING)
        ) {
            const url = urlTilSoknad(valgtSoknad).replace('/sendt/', '/kvittering/')
            router.push(url, undefined, { shallow: true })
            return
        }

        logEvent('skjema åpnet', {
            skjemanavn: 'sykepengesoknad',
            soknadstype: valgtSoknad.soknadstype,
            soknadstatus: valgtSoknad.status,
        })
    }, [router, stegId, valgtSoknad])

    const erUtlandssoknad = valgtSoknad?.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && !valgtSykmelding
    const erReisetilskuddsoknad = valgtSoknad?.soknadstype === RSSoknadstype.REISETILSKUDD
    const erGradertReisetilskuddsoknad = valgtSoknad?.soknadstype === RSSoknadstype.GRADERT_REISETILSKUDD

    if (!erUtlandssoknad) {
        const eldreUsendtSoknad = harEldreUsendtSoknad(valgtSoknad, soknader)
        const usendteSm = eldreUsendteSykmeldinger(sykmeldinger, valgtSoknad?.tom)
        if (usendteSm.length > 0) {
            return <EldreUsendtSykmelding usendteSykmeldinger={usendteSm} />
        }
        if (eldreUsendtSoknad.eldsteSoknad) {
            return <EldreUsendtSoknad eldreSoknad={eldreUsendtSoknad.eldsteSoknad} antall={eldreUsendtSoknad.antall} />
        }
    }
    const sporsmal = valgtSoknad?.sporsmal[spmIndex]

    if (valgtSoknad && stegNo > 1) {
        logEvent('skjema spørsmål åpnet', {
            soknadstype: valgtSoknad!.soknadstype,
            skjemanavn: 'sykepengesoknad',
            spørsmål: sporsmal?.tag || '',
        })
    }
    return (
        <>
            <Banner />

            <HotjarTrigger jsTrigger={hentHotjarJsTrigger(valgtSoknad?.soknadstype, 'soknad')}>
                <>
                    <Vis hvis={stegNo > 1 || erUtlandssoknad} render={() => <Fremdriftsbar />} />

                    <Vis hvis={stegNo === 1 && !erUtlandssoknad} render={() => <ViktigInformasjon />} />

                    <Vis hvis={stegNo === 1 && erGradertReisetilskuddsoknad} render={() => <SoknadMedToDeler />} />

                    <Vis
                        hvis={stegNo === 1 && valgtSoknad?.opprettetAvInntektsmelding}
                        render={() => <EgenmeldingsdagerArbeidsgiver />}
                    />

                    <Vis hvis={stegNo === 1 && !erUtlandssoknad} render={() => <Opplysninger ekspandert={true} />} />

                    <Vis
                        hvis={stegNo === 1 && !erUtlandssoknad}
                        render={() => <FristSykepenger soknad={valgtSoknad} />}
                    />

                    <Vis
                        hvis={stegNo === 1 && (erReisetilskuddsoknad || erGradertReisetilskuddsoknad)}
                        render={() => <OmReisetilskudd />}
                    />

                    <SporsmalTittel />

                    <SporsmalForm />

                    <Feedback soknad={valgtSoknad} steg={stegNo} />
                </>
            </HotjarTrigger>
        </>
    )
}
