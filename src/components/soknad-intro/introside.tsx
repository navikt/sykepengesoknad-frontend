import { Alert, BodyLong } from '@navikt/ds-react'
import React from 'react'

import { JulesoknadTekstIntroside } from '../julesoknad/julesoknad-infotekst'
import { LenkeMedIkon } from '../lenke-med-ikon/LenkeMedIkon'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { erOppdelt } from '../../utils/periode-utils'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'

import { IntroGuide } from './intro-guide'
import { ForDuSoker } from './for-du-soker'
import { IntroAccordion } from './intro-accordion'
import { InfoOmTilbakedatering } from './info-om-tilbakedatering'
import { Over70Aar } from './over-70'
import { IntrosideFta } from './friskmeldt-til-arbeidsformidling/introside-fta'

export function Introside() {
    const { valgtSoknad, valgtSykmelding } = useSoknadMedDetaljer()
    if (!valgtSoknad) return null

    if (valgtSoknad.soknadstype === RSSoknadstype.FRISKMELDT_TIL_ARBEIDSFORMIDLING) {
        return (
            <>
                <IntrosideFta />
            </>
        )
    }

    const erJulesoknad = !!valgtSoknad?.julesoknad

    const oppdeltSoknadTekst =
        valgtSoknad && valgtSykmelding && erOppdelt(valgtSoknad, valgtSykmelding)
            ? 'Siden sykemeldingen går over 31 dager, har vi delt opp søknaden, slik at du kan søke om sykepenger før hele perioden er ferdig. På den måten slipper du å vente lenge på sykepengene dine.'
            : ''

    return (
        <>
            <IntroGuide />
            <ForDuSoker />
            <IntroAccordion />
            {erJulesoknad && <JulesoknadTekstIntroside />}
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
    )
}
