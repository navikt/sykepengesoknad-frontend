import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Alert, BodyLong, Button } from '@navikt/ds-react'

import OmReisetilskudd from '../../components/om-reisetilskudd/om-reisetilskudd'
import SporsmalForm from '../../components/sporsmal/sporsmal-form/sporsmal-form'
import Fremdriftsbar from '../sporsmal/fremdriftsbar/fremdriftsbar'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { logEvent } from '../amplitude/amplitude'
import { EldreUsendtSoknad, harEldreUsendtSoknad } from '../eldre-usendt/eldre-usendt-soknad'
import { EldreUsendtSykmelding } from '../eldre-usendt/eldre-usendt-sykmelding'
import { eldreUsendteSykmeldinger } from '../eldre-usendt/eldreUsendteSykmeldinger'
import { soknadBreadcrumb, useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import { FlexjarSporsmal } from '../flexjar/flexjar-sporsmal'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { useToggle } from '../../toggles/context'
import { SkeletonSporsmalForm } from '../sporsmal/sporsmal-form/skeleton-sporsmal-form'
import { FeilStateView } from '../feil/refresh-hvis-feil-state'
import { Over70Aar } from '../soknad-intro/over-70'
import { IntroGuide } from '../soknad-intro/intro-guide'
import { ForDuSoker } from '../soknad-intro/for-du-soker'
import { IntroAccordion } from '../soknad-intro/intro-accordion'
import { LenkeMedIkon } from '../lenke-med-ikon/LenkeMedIkon'
import { erOppdelt } from '../../utils/periode-utils'
import { InfoOmTilbakedatering } from '../soknad-intro/info-om-tilbakedatering'
import { erSisteSide } from '../sporsmal/sporsmal-utils'

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

    const [hasLoggedSkjemaApnet, setHasLoggedSkjemaApnet] = useState([] as string[])
    const [hasLoggedSkjemaSporsmalApnet, setHasLoggedSkjemaSporsmalApnet] = useState([] as string[])

    useEffect(() => {
        if (!valgtSoknad || stegId !== '1') return

        // finn posisjon på siste besvarte spørsmål
        router.push(urlTilSoknad(valgtSoknad, true, true), undefined, { shallow: true })
        // eslint-disable-next-line
    }, [valgtSoknad?.id])

    useEffect(() => {
        if (!valgtSoknad) return

        if (
            !stegId ||
            (valgtSoknad.status !== RSSoknadstatus.NY && valgtSoknad.status !== RSSoknadstatus.UTKAST_TIL_KORRIGERING)
        ) {
            const url = urlTilSoknad(valgtSoknad, true, true).replace('/sendt/', '/kvittering/')
            router.push(url, undefined, { shallow: true })
            return
        }

        if (!hasLoggedSkjemaApnet.includes(`${valgtSoknad.id}-${valgtSoknad.status}`)) {
            setHasLoggedSkjemaApnet([...hasLoggedSkjemaApnet, `${valgtSoknad.id}-${valgtSoknad.status}`])
            logEvent('skjema åpnet', {
                skjemanavn: 'sykepengesoknad',
                soknadstype: valgtSoknad.soknadstype,
                soknadstatus: valgtSoknad.status,
            })
        }

        const sporsmal = valgtSoknad.sporsmal[spmIndex]

        if (stegNo > 0 && sporsmal) {
            if (!hasLoggedSkjemaSporsmalApnet.includes(`${valgtSoknad.id}-${sporsmal.id}`)) {
                setHasLoggedSkjemaSporsmalApnet([...hasLoggedSkjemaSporsmalApnet, `${valgtSoknad.id}-${sporsmal.id}`])

                logEvent('skjema spørsmål åpnet', {
                    soknadstype: valgtSoknad.soknadstype,
                    skjemanavn: 'sykepengesoknad',
                    spørsmål: sporsmal.tag,
                })
            }
        }
    }, [router, stegId, valgtSoknad, hasLoggedSkjemaApnet, spmIndex, stegNo, hasLoggedSkjemaSporsmalApnet])
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

    const erForstesiden = stegNo === 1 && !erUtenlandssoknad
    const erSistesiden = valgtSoknad && sporsmal ? erSisteSide(valgtSoknad, stegNo) : false
    const erForstesidenMedReisetilskudd = stegNo === 1 && (erReisetilskuddsoknad || erGradertReisetilskuddsoknad)
    const oppdeltSoknadTekst =
        valgtSoknad && valgtSykmelding && erOppdelt(valgtSoknad, valgtSykmelding)
            ? 'Siden sykemeldingen går over 31 dager, har vi delt opp søknaden, slik at du kan søke om sykepenger før hele perioden er ferdig. På den måten slipper du å vente lenge på sykepengene dine.'
            : ''
    return (
        <>
            {valgtSoknadError && <FeilStateView feilmelding={valgtSoknadError?.status}></FeilStateView>}
            <SoknadHeader />

            {!erForstesiden && <Fremdriftsbar />}
            {erForstesiden && (
                <>
                    <IntroGuide />
                    <ForDuSoker />
                    <IntroAccordion />
                    {oppdeltSoknadTekst !== '' && (
                        <Alert variant="info" className="mb-8">
                            {oppdeltSoknadTekst}
                        </Alert>
                    )}
                    <InfoOmTilbakedatering />
                    {valgtSykmelding?.pasient?.overSyttiAar && <Over70Aar />}
                    <BodyLong spacing>
                        Det er viktig at du gir oss riktige opplysninger slik at vi kan behandle saken din.
                        <LenkeMedIkon
                            href="https://www.nav.no/endringer"
                            text="Les mer om viktigheten av å gi riktige opplysninger."
                        />
                    </BodyLong>
                </>
            )}
            {erForstesidenMedReisetilskudd && <OmReisetilskudd />}
            {!erForstesiden && !erSistesiden && <SporsmalTittel />}
            {sporsmal && <SporsmalForm sporsmal={sporsmal} key={sporsmal.id} />}
            {!sporsmal && <SkeletonSporsmalForm />}
            {erForstesiden && !erUtenlandssoknad && (
                <Button
                    variant="tertiary"
                    target="_blank"
                    as="a"
                    href="https://www.nav.no/sykepenger-og-personopplysninger"
                    className="-ml-5 text-left"
                >
                    Slik behandler NAV personopplysningene dine
                </Button>
            )}
            {(flexjarToggle.enabled ||
                sporsmal?.tag == 'INNTEKTSOPPLYSNINGER_DRIFT_VIRKSOMHETEN' ||
                sporsmal?.tag == 'INNTEKTSOPPLYSNINGER_VIRKSOMHETEN_AVVIKLET' ||
                sporsmal?.tag == 'MEDLEMSKAP_OPPHOLDSTILLATELSE_V2' ||
                valgtSoknad?.soknadstype === RSSoknadstype.OPPHOLD_UTLAND) && (
                <FlexjarSporsmal soknad={valgtSoknad} sporsmal={sporsmal} steg={stegNo} />
            )}
        </>
    )
}
