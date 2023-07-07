import { Alert, BodyLong, Button, Heading, Label } from '@navikt/ds-react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { ExternalLinkIcon } from '@navikt/aksel-icons'

import { RSArbeidssituasjon } from '../../../types/rs-types/rs-arbeidssituasjon'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { sendtForMerEnn30DagerSiden } from '../../../utils/dato-utils'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import useSoknad from '../../../hooks/useSoknad'
import Kontonummer from '../kontonummer/kontonummer'
import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import { RouteParams } from '../../../app'
import { LenkeMedIkon } from '../../lenke-med-ikon/LenkeMedIkon'

const KvitteringVidere = () => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)

    if (sendtForMerEnn30DagerSiden(valgtSoknad?.sendtTilArbeidsgiverDato, valgtSoknad?.sendtTilNAVDato)) {
        return null
    }

    if (!valgtSoknad) return null

    return (
        <Alert variant="info" className="bg-white" data-cy="kvittering-alert">
            {/* TODO Fjern overrides med !text-text-action hvis Alerten fjernes */}
            <Heading size="small" level="3">
                {tekst('kvittering.hva-skjer-videre')}
            </Heading>
            <Vis
                hvis={valgtSoknad.arbeidssituasjon === RSArbeidssituasjon.NAERINGSDRIVENDE}
                render={() => (
                    <>
                    <div className="mt-4">
                        <Label as="h2">{tekst('kvittering.før.nav.behandler')}</Label>
                        <BodyLong as="span">{tekst('kvittering.naeringsdrivende.brodtekst')} </BodyLong>
                    </div>
                    <div>
                         <Button
                            iconPosition="right"
                            variant="secondary"
                            icon={<ExternalLinkIcon aria-hidden />}
                            as="a"
                            href={tekst('kvittering.naeringsdrivende.lenke.url')}
                        >
                            {tekst('kvittering.naeringsdrivende.lenke')}
                        </Button>
                    </div>
                    </>
                )}
            />
            <div className="mt-4">
                <Label as="h2">{tekst('kvittering.nav-behandler-soknaden')}</Label>
                <BodyLong as="span">{tekst('kvittering.arbeidstaker.saksbehandlingstid')} </BodyLong>
                <LenkeMedIkon
                    href={tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke.url')}
                    text={tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke')}
                />
            </div>

            <Vis
                hvis={valgtSoknad.soknadstype !== RSSoknadstype.REISETILSKUDD}
                render={() => (
                    <div className="mt-4">
                        <Label as="h2">{tekst('kvittering.naar-blir-pengene')}</Label>
                        <BodyLong as="span">
                            {parserWithReplace(tekst('kvittering.arbeidstaker.over16.utbetaling'))}
                        </BodyLong>
                    </div>
                )}
            />

            <div className="mt-4">
                <Kontonummer />
            </div>
        </Alert>
    )
}

export default KvitteringVidere
