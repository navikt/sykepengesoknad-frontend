import { BodyLong, Box, Heading, VStack } from '@navikt/ds-react'
import React from 'react'

import { RSArbeidssituasjon } from '../../../types/rs-types/rs-arbeidssituasjon'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { sendtForMerEnn30DagerSiden } from '../../../utils/dato-utils'
import { tekst } from '../../../utils/tekster'
import Kontonummer from '../kontonummer/kontonummer'
import { LenkeMedIkon } from '../../lenke-med-ikon/LenkeMedIkon'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { KvitteringPanel } from '../kvittering-panel'

import { SendInntektsopplysningerForSelvstendigNæringsdrivende } from './SendInntektsopplysningerForSelvstendigNaringsdrivende'
import { EttersendDokumenterForSelvstendigNaringsdrivende } from './EttersendDokumenterForSelvstendigNaringsdrivende'
import { FriskmeldtTilArbeidsformidlingKvitteringInfo } from './FriskmeldtTilArbeidsformidlingKvitteringInfo'

const KvitteringVidere = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    if (!valgtSoknad) return null

    const dato = valgtSoknad.sendtTilNAVDato
    const visKvittering = !sendtForMerEnn30DagerSiden(valgtSoknad.sendtTilArbeidsgiverDato, dato)

    const naringsdrivendeForstegangssoknad =
        valgtSoknad.arbeidssituasjon &&
        [RSArbeidssituasjon.NAERINGSDRIVENDE, RSArbeidssituasjon.FISKER, RSArbeidssituasjon.JORDBRUKER].includes(
            valgtSoknad.arbeidssituasjon,
        ) &&
        valgtSoknad.forstegangssoknad

    return (
        <KvitteringPanel className="p-4 pb-8">
            {visKvittering && (
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
                        <Heading size="small" level="2" className="my-4">
                            {tekst('kvittering.hva-skjer-videre')}
                        </Heading>
                        {valgtSoknad.soknadstype == RSSoknadstype.FRISKMELDT_TIL_ARBEIDSFORMIDLING && (
                            <FriskmeldtTilArbeidsformidlingKvitteringInfo />
                        )}
                        {valgtSoknad.soknadstype == RSSoknadstype.OPPHOLD_UTLAND && (
                            <VStack gap="space-16" className="my-2">
                                <div>
                                    <Heading size="xsmall" level="3">
                                        {tekst('kvittering.utenlands.overskrift1')}
                                    </Heading>
                                    <BodyLong spacing as="span">
                                        {tekst('kvittering.utenlands.brodtekst1')}
                                    </BodyLong>
                                </div>
                                <div>
                                    <Heading size="xsmall" level="3">
                                        {tekst('kvittering.utenlands.overskrift2')}
                                    </Heading>
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
                                <div>
                                    <Heading size="xsmall" level="3">
                                        {tekst('kvittering.utenlands.overskrift3')}
                                    </Heading>
                                    <BodyLong spacing as="span">
                                        {tekst('kvittering.utenlands.brodtekst3')}
                                    </BodyLong>
                                </div>
                            </VStack>
                        )}
                        {valgtSoknad.soknadstype != RSSoknadstype.OPPHOLD_UTLAND && (
                            <>
                                <VStack gap="space-16">
                                    <div>
                                        <Heading size="xsmall" level="3">
                                            {tekst('kvittering.nav-behandler-soknaden')}
                                        </Heading>
                                        <BodyLong as="span">
                                            {tekst('kvittering.arbeidstaker.saksbehandlingstid')}{' '}
                                        </BodyLong>
                                    </div>
                                    <LenkeMedIkon
                                        href={tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke.url')}
                                        text={tekst('kvittering.arbeidstaker.saksbehandlingstid.lenke')}
                                    />
                                    {valgtSoknad.soknadstype !== RSSoknadstype.REISETILSKUDD && (
                                        <VStack gap="space-16" className="mt-6">
                                            <div>
                                                <Heading size="xsmall" level="3">
                                                    {tekst('kvittering.naar-blir-pengene')}
                                                </Heading>
                                                <BodyLong as="span">
                                                    {tekst('kvittering.arbeidstaker.over16.utbetaling')}
                                                </BodyLong>
                                            </div>
                                            <LenkeMedIkon
                                                href="https://www.nav.no/utbetalingsdatoer#sykepenger"
                                                text="Les mer om når du kan forvente å få pengene."
                                            />
                                        </VStack>
                                    )}
                                    <div>
                                        <Kontonummer />
                                    </div>
                                </VStack>
                            </>
                        )}
                    </Box>
                </VStack>
            )}
        </KvitteringPanel>
    )
}

export default KvitteringVidere
