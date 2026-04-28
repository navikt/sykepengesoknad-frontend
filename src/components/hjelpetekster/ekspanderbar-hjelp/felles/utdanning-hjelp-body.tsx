import { BodyShort } from '@navikt/ds-react'

export const utdanningTittel = 'Sykepenger under utdanning'

export const UtdanningHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                I noen tilfeller kan du ha rett til sykepenger fra NAV mens du studerer.{' '}
                <a target="_blank" href="https://www.nav.no/sykepenger#situasjoner">
                    Les om hvilken type utdanning det gjelder.
                </a>
            </BodyShort>
        </>
    )
}
