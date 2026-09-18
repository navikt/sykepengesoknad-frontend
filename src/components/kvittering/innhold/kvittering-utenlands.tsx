import { BodyLong, Heading, HStack, Label, VStack } from '@navikt/ds-react'
import React from 'react'
import { InformationSquareFillIcon } from '@navikt/aksel-icons'

import { sendtForMerEnn30DagerSiden } from '../../../utils/dato-utils'
import { tekst } from '../../../utils/tekster'
import { LenkeMedIkon } from '../../lenke-med-ikon/LenkeMedIkon'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { KvitteringPanel } from '../kvittering-panel'
export const KvitteringUtenlands = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    if (!valgtSoknad) return null

    if (sendtForMerEnn30DagerSiden(valgtSoknad.sendtTilArbeidsgiverDato, valgtSoknad.sendtTilNAVDato)) {
        return null
    }

    return (
        <KvitteringPanel className="p-4 pb-8">
            <HStack gap="space-16" align="center" justify="start">
                <InformationSquareFillIcon
                    aria-hidden={true}
                    title=""
                    fontSize="1.5rem"
                    className="text-ax-text-info-decoration"
                />
                <Heading size="small" level="3">
                    {tekst('kvittering.hva-skjer-videre')}
                </Heading>
                <VStack paddingInline="space-40 space-12">
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
                </VStack>
            </HStack>
        </KvitteringPanel>
    )
}
