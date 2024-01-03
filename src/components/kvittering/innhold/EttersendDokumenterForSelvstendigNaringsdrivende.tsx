import { Alert, BodyLong, Button, Heading, List } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { ExternalLinkIcon } from '@navikt/aksel-icons'

import { logEvent } from '../../amplitude/amplitude'
import GridItems from '../grid-items'
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
            <GridItems>
                <Heading size="small" level="3">
                    Opplasting av dokumentasjon
                </Heading>
            </GridItems>
            <GridItems>
                <>
                    <BodyLong spacing>
                        Du må sende inn dokumentasjon på inntekten din før vi kan behandle saken.
                    </BodyLong>
                    <List title="Vi trenger følgende dokumenter">
                        {soknad.inntektsopplysningerInnsendingDokumenter?.map((dokument) => (
                            <List.Item key={dokument}>{dokument}</List.Item>
                        ))}
                    </List>

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
                    <Alert variant="info">
                        Du kan gjøre dette senere, da finner du skjemaet for opplasting av dine dokumenter ved å logge
                        inn på nav.no
                    </Alert>
                </>
            </GridItems>
            <div className="col-span-12 mx-4 mb-8 border-b-2 border-b-gray-200 pb-2" />
        </>
    )
}
