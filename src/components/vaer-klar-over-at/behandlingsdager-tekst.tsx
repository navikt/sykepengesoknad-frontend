import { BodyShort, Link } from '@navikt/ds-react'
import React from 'react'

export const BehandlingsdagerTekst = () => {
    return (
        <BodyShort as="ul" className="pt-3">
            <li>
                Denne søknaden gjelder hvis selve behandlingen har en slik virkning på deg at du ikke kan jobbe resten
                av dagen. Grunnen er altså behandlingens effekt, og ikke at du for eksempel måtte bruke arbeidstid.
            </li>
            <li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li>
            <li>Fristen for å søke sykepenger er som hovedregel 3 måneder.</li>
            <li>
                Du kan lese mer om rettigheter og plikter på{' '}
                <Link href={'https://www.nav.no/sykepenger'} target={'_blank'}>
                    nav.no/sykepenger
                </Link>
                .
            </li>
        </BodyShort>
    )
}
