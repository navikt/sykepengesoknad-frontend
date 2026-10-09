import { Alert, BodyLong, Button, ExpansionCard, Heading, List } from '@navikt/ds-react'
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
                Er du sykmeldt og skal reise utenfor EU/EØS? Da må du søke om å beholde sykepengene før du reiser. Søker
                du i god tid, kan du planlegge behandling eller oppfølging slik at reisen ikke påvirker sykepengene. Du
                kan ha rett til sykepenger i opptil 4 uker i løpet av 12 måneder.
            </BodyLong>
            <BodyLong className="mb-3">
                Om du allerede har reist, kan du fortsatt søke. Vi vurderer da om du hadde rett til sykepenger mens du
                var borte, og om du har rett til sykepenger videre.
            </BodyLong>
            <BodyLong className="mb-10">
                <LenkeMedIkon
                    href="https://www.nav.no/sykepenger#utland"
                    text="Se regler om sykepenger når du er på reise."
                />
            </BodyLong>
            <Heading spacing size="small" level="2">
                Du trenger ikke søke hvis
            </Heading>
            <List className="mb-10">
                <List.Item>har avtalt med arbeidsgiveren din at du tar ut lovbestemt ferie</List.Item>
                <List.Item>er sykmeldt på grunn av godkjent yrkesskade</List.Item>
                <List.Item>du skal være i et EU-/EØS-land</List.Item>
                <List.Item>
                    du skal på en{' '}
                    <LenkeMedIkon
                        href="https://www.oslo-universitetssykehus.no/avdelinger/prehospital-klinikk/avdeling-for-utenlandskontor-og-behandlingsreiser/behandlingsreiser/"
                        text="behandlingsreise i regi av Oslo Universitetsykehus"
                    />
                </List.Item>
            </List>

            <Alert variant="warning">
                <Heading spacing size="small" level="2">
                    Søk før du reiser
                </Heading>
                Reiser du uten godkjent søknad og er borte i mer enn 14 dager, kan det påvirke sykepengene dine også
                etter at du er kommet hjem. Du kan miste dem, eller få mindre i sykepenger resten av perioden du er
                sykmeldt. Det samme kan skje hvis du blir borte lenger enn perioden du har fått godkjenning til.
            </Alert>

            <ExpansionCard
                aria-label="Informasjon om reise og søknadskrav for statsborgere utenfor EU/EØS"
                className="mt-16"
            >
                <ExpansionCard.Header>
                    <ExpansionCard.Title>Er du statsborger i et land utenfor EU/EØS?</ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <ul>
                        <BodyLong as="li">Skal du reise innenfor Norden, trenger du ikke søke</BodyLong>
                        <BodyLong as="li">
                            Skal du reise til et annet land i EU/EØS, må du bruke{' '}
                            <LenkeMedIkon
                                href="https://www.nav.no/fyllut/nav080907?sub=paper"
                                text="søknaden på papir"
                            ></LenkeMedIkon>
                        </BodyLong>
                    </ul>
                </ExpansionCard.Content>
            </ExpansionCard>

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
