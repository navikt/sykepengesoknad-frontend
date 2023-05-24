import { Alert, BodyLong, Button, GuidePanel, Heading, Panel } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { useAppStore } from '../../data/stores/app-store'
import { Soknad } from '../../types/types'
import { AuthenticationError, fetchJsonMedRequestId } from '../../utils/fetch'
import { tekst } from '../../utils/tekster'
import { urlTilSoknad } from '../soknad/soknad-link'
import Vis from '../vis'
import { useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import { parserWithReplace } from '../../utils/html-react-parser-utils'
import { LenkeMedIkon } from '../lenke-med-ikon/LenkeMedIkon'

const OpprettUtland = () => {
    const queryClient = useQueryClient()
    const { setFeilmeldingTekst, feilmeldingTekst } = useAppStore()
    const navigate = useNavigate()

    useUpdateBreadcrumbs(() => [{ ...{ title: tekst('opprett-utland.tittel') }, handleInApp: true }], [])

    const opprett = async () => {
        let data
        try {
            data = await fetchJsonMedRequestId(
                '/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/opprettSoknadUtland',
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                },
            )
        } catch (e: any) {
            if (!(e instanceof AuthenticationError)) {
                setFeilmeldingTekst(tekst('opprett-utland.feilet'))
                logger.warn(e)
            }
            return
        } finally {
            setFeilmeldingTekst('')
        }

        const soknad = new Soknad(data)
        queryClient.setQueriesData(['soknad', soknad.id], soknad)
        queryClient.invalidateQueries(['soknader'])
        navigate(urlTilSoknad(soknad))
    }

    return (
        <>
            <GuidePanel poster={true}>{parserWithReplace(tekst('opprett-utland.bjorn'))}</GuidePanel>

            <Panel border className="mt-16">
                <Heading spacing size="medium" level="1">
                    {tekst('opprett-utland.tittel')}
                </Heading>

                <BodyLong>{parserWithReplace(tekst('opprett-utland.trenger-ikke-soke'))}</BodyLong>
            </Panel>

            <Button variant="primary" type="button" onClick={opprett} className="mb-8 mt-16">
                {tekst('opprett-utland.fortsett')}
            </Button>

            <div aria-live="polite">
                <Vis hvis={feilmeldingTekst} render={() => <Alert variant="error">{feilmeldingTekst}</Alert>} />
            </div>
            <LenkeMedIkon
                className="mt-8"
                href="https://www.nav.no/no/NAV+og+samfunn/Om+NAV/personvern-i-arbeids-og-velferdsetaten"
                text={tekst('opprett-utland.personvern')}
            />
        </>
    )
}

export default OpprettUtland
