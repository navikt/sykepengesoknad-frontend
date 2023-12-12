import { BodyLong, BodyShort, Button, Label, List, Modal } from '@navikt/ds-react'
import React, { MouseEvent, useState } from 'react'

import { logEvent } from '../amplitude/amplitude'
import { LenkeMedIkon } from '../lenke-med-ikon/LenkeMedIkon'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { ModalFooterMedLukk } from '../modal-footer-med-lukk'

type Event = MouseEvent<HTMLAnchorElement | HTMLButtonElement>

export const SlikBehandlerNavPersonopplysningene = () => {
    const [aapen, setAapen] = useState<boolean>(false)

    const { valgtSoknad } = useSoknadMedDetaljer()

    const slikBehandlerNavPersonoppl = 'Slik behandler NAV personopplysningene dine'
    const handleAapen = (event: Event) => {
        event.preventDefault()
        setAapen(true)
        logEvent('knapp klikket', {
            tekst: slikBehandlerNavPersonoppl,
            soknadstype: valgtSoknad?.soknadstype,
        })
    }
    const amplitudeLukketPopup = () => {
        logEvent('modal lukket', {
            component: slikBehandlerNavPersonoppl,
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
            <Button variant="tertiary" onClick={handleAapen} type="button" className="-ml-5 text-left">
                {slikBehandlerNavPersonoppl}
            </Button>
            <Modal
                open={aapen}
                header={{ heading: slikBehandlerNavPersonoppl, closeButton: true }}
                onClose={() => {
                    setAapen(false)
                    amplitudeLukketPopup()
                }}
            >
                <Modal.Body>
                    <BodyLong spacing>
                        Når du har blitt syk eller skadet og ikke kan jobbe, kan du ha rett til sykepenger. Du må
                        oppfylle noen generelle vilkår for å få sykepenger. Du kan lese om vilkårene på{' '}
                        <LenkeMedIkon href="https://nav.no/sykepenger" text="nav.no/sykepenger" />.
                    </BodyLong>
                    <BodyLong spacing>
                        NAV innhenter opplysninger om deg når du sender inn en søknad. Det er nødvendig for at du skal
                        kunne få det du har krav på. For å behandle søknaden din henter vi inn opplysninger både fra deg
                        og fra offentlige registre.
                    </BodyLong>
                    <BodyLong spacing>
                        Ved korte sykefravær går søknaden bare til arbeidsgiveren din. Søknaden vil likevel kunne leses
                        av en saksbehandler i NAV og benyttes i fremtidig saksbehandling.
                    </BodyLong>
                    <BodyLong spacing>
                        Ved hjelp av kategoriserte personvernopplysninger nevnt i personvernforordningen, kan NAV fatte
                        et vedtak i din sak basert på automatisk behandling av personopplysninger (Jf. NAV-loven § 4a).
                    </BodyLong>
                    <BodyLong spacing>
                        Når NAV behandler disse opplysningene, må etaten sikre at reglene for forsvarlig saksbehandling
                        følges og ivaretar personvernrettighetene. En automatisk behandling følger klare regler og tar
                        ikke beslutninger som krever en vurdering av en saksbehandler.
                    </BodyLong>
                    <Label spacing as="p">
                        En automatisk behandling av en sykepengesak baserer seg på følgende opplysninger:
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
                            Opplysninger om inntekt, arbeidsgiverperiode, eventuell ferie, første fraværsdag og
                            personnummer
                        </ListItemMedBold>
                        <ListItemMedBold tittel="Andre land">trygdeordninger du kan ha rett til</ListItemMedBold>
                    </List>

                    <Label spacing as="p">
                        For at en sak skal kunne håndteres automatisk, trenger NAV disse tre dokumenter:
                    </Label>
                    <List as="ul">
                        <PlainListItem>
                            Sykmeldingen fra legen din, som inneholder informasjon om hvor mye du ikke kan jobbe, hvor
                            lenge du trenger å være borte fra jobben og hvorfor, og en diagnose som viser hva som er
                            galt.
                        </PlainListItem>
                        <PlainListItem>Søknaden om sykepenger fra deg.</PlainListItem>
                        <PlainListItem>Inntektsmeldingen som oversendes fra arbeidsgiver.</PlainListItem>
                    </List>
                    <Label spacing as="p">
                        Når disse tre dokumentene er mottatt vurderer saksbehandlingssystemet følgende:
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
                            Om det er mer enn 25 prosent avvik mellom innrapportert inntekt i a-ordningen og inntekt
                            oppgitt i inntektsmelding fra arbeidsgiver. (jf. Folketrygdloven § 8-30.) Dette er en del av
                            beregning av hva sykegrunnlaget skal være når NAV betaler sykepenger. (Jf. Folketrygdloven
                            §8-30)
                        </PlainListItem>
                        <PlainListItem>
                            Om det mottas andre trygdeytelser, som omsorgspenger, foreldrepenger, opplæringspenger,
                            arbeidsavklaringspenger og dagpenger i samme periode. Dette er informasjon som innhentes fra
                            andre interne registre fordi man ikke kan få sykepenger samtidig som man mottar stønadene
                            som nevnt over.
                        </PlainListItem>
                        <PlainListItem>
                            Det hentes også informasjon om institusjonsopphold, sykdomshistorikk og sykepengehistorikk
                            fra interne registre. Dette benyttes til å beregne antall dager og hvor mye du kan få i
                            sykepenger.
                        </PlainListItem>
                    </List>

                    <BodyLong spacing>
                        NAV sjekker om opplysningene som er samlet inn oppfyller kravene som er satt i reglene for å
                        kunne motta sykepenger.
                    </BodyLong>
                    <BodyLong spacing>Dersom vilkårene er oppfylt, går saken til utbetaling.</BodyLong>
                    <BodyLong spacing>
                        Den automatiske beslutningen vil du kunne se på innloggede sider. Gå til “Ditt sykefravær” og
                        deretter til “Svar på søknader”.
                    </BodyLong>

                    <Label spacing as="p">
                        NAV har en plikt til å utrede saken din
                    </Label>

                    <BodyLong spacing>
                        Før vi gjør et vedtak, vurderer vi de opplysningene vi har om deg, arbeidsforholdet ditt og
                        inntekten din automatisk. Vi vurderer om disse opplysningene inneholder uregelmessigheter, og om
                        du har stor påvirkningskraft i bedriften du er sykemeldt fra. Et eksempel på dette er at vi
                        innledningsvis sjekker  om arbeidsforholdet ditt er innrapportert for sent, eller at du har
                        varierende lønnsinntekt forut for sykmeldingen. Hvis du også er eier av selskapet du er sykmeldt
                        fra, vil det kunne ha betydning for hvordan vi behandler sykepengesøknaden din. Hvis det er
                        flere slike uregelmessigheter og du har stor påvirkningskraft i bedriften din, vil vi ta saken
                        ut til manuell behandling og en saksbehandler vil vurdere den.
                    </BodyLong>

                    <Label spacing as="p">
                        Ved automatisering har du rett til:
                    </Label>

                    <List as="ul">
                        <ListItemMedBold tittel="Rett til informasjon">
                            Som sykemeldt har du rett til å få tilstrekkelig informasjon om automatiseringssystemet som
                            brukes til å behandle søknaden. Dette omfatter hvordan systemet fungerer, hvilke kriterier
                            som brukes for å vurdere søknaden, og hvilken rolle automatisering spiller i
                            beslutningsprosessen.
                        </ListItemMedBold>
                        <ListItemMedBold tittel="Protest">
                            Som sykemeldt kan du protestere mot den automatiske behandlingen av personopplysningene
                            dine.
                        </ListItemMedBold>
                        <ListItemMedBold tittel="Vurdering av saksbehandler">
                            Selv om behandlingen er automatisert, har du rett til å få saksbehandler til å se på saken
                            din om det er nødvendig. Dette betyr at en saksbehandler skal være tilgjengelig for å
                            vurdere og ta beslutninger i tilfeller der automatiseringssystemet ikke kan håndtere
                            situasjonen tilstrekkelig, samt ved spesielle behov eller spørsmål.
                        </ListItemMedBold>
                        <ListItemMedBold tittel="Manuell overprøving av avgjørelsen">
                            Som sykemeldt har du rett til å be om en manuell overprøving av en avjørelse som er tatt av
                            automatiseringssystemet. For enkeltvedtak vil retten til menneskelig inngripen og retten til
                            å bestride avgjørelsen i utgangspunktet ivaretas av forvaltningslovens regler om klage,
                            ettersom klager behandles manuelt i Arbeids- og velferdsetaten.
                        </ListItemMedBold>
                    </List>
                    <BodyLong spacing>
                        Vi kan sende opplysninger om utbetalte sykepenger til offentlige og private pensjonsordninger.
                        Vi kan også sende opplysninger om deg til trygdeordninger i andre land.
                    </BodyLong>

                    <BodyLong spacing>
                        Du kan lese mer om hvordan NAV behandler personopplysninger i Arbeids- og velferdsetatens
                        personvernerklæring på{' '}
                        <LenkeMedIkon href="https://nav.no/personvern" text="nav.no/personvern" />.
                    </BodyLong>
                </Modal.Body>
                <ModalFooterMedLukk setOpen={setAapen} />
            </Modal>
        </>
    )
}
