import React from 'react'
import { BodyShort, Link } from '@navikt/ds-react'

import { Soknad } from '../../types/types'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import Vis from '../vis'

export const VaerKlarOverAtTekst = (soknad: Soknad) => {
    const gradertReisetilskudd = soknad.soknadstype === RSSoknadstype.GRADERT_REISETILSKUDD
    const sykepenger = gradertReisetilskudd ? 'sykepenger og reisetilskudd' : 'sykepenger'

    return (
        <>
            <BodyShort as="ul" className="pt-3">
                <li>
                    Du kan bare få {sykepenger} hvis det er din egen sykdom eller skade som hindrer deg i å jobbe.
                    Sosiale eller økonomiske problemer gir ikke rett til {sykepenger.replace('og', 'eller')}.
                </li>
                <li>
                    Du kan miste retten til {sykepenger} hvis du nekter å opplyse om din egen arbeidsevne, eller hvis du
                    ikke tar imot behandling eller tilrettelegging.
                </li>
                <li>
                    Retten til {sykepenger} gjelder bare inntekt du har mottatt som lønn og betalt skatt av på
                    sykmeldingstidspunktet.
                </li>
                <li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li>
                <li>Fristen for å søke sykepenger er som hovedregel 3 måneder</li>

                <li>
                    Du må melde fra til NAV hvis du satt i varetekt, sonet straff eller var under forvaring i
                    sykmeldingsperioden.{' '}
                    <Link href={'https://www.nav.no/skriv-til-oss'} target={'_blank'}>
                        Meld fra til NAV her.
                    </Link>
                </li>
                <li>
                    Du må melde fra om studier som er påbegynt etter at du ble sykmeldt, og som ikke er avklart med NAV.
                    Det samme gjelder hvis du begynner å studere mer enn du gjorde før du ble sykmeldt.{' '}
                    <Link href={'https://www.nav.no/skriv-til-oss'} target={'_blank'}>
                        Meld fra til NAV her.
                    </Link>
                </li>
                <Vis
                    hvis={gradertReisetilskudd}
                    render={() => (
                        <li>
                            Du kan lese mer om rettigheter og plikter på{' '}
                            <Link href={'https://www.nav.no/sykepenger'} target={'_blank'}>
                                nav.no/sykepenger
                            </Link>{' '}
                            og{' '}
                            <Link href={'https://www.nav.no/reisetilskudd'} target={'_blank'}>
                                nav.no/reisetilskudd
                            </Link>
                            .
                        </li>
                    )}
                />
                <Vis
                    hvis={!gradertReisetilskudd}
                    render={() => (
                        <li>
                            Du kan lese mer om rettigheter og plikter på{' '}
                            <Link href={'https://www.nav.no/sykepenger'} target={'_blank'}>
                                nav.no/sykepenger
                            </Link>
                            .
                        </li>
                    )}
                />
            </BodyShort>
        </>
    )
}
