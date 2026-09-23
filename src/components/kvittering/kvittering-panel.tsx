import React, { ReactNode } from 'react'
import { BodyShort, Box, HStack, InfoCard, VStack } from '@navikt/ds-react'
import { CheckmarkCircleFillIcon } from '@navikt/aksel-icons'
import { tekst } from '../../utils/tekster'
import { tilLesbarDatoOgTid } from '../../utils/dato-utils'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'

export function KvitteringPanel({ children }: { children?: ReactNode[] | ReactNode; className?: string }) {
    const { valgtSoknad } = useSoknadMedDetaljer()

    if (!valgtSoknad) return null

    const dato = valgtSoknad.sendtTilNAVDato

    return (
        <InfoCard data-color="success">
            <InfoCard.Header>
                <HStack padding="space-16" gap="space-16" align="center">
                    <CheckmarkCircleFillIcon
                        aria-hidden={true}
                        title=""
                        fontSize="1.5rem"
                        className="text-ax-text-success-decoration"
                    />

                    <VStack>
                        <InfoCard.Title>{tekst('kvittering.sendt-til')}</InfoCard.Title>
                        {valgtSoknad.arbeidssituasjon != 'ARBEIDSTAKER' && dato && (
                            <div>
                                <BodyShort>
                                    {tekst('kvittering.mottatt')}: {tilLesbarDatoOgTid(dato)}
                                </BodyShort>
                            </div>
                        )}
                    </VStack>
                </HStack>
            </InfoCard.Header>
            {children && (
                <InfoCard.Content>
                    <Box padding="space-8" paddingInline="space-56 space-56" className="pb-8">
                        {children}
                    </Box>
                </InfoCard.Content>
            )}
        </InfoCard>
    )
}
