import { BodyShort } from '@navikt/ds-react'

export const arbeidUnderveisTittel = 'Spørsmålet forklart'

export const ArbeidUnderveisHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                Du kan avtale med lederen din å jobbe mer enn det som står i sykmeldingen. Da skal du oppgi hvor mange
                timer eller prosent du har jobbet til sammen i perioden du har vært sykmeldt. Dette inkluderer også den
                prosenten du kunne jobbe ifølge sykmeldingen.
            </BodyShort>
            <BodyShort>
                Dersom du har gjort færre arbeidsoppgaver enn vanlig, men brukt lengre tid på dem, skal du svare i
                prosent hvor stor del av arbeidsoppgavene dine du har utført.
            </BodyShort>
        </>
    )
}
