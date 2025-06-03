import { BodyShort, List } from '@navikt/ds-react'

export const NaringsdrivendeVarigEndringHjelpBody = () => {
    return (
        <>
            <>
                <BodyShort spacing>
                    Har det skjedd en endring i virksomheten din som følge av en konkret situasjon og du forventer at
                    endringen vil vare, trenger vi opplysninger om endringen.
                </BodyShort>

                <BodyShort className="pt-3 font-bold">Det kan for eksempel være hvis:</BodyShort>
                <List as="ul" size="small" className="[&>ul]:mt-2">
                    <List.Item>
                        <BodyShort>du har startet eller avsluttet en virksomhet</BodyShort>
                    </List.Item>
                    <List.Item>
                        <BodyShort>du har lagt om, utvidet eller nedskalert virksomheten</BodyShort>
                    </List.Item>
                    <List.Item>
                        <BodyShort>
                            du har begynt eller sluttet i en annen jobb ved siden av og jobber derfor mer eller mindre i
                            virksomheten din enn før
                        </BodyShort>
                    </List.Item>
                    <List.Item>
                        <BodyShort>kundegrunnlaget ditt har endret seg</BodyShort>
                    </List.Item>
                </List>

                <BodyShort spacing>
                    Svar ja, hvis det har skjedd en endring i virksomheten eller arbeidssituasjonen din som du forventer
                    at vil vare.
                </BodyShort>
                <BodyShort>Svar nei, hvis det har skjedd endringer i form av naturlige svingninger over tid.</BodyShort>
            </>
        </>
    )
}
