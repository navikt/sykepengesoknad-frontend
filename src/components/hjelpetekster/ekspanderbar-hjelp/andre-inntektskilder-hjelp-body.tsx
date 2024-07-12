import { BodyShort, List } from '@navikt/ds-react'

import { Begrepsforklarer } from '../../begrepsforklarer/begrepsforklarer'

export const AndreInntektskilderHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                Kun pensjonsgivende inntekt gir rett til sykepenger. NAV trenger å vite om din pensjonsgivende inntekt
                for å beregne riktig utbetaling. Arbeidsforholdene dine henter NAV fra offentlige registre.
            </BodyShort>
            <BodyShort className="pt-3">Svar ja hvis du har:</BodyShort>
            <List as="ul" size="small" className="[&>ul]:mt-2">
                <List.Item>
                    <BodyShort>Begynt i ny jobb</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>Jobbet mer i en annen jobb etter at du ble sykmeldt</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>Inntekt som selvstendig næringsdrivende</BodyShort>
                </List.Item>
                <List.Item>
                    <Begrepsforklarer inlinetekst="Jobbet frilans" tittel="Hva menes med frilans?">
                        <>
                            <BodyShort spacing>
                                Du er frilanser når du mottar inntekt uten å være ansatt hos den du utfører oppdraget
                                for, eller har et enkeltpersonsforetak.
                            </BodyShort>
                            <BodyShort>
                                Eksempler på frilans inntekter kan være: Kommunal omsorgsstønad,
                                Fosterhjemsgodtgjørelse, Dagmamma, Styreverv.
                            </BodyShort>
                        </>
                    </Begrepsforklarer>
                </List.Item>
                <List.Item>
                    <BodyShort>
                        {'Fått annen '}
                        <Begrepsforklarer
                            inlinetekst="pensjonsgivende inntekt"
                            tittel="Hva er pensjonsgivende inntekt?"
                        >
                            <BodyShort>
                                Pensjonsgivende inntekt er som oftest inntekt du har mottatt for arbeid du har utført og
                                betalt skatt av.
                            </BodyShort>
                        </Begrepsforklarer>
                        {' under sykmeldingen som ikke er registrert ennå'}
                    </BodyShort>
                </List.Item>
            </List>

            <BodyShort className="pt-3">Svar nei hvis du mottar:</BodyShort>
            <List as="ul" size="small" className="[&>ul]:mt-2">
                <List.Item>
                    <BodyShort>
                        Kapitalinntekt (utleie/salg av bolig utenom enkeltpersonforetak, aksjeselskap eller annen
                        selskapsform, renteinntekter, leieinntekter, kapitalgevinster)
                    </BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>Stønader fra folketrygden (uføretrygd, foreldrepenger, AAP, pleiepenger osv.)</BodyShort>
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
                <List.Item>
                    <BodyShort>Pensjon</BodyShort>
                </List.Item>
            </List>
        </>
    )
}
