import { BodyLong, BodyShort, Button, Label, List } from '@navikt/ds-react'
import React, { MouseEvent, useState } from 'react'

import { logEvent } from '../amplitude/amplitude'
import { RSSoknadstypeType } from '../../types/rs-types/rs-soknadstype'
import { FlexModal } from '../flex-modal'
import { LenkeMedIkon } from '../lenke-med-ikon/LenkeMedIkon'

type Event = MouseEvent<HTMLAnchorElement | HTMLButtonElement>

export interface PersonvernLesMerProps {
    soknadstype: RSSoknadstypeType
}

export const PersonvernLesMer = ({ soknadstype }: PersonvernLesMerProps) => {
    const [aapen, setAapen] = useState<boolean>(false)

    const personvernLesMerKnapp = 'Les mer om hvordan NAV behandler personopplysninger'
    const handleAapen = (event: Event) => {
        event.preventDefault()
        setAapen(true)
        logEvent('knapp klikket', {
            tekst: personvernLesMerKnapp,
            soknadstype: soknadstype,
        })
    }
    const amplitudeLukketPopup = () => {
        logEvent('modal lukket', {
            component: personvernLesMerKnapp,
        })
    }

    const ListItemMedBold = ({ tittel, children }: { tittel: string; children: string }) => {
        return (
            <List.Item>
                <BodyShort>
                    <Label as="span">{tittel}</Label>: {children}
                </BodyShort>
            </List.Item>
        )
    }
    const PlainListItem = ({ children }: { children: string; classname?: string }) => {
        return (
            <List.Item>
                <BodyShort>{children}</BodyShort>
            </List.Item>
        )
    }

    return (
        <>
            <Button variant="tertiary" onClick={handleAapen} className="-ml-5 text-left">
                {personvernLesMerKnapp}
            </Button>
            <FlexModal
                open={aapen}
                setOpen={setAapen}
                headerId="Personvern-modal"
                header="Slik behandler NAV personopplysningene dine"
                onClose={() => {
                    amplitudeLukketPopup()
                }}
                lukkKnapp={true}
            >
                <BodyLong spacing>
                    Du har valgt å søke om sykepenger fra NAV. Det er penger du kan få hvis du fyller kravene. Du kan
                    lese om kravene på <LenkeMedIkon href="https://nav.no/sykepenger" text="nav.no/sykepenger" />.
                </BodyLong>
                <BodyLong spacing>
                    NAV innhenter opplysninger om deg når du sender inn en søknad. Det er nødvendig for at du skal kunne
                    få det du har krav på. For å behandle søknaden din henter vi inn opplysninger både fra deg og fra
                    offentlige registre.
                </BodyLong>
                <BodyLong spacing>
                    Ved korte sykefravær går søknaden bare til arbeidsgiveren din. Søknaden vil likevel kunne leses av
                    en saksbehandler i NAV og benyttes i fremtidig saksbehandling.
                </BodyLong>
                <BodyLong spacing>
                    Ved hjelp av kategoriserte personvernopplysninger nevnt i personvernforordningen, kan NAV beslutte
                    vedtak basert på automatisk behandling av personopplysninger (Jf, NAV, § 4a).
                </BodyLong>
                <BodyLong spacing>
                    Når NAV behandler disse opplysningene, må etaten sikre at reglene for forsvarlig saksbehandling
                    følges og ivaretar personvernrettighetene. En automatisk behandling følger klare regler og tar ikke
                    beslutninger som krever menneskelig skjønn, med mindre resultatet er veldig åpenbart og lett å
                    forstå.
                </BodyLong>
                <Label spacing as="p">
                    Automatisk behandling baserer seg på disse opplysningene:
                </Label>
                <List as="ul">
                    <ListItemMedBold tittel="Folkeregisteret">
                        navn, fødselsnummer, adresse, familie o.l.
                    </ListItemMedBold>
                    <ListItemMedBold tittel="Arbeidstaker- arbeidsgiver-, Enhets-, og aksjonærregisteret">
                        Arbeidsforhold og relasjon til arbeidsgiver
                    </ListItemMedBold>
                    <ListItemMedBold tittel="NAV">andre utbetalinger/ytelser</ListItemMedBold>
                    <ListItemMedBold tittel="Behandler">medisinske opplysninger om deg</ListItemMedBold>
                    <ListItemMedBold tittel="Arbeidsgiver">
                        Opplysninger om inntekt, arbeidsgiverperiode, eventuell ferie, første fraværsdag og personnummer
                    </ListItemMedBold>
                    <ListItemMedBold tittel="Andre land">trygdeordninger du kan ha rett til</ListItemMedBold>
                </List>

                <Label spacing as="p">
                    For at en sak skal kunne håndteres automatisk, trenger NAV følgende tre dokumenter:
                </Label>
                <List as="ul">
                    <PlainListItem>
                        Sykmelding fra legen din som inneholder informasjon om hvor mye du ikke kan jobbe, hvor lenge du
                        trenger å være borte fra jobben og hvorfor, samt en diagnose som viser hva som er galt.
                    </PlainListItem>
                    <PlainListItem>Søknad om sykepenger fra deg</PlainListItem>
                    <PlainListItem>Inntektsmelding som oversendes fra arbeidsgiver</PlainListItem>
                </List>
                <Label spacing as="p">
                    Når disse tre dokumentene er mottatt vurderer saksbehandlingsmaskinen følgende:
                </Label>

                <List as="ul">
                    <PlainListItem>
                        Om krav til minste inntektsgrunnlag er oppfylt (jf. Folketrygdloven § 8-3.) Kravet er som
                        hovedregel at du har et sykepengegrunnlag tilsvarende minst et halvt grunnbeløp.
                    </PlainListItem>
                    <PlainListItem>
                        Om du er medlem av folketrygdloven. (jf. Folketrygdloven § 2-1.) Dette gjøres ved oppslag i
                        interne registre, sammen med en manuell vurdering av saksbehandler.
                    </PlainListItem>
                    <PlainListItem>
                        Om det er mer enn 25 prosent avvik mellom innrapportert inntekt i a-ordningen og inntekt oppgitt
                        i inntektsmelding fra arbeidsgiver. (jf. Folketrygdloven § 8-30.) Dette er en del av beregning
                        av hva sykegrunnlaget skal være når NAV betaler sykepenger.
                    </PlainListItem>
                    <PlainListItem>
                        Om det mottas andre trygdeytelser, som omsorgspenger, foreldrepenger, opplæringspenger,
                        arbeidsavklaringspenger og dagpenger i samme periode. Dette er informasjon som innhentes fra
                        andre interne registre fordi man ikke kan få sykepenger samtidig som man mottar stønadene som
                        nevnt over.
                    </PlainListItem>
                    <PlainListItem>
                        Det hentes også informasjon om institusjonsopphold, sykdomshistorikk og sykepengehistorikk fra
                        interne registre. Dette benyttes til å beregne antall dager og hvor mye du kan få i sykepenger.
                    </PlainListItem>
                </List>

                <BodyLong spacing>
                    Deretter blir den informasjonen som er samlet inn nøye vurdert for å se om den passer med reglene
                    som gjelder for sykepenger. Dette betyr at vi ser på den innsamlede informasjonen sammen med de
                    reglene som allerede finnes for å bestemme om du kan få sykepenger eller ikke. Vi sjekker om
                    opplysningene vi har samlet inn oppfyller kravene som er satt i reglene for å kunne motta
                    sykepenger.
                </BodyLong>
                <BodyLong spacing>Dersom vilkårene er oppfylt, går saken til utbetaling.</BodyLong>
                <BodyLong spacing>
                    Den automatiske beslutningen vil du kunne se på{' '}
                    <LenkeMedIkon href="https://nav.no/syk/sykepenger" text="nav.no/syk/sykepenger" />.
                </BodyLong>

                <Label spacing as="p">
                    Ved automatisering har du rett til:
                </Label>

                <List as="ul">
                    <ListItemMedBold tittel="Rett til informasjon">
                        Som sykemeldt har du rett til å få tilstrekkelig informasjon om automatiseringssystemet som
                        brukes til å behandle søknaden. Dette omfatter hvordan systemet fungerer, hvilke kriterier som
                        brukes for å vurdere søknaden, og hvilken rolle automatisering spiller i beslutningsprosessen.
                    </ListItemMedBold>
                    <ListItemMedBold tittel="Protest">
                        Som sykemeldt kan du protestere mot den automatiske behandlingen av personopplysningene dine.
                    </ListItemMedBold>
                    <ListItemMedBold tittel="Menneskelig inngripen">
                        Selv om behandlingen er automatisert, har du rett til menneskelig inngripen i saken din når det
                        er nødvendig. Dette betyr at en saksbehandler skal være tilgjengelig for å vurdere og ta
                        beslutninger i tilfeller der automatiseringssystemet ikke kan håndtere situasjonen adekvat, samt
                        ved spesielle behov eller spørsmål.
                    </ListItemMedBold>
                    <ListItemMedBold tittel="Manuell overprøving av avgjørelsen">
                        Som sykemeldt har du rett til å be om en manuell overprøving av en avgjørelse som er tatt av
                        automatiseringssystemet. For enkeltvedtak vil retten til menneskelig inngripen og retten til å
                        bestride avgjørelsen i utgangspunktet ivaretas av forvaltningslovens regler om klage, ettersom
                        klager behandles manuelt i Arbeids- og velferdsetaten.
                    </ListItemMedBold>
                </List>
               <BodyLong spacing>Vi kan også sende opplysninger om deg til trygdeordninger i andre land.</BodyLong>

                <BodyLong spacing>
                    Du kan lese mer om hvordan NAV behandler personopplysninger i Arbeids- og velferdsetatens
                    personvernerklæring på <LenkeMedIkon href="https://nav.no/personvern" text="nav.no/personvern" />.
                </BodyLong>
            </FlexModal>
        </>
    )
}
