import { Heading, List } from '@navikt/ds-react'
import React from 'react'

import { LenkeMedIkon } from '../lenke-med-ikon/LenkeMedIkon'

import { IngenPunkt, StrekPunkt } from './punkt-ikon'

export const ForDuSoker = () => {
    return (
        <>
            <Heading level="2" size="large" spacing>
                Før du søker
            </Heading>
            <List>
                <List.Item>
                    Retten til sykepenger gjelder bare pensjonsgivende inntekt du har på sykmeldingstidspunktet.
                </List.Item>
                <List.Item>Sykepengesøknaden er basert på opplysninger vi har fra sykmeldingen.</List.Item>
                <List.Item>
                    Du kan endre svarene i denne søknaden opp til 12 måneder etter du sendte den inn første gangen.
                </List.Item>
                <List.Item>
                    Husk at du må søke om sykepenger innen 3 hele kalendermåneder etter den måneden du hadde sykedager.
                </List.Item>
                <List.Item>
                    <List description="Husk å melde fra til NAV hvis du i sykmeldingsperioden:">
                        <List.Item className="!mb-0 !-mt-2" icon={<StrekPunkt />}>
                            har startet i studier som ikke er avklart med NAV
                        </List.Item>
                        <List.Item className="!my-0" icon={<StrekPunkt />}>
                            begynner å studere mer enn du gjorde før du ble sykmeldt
                        </List.Item>
                        <List.Item className="!my-0" icon={<StrekPunkt />}>
                            satt i varetekt, sonet straff eller var under forvaring
                        </List.Item>
                        <List.Item className="!-ml-3" icon={<IngenPunkt />}>
                            <LenkeMedIkon href="https://www.nav.no/skriv-til-oss" text="Meld fra til NAV her" />{' '}
                        </List.Item>
                    </List>
                </List.Item>
                <List.Item>
                    <LenkeMedIkon
                        href="https://www.nav.no/saksbehandlingstider#sykepenger"
                        text="Sjekk de oppdaterte saksbehandlingstidene"
                    />
                </List.Item>
                <List.Item>
                    For riktig utbetaling trenger vi å vite hva som skjedde i løpet av sykefraværet, i tilfelle noe har
                    endret seg. For eksempel om du jobbet mer enn sykmeldingen sier. Derfor må du søke hver gang vi ber
                    deg om det.
                </List.Item>
            </List>
        </>
    )
}
