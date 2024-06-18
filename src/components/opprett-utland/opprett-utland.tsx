import { Alert, BodyShort, Button, GuidePanel, Heading, Panel } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import React, { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { AuthenticationError, fetchJsonMedRequestId } from '../../utils/fetch'
import { tekst } from '../../utils/tekster'
import { urlTilSoknad } from '../soknad/soknad-link'
import Vis from '../vis'
import { useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import { LenkeMedIkon } from '../lenke-med-ikon/LenkeMedIkon'
import { rsToSoknad } from '../../types/mapping'
import { useTestpersonQuery } from '../../hooks/useTestpersonQuery'

const OpprettUtland = () => {
    const queryClient = useQueryClient()
    const [feilmeldingTekst, setFeilmeldingTekst] = useState<string>()
    const router = useRouter()
    const testpersonQuery = useTestpersonQuery()

    useUpdateBreadcrumbs(() => [{ ...{ title: tekst('opprett-utland.tittel') }, handleInApp: true }], [])

    const opprett = async () => {
        // TODO: Gjør om til mutation
        let data
        try {
            data = await fetchJsonMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/opprettSoknadUtland${testpersonQuery.query()}`,
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

        const soknad = rsToSoknad(data)
        queryClient.setQueriesData(['soknad', soknad.id], soknad)
        queryClient.invalidateQueries(['soknader'])
        router.push(urlTilSoknad(soknad))
    }

    return (
        <>
            <Panel border className="mt-16">
                <Heading spacing size="large" level="1">
                    {tekst('opprett-utland.tittel')}
                </Heading>
                <BodyShort spacing>Du trenger ikke søke hvis du enten</BodyShort>

                <ul>
                    <BodyShort spacing as="li">
                        har avtalt med arbeidsgiveren din at du tar ut lovbestemt ferie
                    </BodyShort>
                    <BodyShort spacing as="li">
                        er sykmeldt på grunn av godkjent yrkesskade
                    </BodyShort>
                </ul>
                <BodyShort>
                    <LenkeMedIkon
                        href="https://www.nav.no/no/Person/Arbeid/Sykmeldt%2C+arbeidsavklaringspenger+og+yrkesskade/Sykepenger/sykepenger-ved-utenlandsopphold"
                        text="Se regler om sykepenger når du er på reise."
                    />
                </BodyShort>
            </Panel>

            <Alert variant="info" className="mt-16">
                <Heading spacing size="small" level="3">
                    Har du allerede vært på reise?
                </Heading>
                I utgangspunktet bør du søke før du reiser til land utenfor EU/EØS. Du kan likevel søke NAV om å få
                beholde sykepengene etter du har reist.
            </Alert>

            <Panel>
                <Heading size="small" level="3" spacing>
                    Er du statsborger i et land utenfor EU/EØS?
                </Heading>

                <ul>
                    <BodyShort as="li" spacing>
                        Skal du reise innenfor Norden, trenger du ikke å søke.
                    </BodyShort>
                    <BodyShort as="li" spacing>
                        Skal du reise til et annet land innenfor EU/EØS, må du benytte{' '}
                        <LenkeMedIkon
                            href="https://www.nav.no/soknader/nb/person/til-eller-fra-norge/opphold-eller-arbeid-utenfor-norge/NAV%2008-09.07/brev"
                            text="søknaden på papir."
                        ></LenkeMedIkon>
                    </BodyShort>
                </ul>
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
