import { BodyShort, Link } from '@navikt/ds-react'
import React from 'react'

export const ReisetilskuddTekst = () => {
    return (
        <BodyShort as="ul" className="pt-3">
            <li>
                Retten til reisetilskudd gjelder bare hvis du trenger midlertidig transport til og fra arbeidsstedet på
                grunn av helseplager.
            </li>
            <li>Du kan få reisetilskudd hvis du i utgangspunktet har rett til sykepenger.</li>
            <li>NAV kan innhente flere opplysninger som er nødvendige for å behandle søknaden.</li>
            <li>
                NAV kan holde igjen eller kreve tilbake penger hvis du gir uriktige eller ufullstendige opplysninger.
            </li>
            <li>Det å gi feil opplysninger kan være straffbart.</li>
            <li>Fristen for å søke reisetilskudd er som hovedregel 3 måneder.</li>
            <li>
                Du kan lese mer om rettigheter og plikter på{' '}
                <Link href={'https://www.nav.no/reisetilskudd'} target={'_blank'}>
                    nav.no/reisetilskudd
                </Link>
                .
            </li>
        </BodyShort>
    )
}
