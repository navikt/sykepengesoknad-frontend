import { BodyShort, List } from '@navikt/ds-react'

export const NaringsdrivendeVarigEndringHjelpBody = () => {
    return (
        <>
            <>
                <BodyShort spacing>
                    Spørsmålet gjelder alle arbeidsforhold du har - også de du eventuelt ikke er sykmeldt fra. Har det
                    skjedd en varig endring som følge av en konkret situasjon, skal du svare ja på spørsmålet.
                </BodyShort>

                <BodyShort className="pt-3 font-bold">Det kan for eksempel være hvis:</BodyShort>
                <List as="ul" size="small" className="[&>ul]:mt-2">
                    <List.Item>
                        <BodyShort>du har opprettet eller avviklet en virksomhet</BodyShort>
                    </List.Item>
                    <List.Item>
                        <BodyShort>du har lagt om, utvidet eller nedskalert en virksomhet</BodyShort>
                    </List.Item>
                    <List.Item>
                        <BodyShort>
                            du har begynt eller sluttet i en annen jobb du har ved siden av og jobber derfor mer eller
                            mindre i en virksomhet enn før
                        </BodyShort>
                    </List.Item>
                    <List.Item>
                        <BodyShort>kundegrunnlaget ditt har endret seg</BodyShort>
                    </List.Item>
                </List>

                <BodyShort spacing>
                    Svar nei, hvis det kun har skjedd endringer i form av naturlige svingninger over tid.
                </BodyShort>
            </>
        </>
    )
}
