import { Alert, BodyShort, Box, Button, ExpansionCard, Heading } from '@navikt/ds-react'
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
import useSoknader from '../../hooks/useSoknader'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import useSoknad from '../../hooks/useSoknad'
import AvbrytOppholdUtlandSoknadModal from '../avbryt-soknad-modal/avbryt-opphold-utland-soknad-modal'

const OpprettUtland = () => {
    const queryClient = useQueryClient()
    const [feilmeldingTekst, setFeilmeldingTekst] = useState<string>()
    const router = useRouter()
    const testpersonQuery = useTestpersonQuery()
    const { data: soknader } = useSoknader()
    const hentSisteUtlandSoknad = soknader?.find(
        (soknad) => soknad.status === RSSoknadstatus.NY && soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND,
    )

    const { data: soknad } = useSoknad(hentSisteUtlandSoknad?.id, hentSisteUtlandSoknad?.id !== undefined)

    useUpdateBreadcrumbs(() => [{ ...{ title: tekst('opprett-utland.tittel') }, handleInApp: true }], [])

    const opprettEllerFinnEksisterende = async () => {
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
        await queryClient.invalidateQueries(['soknader'])
        await router.push(urlTilSoknad(soknad, true, true))
    }

    return (
        <>
            <Box className="mt-16">
                <Heading spacing size="large" level="1">
                    {tekst('opprett-utland.tittel')}
                </Heading>
                <BodyShort spacing className="mt-8">
                    Du trenger ikke søke hvis du enten
                </BodyShort>

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
                        href="https://www.nav.no/sykepenger#utland"
                        text="Se regler om sykepenger når du er på reise."
                    />
                </BodyShort>
            </Box>

            <Box className="mt-16">
                <Heading spacing size="small" level="2">
                    Har du allerede vært på reise?
                </Heading>
                I utgangspunktet bør du søke før du reiser til land utenfor EU/EØS. Du kan likevel søke NAV om å få
                beholde sykepengene etter du har reist.
            </Box>

            <ExpansionCard
                aria-label="Informasjon om reise og søknadskrav for statsborgere utenfor EU/EØS"
                className="mt-16"
            >
                <ExpansionCard.Header>
                    <ExpansionCard.Title>Er du statsborger i et land utenfor EU/EØS?</ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <ul>
                        <BodyShort as="li" spacing>
                            Skal du reise innenfor Norden, trenger du ikke å søke.
                        </BodyShort>
                        <BodyShort as="li" spacing>
                            Skal du reise til et annet land innenfor EU/EØS, må du benytte{' '}
                            <LenkeMedIkon
                                href="https://www.nav.no/fyllut/nav080907?sub=paper"
                                text="søknaden på papir."
                            ></LenkeMedIkon>
                        </BodyShort>
                    </ul>
                </ExpansionCard.Content>
            </ExpansionCard>

            <Button variant="primary" type="button" onClick={opprettEllerFinnEksisterende} className="mb-8 mt-16">
                {tekst('opprett-utland.fortsett')}
            </Button>

            <div aria-live="polite">
                <Vis hvis={feilmeldingTekst} render={() => <Alert variant="error">{feilmeldingTekst}</Alert>} />
            </div>

            <AvbrytOppholdUtlandSoknadModal soknad={soknad} />
            <LenkeMedIkon
                className="mt-8"
                href="https://www.nav.no/no/NAV+og+samfunn/Om+NAV/personvern-i-arbeids-og-velferdsetaten"
                text={tekst('opprett-utland.personvern')}
            />
        </>
    )
}

export default OpprettUtland
