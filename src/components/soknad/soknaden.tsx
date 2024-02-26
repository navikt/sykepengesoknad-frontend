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
import { ViktigInformasjon } from '../soknad-intro/viktig-informasjon'
import { soknadBreadcrumb, useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import EgenmeldingsdagerArbeidsgiver from '../egenmeldingsdager-arbeidsgiver/egenmeldingsdager-arbeidsgiver'
import { FlexjarSporsmal } from '../flexjar/flexjar-sporsmal'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { useToggle } from '../../toggles/context'
import { SkeletonSporsmalForm } from '../sporsmal/sporsmal-form/skeleton-sporsmal-form'
import { SlikBehandlerNavPersonopplysningene } from '../soknad-intro/slik-behandler-nav-personopplysningene'
import { FeilStateView } from '../feil/refresh-hvis-feil-state'
import { Over70Aar } from '../soknad-intro/over-70'

import { urlTilSoknad } from './soknad-link'
import { SporsmalTittel } from './sporsmal-tittel'
import { SoknadHeader } from './soknad-header'

export const Soknaden = () => {
    const router = useRouter()
    const {
        erUtenlandssoknad,
        stegId,
        stegNo,
        valgtSoknad,
        valgtSykmelding,
        soknader,
        sykmeldinger,
        spmIndex,
        valgtSoknadError,
    } = useSoknadMedDetaljer()

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
    const flexjarToggle = useToggle('flexjar-sykepengesoknad-frontend-sporsmal')

    const erReisetilskuddsoknad = valgtSoknad?.soknadstype === RSSoknadstype.REISETILSKUDD
    const erGradertReisetilskuddsoknad = valgtSoknad?.soknadstype === RSSoknadstype.GRADERT_REISETILSKUDD

    if (!erUtenlandssoknad) {
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
            soknadstype: valgtSoknad.soknadstype,
            skjemanavn: 'sykepengesoknad',
            spørsmål: sporsmal?.tag,
        })
    }
    const erForstesiden = stegNo === 1 && !erUtenlandssoknad
    const erForstesidenMedReisetilskudd = stegNo === 1 && (erReisetilskuddsoknad || erGradertReisetilskuddsoknad)
    return (
        <>
            {valgtSoknadError && <FeilStateView feilmelding={valgtSoknadError?.status}></FeilStateView>}
            <SoknadHeader />

            {!erForstesiden && <Fremdriftsbar />}
            {erForstesiden && <ViktigInformasjon />}
            {erForstesiden && valgtSykmelding?.pasient?.overSyttiAar && <Over70Aar />}
            {erForstesiden && erGradertReisetilskuddsoknad && <SoknadMedToDeler />}
            {erForstesiden && valgtSoknad?.opprettetAvInntektsmelding && <EgenmeldingsdagerArbeidsgiver />}
            {erForstesiden && <Opplysninger ekspandert={true} />}
            {erForstesiden && <FristSykepenger />}
            {erForstesidenMedReisetilskudd && <OmReisetilskudd />}
            {!erForstesiden && <SporsmalTittel />}
            {sporsmal && <SporsmalForm sporsmal={sporsmal} key={sporsmal.id} />}
            {!sporsmal && <SkeletonSporsmalForm />}
            {erForstesiden && !erUtenlandssoknad && <SlikBehandlerNavPersonopplysningene />}
            {(flexjarToggle.enabled ||
                sporsmal?.tag == 'KJENTE_INNTEKTSKILDER' ||
                sporsmal?.tag == 'INNTEKTSOPPLYSNINGER_DRIFT_VIRKSOMHETEN') && (
                <FlexjarSporsmal soknad={valgtSoknad} sporsmal={sporsmal} steg={stegNo} />
            )}
        </>
    )
}
