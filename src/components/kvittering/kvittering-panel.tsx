import React, { ReactNode } from 'react'
import { BodyShort, Box, Heading, HStack, VStack } from '@navikt/ds-react'
import { CheckmarkCircleFillIcon } from '@navikt/aksel-icons'
import { tekst } from '../../utils/tekster'
import { tilLesbarDatoOgTid } from '../../utils/dato-utils'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'

export function KvitteringPanel({ children }: { children: ReactNode[] | ReactNode; className?: string }) {
    const { valgtSoknad } = useSoknadMedDetaljer()

    if (!valgtSoknad) return null

    const dato = valgtSoknad.sendtTilNAVDato

    return (
        <div>
            <Box borderRadius="12" borderWidth="1" borderColor="neutral-strong" overflow="hidden">
                <Box>
                    <HStack
                        padding="space-16"
                        className="border-b border-b-ax-border-neutral bg-ax-bg-success-soft"
                        gap="space-16"
                        align="center"
                    >
                        <CheckmarkCircleFillIcon
                            aria-hidden={true}
                            title=""
                            fontSize="1.5rem"
                            className="text-ax-text-success-decoration"
                        />
                        <VStack>
                            <Heading size="small" level="2">
                                {tekst('kvittering.sendt-til')}
                            </Heading>
                            {valgtSoknad.arbeidssituasjon != 'ARBEIDSTAKER' && dato && (
                                <div>
                                    <BodyShort>
                                        {tekst('kvittering.mottatt')}: {tilLesbarDatoOgTid(dato)}
                                    </BodyShort>
                                </div>
                            )}
                        </VStack>
                    </HStack>
                </Box>
                <Box padding="space-8" paddingInline="space-56 space-56" className="pb-8">
                    {children}
                </Box>
            </Box>
        </div>
    )
}
