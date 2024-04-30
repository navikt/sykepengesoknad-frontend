import { BodyLong, BodyShort, Button, Label, List, Modal } from '@navikt/ds-react'
import React, { MouseEvent, ReactNode, useState } from 'react'

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
    const PlainListItem = ({ children }: { children: ReactNode[] | ReactNode; classname?: string }) => {
        return (
            <List.Item>
                <BodyShort>{children}</BodyShort>
            </List.Item>
        )
    }

    const avsnitt1Del1 =
        'Når du har blitt syk eller skadet og ikke kan jobbe, kan du ha rett til sykepenger. Du må oppfylle noen generelle vilkår for å få sykepenger. Du kan lese om vilkårene på '
    const avsintt1Del2 =
        '. For å behandle søknaden din henter vi inn opplysninger både fra deg og fra offentlige registre. Det er nødvendig for at du skal få det du har rett til. Ved korte sykefravær går søknaden bare til arbeidsgiveren din. En saksbehandler i NAV vil likevel kunne lese søknaden og benytte den i fremtidig saksbehandling. Ved hjelp av særlige kategorier av personopplysninger slik det er definert i personvernforordningen, kan NAV gjøre et vedtak i saken din basert på automatisk behandling av personopplysninger Når NAV behandler disse opplysningene, må vi sikre at vi følger reglene for forsvarlig saksbehandling og at vi ivaretar personvernrettighetene. En automatisk behandling følger klare regler og tar ikke beslutninger som krever at en saksbehandler vurderer dem.'
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
                        {avsnitt1Del1}
                        <LenkeMedIkon href="https://nav.no/sykepenger" text="nav.no/sykepenger" />
                        {avsintt1Del2}
                        <br />
                        (Se NAV-loven § 4a).
                    </BodyLong>
                    <Label spacing as="p">
                        En automatisk behandling av en sykepengesak baserer seg på følgende opplysninger:
                    </Label>
                    <List as="ul">
                        <ListItemMedBold tittel="Folkeregisteret">
                            navn, fødselsnummer, adresse, familie o.l.
                        </ListItemMedBold>
                        <ListItemMedBold tittel="Arbeidsgiver- og arbeidstakerregisteret, Enhetsregisteret og Aksjonærregisteret">
                            Arbeidsforhold og relasjonen til arbeidsgiveren
                        </ListItemMedBold>
                        <ListItemMedBold tittel="NAV">Andre utbetalinger/ytelser</ListItemMedBold>
                        <ListItemMedBold tittel="Behandler">medisinske opplysninger om deg</ListItemMedBold>
                        <ListItemMedBold tittel="Arbeidsgiver">
                            Opplysninger om inntekt, arbeidsgiverperiode, eventuell ferie, første fraværsdag og
                            personnummer
                        </ListItemMedBold>
                        <ListItemMedBold tittel="Andre land">Trygdeordninger du kan ha rett til</ListItemMedBold>
                    </List>

                    <Label spacing as="p">
                        For at en sak skal kunne håndteres automatisk, trenger NAV disse tre dokumentene:
                    </Label>
                    <List as="ul">
                        <PlainListItem>
                            Sykmeldingen fra legen din, som inneholder informasjon om hvor mye du ikke kan jobbe, hvor
                            lenge du trenger å være borte fra jobben og hvorfor, og en diagnose som viser hva som er
                            galt.
                        </PlainListItem>
                        <PlainListItem>Søknaden om sykepenger fra deg.</PlainListItem>
                        <PlainListItem>Inntektsmeldingen som arbeidsgiveren din sender.</PlainListItem>
                    </List>

                    <Label spacing as="p">
                        Når vi har mottatt disse tre dokumentene vurderer saksbehandlingssystemet følgende:
                    </Label>
                    <List as="ul">
                        <PlainListItem>
                            Om du oppfyller kravet til minste inntektsgrunnlag Kravet er som hovedregel at du har et
                            sykepengegrunnlag tilsvarende minst et halvt grunnbeløp.
                            <br />
                            (Se folketrygdloven § 8-3.)
                        </PlainListItem>
                        <PlainListItem>
                            Om du er medlem av folketrygdloven. Dette gjøres ved oppslag i interne registre, sammen med
                            at en saksbehandler også vurderer det.
                            <br />
                            (Se folketrygdloven § 2-1.)
                        </PlainListItem>
                        <PlainListItem>
                            Om det er mer enn 25 prosent avvik mellom den innteksten som er innrapportert i a-ordningen
                            og inntekten som er oppgitt i inntektsmelding fra arbeidsgiveren. Dette er en del av
                            beregningen av hva sykegrunnlaget skal være når NAV utbetaler sykepenger.
                            <br />
                            (Se folketrygdloven § 8-30)
                        </PlainListItem>
                        <PlainListItem>
                            Om du mottar andre trygdeytelser, som omsorgspenger, foreldrepenger, opplæringspenger,
                            arbeidsavklaringspenger og dagpenger i den samme perioden. Dette er informasjon som NAV
                            innhenter fra andre interne registre fordi man ikke kan få sykepenger samtidig som man
                            mottar de stønadene som nevnt over.
                        </PlainListItem>
                        <PlainListItem>
                            Vi henter også informasjon om institusjonsopphold, sykdomshistorikk og sykepengehistorikk
                            fra interne registre. Dette bruker vi til å beregne antall dager og hvor mye du kan få i
                            sykepenger.
                        </PlainListItem>
                    </List>

                    <BodyLong spacing>
                        NAV sjekker om opplysningene som er samlet inn oppfyller kravene som er satt i reglene for å
                        kunne motta sykepenger. Hvis du oppfyller vilkårene, får du utbetalt sykepenger. Den automatiske
                        beslutningen vil du kunne se på innloggede sider. Gå til “Ditt sykefravær” og deretter til “Svar
                        på søknader”.
                    </BodyLong>

                    <Label spacing as="p">
                        NAV har en plikt til å utrede saken din
                    </Label>

                    <BodyLong spacing>
                        Før vi gjør et vedtak, vurderer vi de opplysningene vi har om deg, arbeidsforholdet ditt og
                        inntekten din automatisk. Vi vurderer om disse opplysningene er tilstrekkelige og egnet for å
                        kunne vurdere om du har rett til sykepenger og for å bestemme hvor mye du skal få i sykepenger.
                    </BodyLong>
                    <BodyLong spacing>
                        Et eksempel er at vi innledningsvis sjekker om arbeidsforholdet ditt er innrapportert for sent,
                        eller om du har varierende lønnsinntekt forut for sykmeldingen. Hvis du også er eier av
                        selskapet du er sykmeldt fra, vil det kunne ha betydning for hvordan vi behandler
                        sykepengesøknaden din, fordi man kan ha muligheten til å påvirke opplysningene om lønns- og
                        arbeidsforholdet, for eksempel innrapportering av lønn.
                    </BodyLong>
                    <BodyLong spacing>
                        Hvis den automatiske vurderingen gir indikasjoner på at opplysningene vi har ikke er
                        tilstrekkelige til å gjøre et riktig vedtak, vil vi behandle saken manuelt slik at en
                        saksbehandler vil vurdere den nærmere. Det kan for eksempel innebære at det er nødvendig å
                        innhente noen flere opplysninger i saken din.
                    </BodyLong>

                    <Label as="p">Flere eksempler:</Label>
                    <BodyLong spacing>
                        Vi kan innhente informasjon om du har roller i selskaper eller om du er eier av
                        enkeltpersonforetak. Med roller mener vi for eksempel daglig leder eller styreleder.
                    </BodyLong>
                    <BodyLong spacing>
                        I noen tilfeller innhenter vi opplysninger om du er i nær familie med, eller er folkeregistrert
                        på samme adresse som en som har en rolle i selskapet du er sykmeldt fra.
                    </BodyLong>

                    <Label spacing as="p">
                        Ved automatisering har du rett til:
                    </Label>

                    <List as="ul">
                        <ListItemMedBold tittel="informasjon">
                            Som sykmeldt har du rett til å få tilstrekkelig informasjon om automatiseringssystemet som
                            brukes til å behandle søknaden. Dette omfatter hvordan systemet fungerer, hvilke kriterier
                            som brukes for å vurdere søknaden, og hvilken rolle automatisering spiller i
                            beslutningsprosessen.
                        </ListItemMedBold>
                        <ListItemMedBold tittel="protest">
                            Som sykmeldt kan du protestere mot den automatiske behandlingen av personopplysningene dine.
                        </ListItemMedBold>
                        <ListItemMedBold tittel="vurdering av saksbehandler">
                            Selv om behandlingen er automatisert, har du rett til å få en saksbehandler til å se på
                            saken din om det er nødvendig. Dette betyr at en saksbehandler skal være tilgjengelig for å
                            vurdere og ta beslutninger i tilfeller der automatiseringssystemet ikke kan håndtere
                            situasjonen tilstrekkelig, og ved spesielle behov eller spørsmål.
                        </ListItemMedBold>
                        <ListItemMedBold tittel="manuell overprøving av avgjørelsen">
                            Som sykmeldt har du rett til å be om en manuell overprøving av en avgjørelse som
                            automatiseringssystemet har tatt. For enkeltvedtak vil forvaltningslovens regler om klage
                            ivareta retten til menneskelig inngripen og retten til å bestride avgjørelsen, ettersom
                            klager behandles manuelt i Arbeids- og velferdsetaten.
                        </ListItemMedBold>
                    </List>
                    <BodyLong spacing>
                        Vi kan sende opplysninger om utbetalte sykepenger til offentlige og private pensjonsordninger.
                        Vi kan også sende opplysninger om deg til trygdeordninger i andre land.
                    </BodyLong>

                    <BodyLong spacing>
                        Du kan lese mer om hvordan NAV behandler personopplysninger i personvernerklæringen vår på{' '}
                        <LenkeMedIkon href="https://nav.no/personvern" text="nav.no/personvern" />.
                    </BodyLong>
                </Modal.Body>
                <ModalFooterMedLukk setOpen={setAapen} />
            </Modal>
        </>
    )
}
