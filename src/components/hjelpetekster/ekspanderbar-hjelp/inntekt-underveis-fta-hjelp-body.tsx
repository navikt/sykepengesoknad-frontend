import { BodyShort, List } from '@navikt/ds-react'

export const InntektUnderveisFtaHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                Sykepenger skal erstatte inntekten du ville hatt hvis du hadde jobbet som normalt. For å beregne riktig
                sykepenger, må vi vite om du har hatt noe inntekt fra oppdrag eller andre jobber underveis.
            </BodyShort>
            <BodyShort className="py-3">
                Du kan kun få sykepenger for pensjonsgivende inntekt, det vil si inntekt du får som lønn og betaler
                skatt av. Det gjelder ikke:
            </BodyShort>
            <List as="ul" size="small" className="[&>ul]:mt-2">
                <List.Item>
                    <BodyShort>Stønader fra folketrygden (uføretrygd, foreldrepenger, AAP, pleiepenger osv.)</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>Pensjonsinntekt</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>
                        Kapitalinntekt (utleie/salg av bolig utenom enkeltpersonforetak, aksjeselskap eller annen
                        selskapsform, renteinntekter, leieinntekter, kapitalgevinster)
                    </BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>Utbetalinger fra forsikringsordninger (som AFP)</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>Inntekt fra salg av personlige gjenstander</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>Lotterigevinster</BodyShort>
                </List.Item>
            </List>
        </>
    )
}
