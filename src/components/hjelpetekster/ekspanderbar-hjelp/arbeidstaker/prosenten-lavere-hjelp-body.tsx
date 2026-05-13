import { BodyShort } from '@navikt/ds-react'

export const prosentenLavereTittel = 'Er prosenten lavere enn du forventet?'

export const ProsentenLavereHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                Grunnen kan være at helligdager eller røde dager som havner på mandag-fredag regnes som sykepengedager
                hos NAV. Derfor fordeles timene dine også på disse dagene selv om du hadde fri.
            </BodyShort>
            <BodyShort spacing>
                Hvis du har fylt inn riktig antall timer, og likevel får beskjed om at timene utgjør mindre enn
                sykmeldingsprosenten din, kan du svare nei på spørsmålet og gå videre.
            </BodyShort>
        </>
    )
}
