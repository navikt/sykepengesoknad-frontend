import { Alert, BodyLong, Heading, Label, Link } from '@navikt/ds-react'
import React from 'react'
import { useParams } from 'react-router-dom'

import { RSArbeidssituasjon } from '../../../types/rs-types/rs-arbeidssituasjon'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { sendtForMerEnn30DagerSiden } from '../../../utils/dato-utils'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import useSoknad from '../../../hooks/useSoknad'
import Kontonummer from '../kontonummer/kontonummer'
import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import { RouteParams } from '../../../app'

const KvitteringVidere = () => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)

    if (sendtForMerEnn30DagerSiden(valgtSoknad?.sendtTilArbeidsgiverDato, valgtSoknad?.sendtTilNAVDato)) {
        return null
    }

    if (!valgtSoknad) return null

    return (
        <Alert variant="info" className={'bg-white'} data-cy={'kvittering-alert'}>
            <Heading size="small" level="3">
                {tekst('kvittering.hva-skjer-videre')}
            </Heading>
            <Vis
                hvis={valgtSoknad.arbeidssituasjon === RSArbeidssituasjon.NAERINGSDRIVENDE}
                render={() => (
                    <div className="avsnitt">
                        <Label as="h2">{tekst('kvittering.naeringsdrivende.tittel')}</Label>
                        <BodyLong spacing as="span">
                            {tekst('kvittering.naeringsdrivende.brodtekst')}{' '}
                        </BodyLong>
                        <Link target="_blank" href={tekst('kvittering.naeringsdrivende.lenke.url')}>
                            <BodyLong spacing as="span">
                                {tekst('kvittering.naeringsdrivende.lenke')}
                            </BodyLong>
                        </Link>
                        .
                    </div>
                )}
            />
            <div className="avsnitt hva-skjer">
                <Label as="h2">{tekst('kvittering.nav-behandler-soknaden')}</Label>
                <BodyLong spacing as="span">
                    {tekst('kvittering.arbeidstaker.saksbehandlingstid')}{' '}
                </BodyLong>
                <Link target="_blank" href={tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke.url')}>
                    <BodyLong spacing as="span">
                        {tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke')}
                    </BodyLong>
                </Link>
            </div>

            <Vis
                hvis={valgtSoknad.soknadstype !== RSSoknadstype.REISETILSKUDD}
                render={() => (
                    <div className="avsnitt">
                        <Label as="h2">{tekst('kvittering.naar-blir-pengene')}</Label>
                        <BodyLong spacing as="span">
                            {parserWithReplace(tekst('kvittering.arbeidstaker.over16.utbetaling'))}
                        </BodyLong>
                    </div>
                )}
            />

            <div className="avsnitt kontonummer">
                <Kontonummer />
            </div>
        </Alert>
    )
}

export default KvitteringVidere
