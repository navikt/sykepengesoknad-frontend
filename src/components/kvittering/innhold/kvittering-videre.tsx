import { BodyLong, Heading, Label } from '@navikt/ds-react'
import React from 'react'

import { RSArbeidssituasjon } from '../../../types/rs-types/rs-arbeidssituasjon'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { sendtForMerEnn30DagerSiden } from '../../../utils/dato-utils'
import { tekst } from '../../../utils/tekster'
import Kontonummer from '../kontonummer/kontonummer'
import { tekstMedHtml } from '../../../utils/html-react-parser-utils'
import { LenkeMedIkon } from '../../lenke-med-ikon/LenkeMedIkon'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { KvtteringPanel } from '../kvittering-panel'
import GridItems from '../grid-items'

import { SendInntektsopplysningerForSelvstendigNæringsdrivende } from './SendInntektsopplysningerForSelvstendigNaringsdrivende'
import { EttersendDokumenterForSelvstendigNaringsdrivende } from './EttersendDokumenterForSelvstendigNaringsdrivende'
import { FriskmeldtTilArbeidsformidlingKvitteringInfo } from './FriskmeldtTilArbeidsformidlingKvitteringInfo'

const KvitteringVidere = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    if (sendtForMerEnn30DagerSiden(valgtSoknad?.sendtTilArbeidsgiverDato, valgtSoknad?.sendtTilNAVDato)) {
        return null
    }

    if (!valgtSoknad) return null

    const naringsdrivendeForstegangssoknad =
        valgtSoknad.arbeidssituasjon &&
        [RSArbeidssituasjon.NAERINGSDRIVENDE, RSArbeidssituasjon.FISKER, RSArbeidssituasjon.JORDBRUKER].includes(
            valgtSoknad.arbeidssituasjon,
        ) &&
        valgtSoknad.forstegangssoknad

    return (
        <KvtteringPanel>
            {naringsdrivendeForstegangssoknad && (
                <>
                    <div className="mt-8 col-span-12"></div>

                    {!valgtSoknad.inntektsopplysningerNyKvittering && (
                        <SendInntektsopplysningerForSelvstendigNæringsdrivende />
                    )}
                    {valgtSoknad.inntektsopplysningerNyKvittering && valgtSoknad.inntektsopplysningerInnsendingId && (
                        <EttersendDokumenterForSelvstendigNaringsdrivende soknad={valgtSoknad} />
                    )}
                </>
            )}
            <GridItems>
                <Heading size="small" level="3" className="my-4">
                    {tekst('kvittering.hva-skjer-videre')}
                </Heading>
            </GridItems>
            <GridItems>
                {valgtSoknad.soknadstype == RSSoknadstype.FRISKMELDT_TIL_ARBEIDSFORMIDLING && (
                    <FriskmeldtTilArbeidsformidlingKvitteringInfo />
                )}
                <div className="mb-4">
                    <Label as="h2">{tekst('kvittering.nav-behandler-soknaden')}</Label>
                    <BodyLong as="span">{tekst('kvittering.arbeidstaker.saksbehandlingstid')} </BodyLong>
                    <LenkeMedIkon
                        href={tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke.url')}
                        text={tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke')}
                    />
                </div>

                {valgtSoknad.soknadstype !== RSSoknadstype.REISETILSKUDD && (
                    <div className="mb-4">
                        <Label as="h2">{tekst('kvittering.naar-blir-pengene')}</Label>
                        <BodyLong as="span">
                            {tekstMedHtml(tekst('kvittering.arbeidstaker.over16.utbetaling'))}
                        </BodyLong>
                    </div>
                )}

                <div className="mb-4">
                    <Kontonummer />
                </div>
            </GridItems>
        </KvtteringPanel>
    )
}

export default KvitteringVidere
