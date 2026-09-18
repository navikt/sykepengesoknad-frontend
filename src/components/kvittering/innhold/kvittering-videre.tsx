import { BodyLong, Box, Heading, Label, VStack } from '@navikt/ds-react'
import React from 'react'

import { RSArbeidssituasjon } from '../../../types/rs-types/rs-arbeidssituasjon'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { sendtForMerEnn30DagerSiden } from '../../../utils/dato-utils'
import { tekst } from '../../../utils/tekster'
import Kontonummer from '../kontonummer/kontonummer'
import { tekstMedHtml } from '../../../utils/html-react-parser-utils'
import { LenkeMedIkon } from '../../lenke-med-ikon/LenkeMedIkon'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { KvitteringPanel } from '../kvittering-panel'

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
        <KvitteringPanel className="p-4 pb-8">
            <VStack gap="space-16">
                {naringsdrivendeForstegangssoknad && (
                    <>
                        {!valgtSoknad.inntektsopplysningerNyKvittering && (
                            <SendInntektsopplysningerForSelvstendigNæringsdrivende />
                        )}
                        {valgtSoknad.inntektsopplysningerNyKvittering &&
                            valgtSoknad.inntektsopplysningerInnsendingId && (
                                <EttersendDokumenterForSelvstendigNaringsdrivende soknad={valgtSoknad} />
                            )}
                    </>
                )}
                <Box>
                    <Heading size="small" level="3" className="my-4">
                        {tekst('kvittering.hva-skjer-videre')}
                    </Heading>
                    {valgtSoknad.soknadstype == RSSoknadstype.FRISKMELDT_TIL_ARBEIDSFORMIDLING && (
                        <FriskmeldtTilArbeidsformidlingKvitteringInfo />
                    )}
                    {valgtSoknad.soknadstype == RSSoknadstype.OPPHOLD_UTLAND && (
                        //TODO: trekk ut til egen komponent
                        <>
                            <div className="mb-6 mt-2">
                                <Label as="h2">{tekst('kvittering.utenlands.overskrift1')}</Label>

                                <BodyLong spacing as="span">
                                    {tekst('kvittering.utenlands.brodtekst1')}{' '}
                                </BodyLong>
                            </div>
                            <div className="my-6">
                                <Label as="h2">{tekst('kvittering.utenlands.overskrift2')}</Label>
                                <BodyLong as="ul">
                                    <li>{tekst('kvittering.utenlands.liste1')}</li>
                                    <li>{tekst('kvittering.utenlands.liste2')}</li>
                                    <li>{tekst('kvittering.utenlands.liste3')}</li>
                                </BodyLong>
                            </div>
                            <LenkeMedIkon
                                href={tekst('kvittering.utenlands.lenke.url')}
                                text={tekst('kvittering.utenlands.lenke')}
                            />
                            <div className="mt-6">
                                <Label as="h2">{tekst('kvittering.utenlands.overskrift3')}</Label>
                                <BodyLong spacing as="span">
                                    {tekst('kvittering.utenlands.brodtekst3')}{' '}
                                </BodyLong>
                            </div>
                        </>
                    )}
                    {valgtSoknad.soknadstype != RSSoknadstype.OPPHOLD_UTLAND && (
                        <>
                            <Label as="h2">{tekst('kvittering.nav-behandler-soknaden')}</Label>
                            <BodyLong as="span">{tekst('kvittering.arbeidstaker.saksbehandlingstid')} </BodyLong>
                            <LenkeMedIkon
                                href={tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke.url')}
                                text={tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke')}
                            />
                            {valgtSoknad.soknadstype !== RSSoknadstype.REISETILSKUDD && (
                                <div className="my-6">
                                    <Label as="h2">{tekst('kvittering.naar-blir-pengene')}</Label>
                                    <BodyLong as="span">
                                        {tekstMedHtml(tekst('kvittering.arbeidstaker.over16.utbetaling'))}
                                    </BodyLong>
                                </div>
                            )}
                            <div className="mb-4">
                                <Kontonummer />
                            </div>
                        </>
                    )}
                </Box>
            </VStack>
        </KvitteringPanel>
    )
}

export default KvitteringVidere
