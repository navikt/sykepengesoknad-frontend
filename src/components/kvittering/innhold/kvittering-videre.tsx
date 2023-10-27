import { BodyLong, Heading, Label } from '@navikt/ds-react'
import React from 'react'
import { InformationSquareFillIcon } from '@navikt/aksel-icons'

import { RSArbeidssituasjon } from '../../../types/rs-types/rs-arbeidssituasjon'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { sendtForMerEnn30DagerSiden } from '../../../utils/dato-utils'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import Kontonummer from '../kontonummer/kontonummer'
import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import { LenkeMedIkon } from '../../lenke-med-ikon/LenkeMedIkon'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { KvtteringPanel } from '../kvittering-panel'
import GridItems from '../grid-items'

import { InntektSN } from './arbeidstaker/gjentagende-segmenter/InntektSN'

const KvitteringVidere = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    if (sendtForMerEnn30DagerSiden(valgtSoknad?.sendtTilArbeidsgiverDato, valgtSoknad?.sendtTilNAVDato)) {
        return null
    }

    if (!valgtSoknad) return null

    return (
        <KvtteringPanel data-cy="kvittering-panel">
            <GridItems
                venstre={
                    <div className="flex h-full items-center justify-center">
                        <InformationSquareFillIcon title="" fontSize="1.5rem" className="text-icon-info" />
                    </div>
                }
            >
                <Heading size="small" level="3" className="my-4">
                    {tekst('kvittering.hva-skjer-videre')}
                </Heading>
            </GridItems>
            <GridItems>
                {valgtSoknad.arbeidssituasjon === RSArbeidssituasjon.NAERINGSDRIVENDE && <InntektSN />}
                <div className="mb-4">
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
                        <div className="mb-4">
                            <Label as="h2">{tekst('kvittering.naar-blir-pengene')}</Label>
                            <BodyLong as="span">
                                {parserWithReplace(tekst('kvittering.arbeidstaker.over16.utbetaling'))}
                            </BodyLong>
                        </div>
                    )}
                />

                <div className="mb-4">
                    <Kontonummer />
                </div>
            </GridItems>
        </KvtteringPanel>
    )
}

export default KvitteringVidere
