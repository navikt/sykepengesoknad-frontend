import { Alert, BodyLong, BodyShort, Button, ExpansionCard, Heading, List } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import React, { useState } from 'react'

import { AuthenticationError, fetchJsonMedRequestId } from '../../utils/fetch'
import { tekst } from '../../utils/tekster'
import { urlTilSoknad } from '../soknad/soknad-link'
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
    const [feilmeldingTekst, setFeilmeldingTekst] = useState<string>()
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

        window.location.href = '/syk/sykepengesoknad' + urlTilSoknad(soknad, true, true)
    }

    return (
        <>
            <Heading size="large" level="1" className="mt-8 mb-10">
                {tekst('opprett-utland.tittel')}
            </Heading>
            <BodyLong className="mb-3">
                Du må søke om å beholde sykepengene hvis du planlegger å reise utenfor EU/EØS, eller har reist, mens du
                er sykmeldt. Du bør sende søknaden før du reiser, for å være sikker på at du beholder sykepengene dine.
            </BodyLong>
            <BodyLong className="mb-3">
                Du kan ha rett til sykepenger under opphold utenfor EU/EØS i opptil 4 uker i løpet av en
                tolvmånedersperiode.
            </BodyLong>
            <BodyLong className="mb-3">
                Dersom noen av dagene du er utenfor EU/EØS ikke er feriedager, må du sende inn søknad for disse dagene.
            </BodyLong>
            <BodyLong className="mb-10">
                <LenkeMedIkon
                    href="https://www.nav.no/sykepenger#utland"
                    text="Se regler om sykepenger når du er på reise."
                />
            </BodyLong>
            <Heading spacing size="small" level="2">
                Du trenger ikke søke hvis du
            </Heading>
            <List className="mb-10">
                <List.Item>
                    <BodyShort>har avtalt med arbeidsgiveren din at du tar ut lovbestemt ferie</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>er sykmeldt på grunn av godkjent yrkesskade</BodyShort>
                </List.Item>
            </List>

            <Heading spacing size="small" level="2">
                Har du allerede vært på reise?
            </Heading>
            <BodyLong className="mb-10">
                I utgangspunktet bør du søke før du reiser til land utenfor EU/EØS. Du kan likevel søke NAV om å få
                beholde sykepengene etter du har reist.
            </BodyLong>

            <ExpansionCard
                aria-label="Informasjon om reise og søknadskrav for statsborgere utenfor EU/EØS"
                className="mb-16"
            >
                <ExpansionCard.Header>
                    <ExpansionCard.Title>Er du statsborger i et land utenfor EU/EØS?</ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <ul>
                        <BodyLong as="li" spacing>
                            Skal du reise innenfor Norden, trenger du ikke å søke.
                        </BodyLong>
                        <BodyLong as="li" spacing>
                            Skal du reise til et annet land innenfor EU/EØS, må du benytte{' '}
                            <LenkeMedIkon
                                href="https://www.nav.no/fyllut/nav080907?sub=paper"
                                text="søknaden på papir."
                            ></LenkeMedIkon>
                        </BodyLong>
                    </ul>
                </ExpansionCard.Content>
            </ExpansionCard>

            <Alert variant="warning">
                <Heading spacing size="small" level="2">
                    Viktig informasjon
                </Heading>
                Hvis du reiser uten å søke på forhånd eller ikke søker i ettertid, kan søknaden om sykepenger bli
                avslått. Det kan også påvirke videre søknader.
            </Alert>

            <Button variant="primary" type="button" onClick={opprettEllerFinnEksisterende} className="mb-8 mt-16">
                {tekst('opprett-utland.fortsett')}
            </Button>

            <div aria-live="polite">{feilmeldingTekst && <Alert variant="error">{feilmeldingTekst}</Alert>}</div>
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
