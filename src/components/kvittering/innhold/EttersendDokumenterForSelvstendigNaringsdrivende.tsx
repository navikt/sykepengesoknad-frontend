import { BodyLong, Box, Button, Heading, InfoCard, List, VStack } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { ExternalLinkIcon, InformationSquareIcon } from '@navikt/aksel-icons'

import { logEvent } from '../../umami/umami'
import { Soknad } from '../../../types/types'
import { sendInnUrl } from '../../../utils/environment'

export function EttersendDokumenterForSelvstendigNaringsdrivende({ soknad }: { soknad: Soknad }) {
    useEffect(() => {
        logEvent('knapp vist', {
            tekst: 'Gå til opplasting av dokumentasjon',
            component: 'Gå til opplasting av dokumentasjon knapp',
        })
    }, [])

    return (
        <>
            <VStack gap="space-16" className="my-2" align="start">
                <Heading size="small" level="3">
                    Opplasting av dokumentasjon
                </Heading>
                <BodyLong spacing>Du må sende inn dokumentasjon på inntekten din før vi kan behandle saken.</BodyLong>
                <Box>
                    <Heading as="h4" size="xsmall">
                        Vi trenger følgende dokumenter
                    </Heading>
                    <Box marginBlock="space-16" asChild>
                        <List>
                            {soknad.inntektsopplysningerInnsendingDokumenter?.map((dokument) => (
                                <List.Item key={dokument}>{dokument}</List.Item>
                            ))}
                        </List>
                    </Box>
                </Box>
                <Button
                    type="button"
                    as="a"
                    href={`${sendInnUrl()}/${soknad.inntektsopplysningerInnsendingId}`}
                    rel="noopener"
                    target="_blank"
                    iconPosition="right"
                    variant="secondary"
                    icon={<ExternalLinkIcon aria-hidden />}
                    className="mb-8"
                >
                    Gå til opplasting av dokumentasjon
                </Button>
                <InfoCard data-color="info">
                    <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                        Du kan laste opp dokumentasjonen senere. Du finner skjemaet for opplasting ved å logge inn på
                        nav.no.
                    </InfoCard.Message>
                </InfoCard>
            </VStack>
            <div className="col-span-12 mb-8 border-b-2 border-b-ax-neutral-300 pb-2" />
        </>
    )
}
