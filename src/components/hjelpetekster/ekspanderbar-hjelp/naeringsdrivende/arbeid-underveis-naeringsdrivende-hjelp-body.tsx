import { BodyShort } from '@navikt/ds-react'

export const arbeidUnderveisNaeringsdrivendeTittel = 'Spørsmålet forklart'

export const ArbeidUnderveisNaeringsdrivendeHjelpBody = (gradert: { gradert: boolean }) => {
    return (
        <>
            {!gradert ? (
                <BodyShort spacing>
                    Du kan jobbe selv om du er 100 % sykmeldt. Dersom du har gjort det, skal du oppgi hvor mange timer
                    eller prosent du har jobbet til sammen i perioden i perioden du har vært sykmeldt.
                </BodyShort>
            ) : (
                <BodyShort spacing>
                    Du kan jobbe mer enn det som står i sykmeldingen. Dersom du har gjort det, skal du oppgi hvor mange
                    timer eller prosent du har jobbet til sammen i perioden du har vært sykmeldt. Dette inkluderer også
                    den prosenten du kunne jobbe ifølge sykmeldingen.
                </BodyShort>
            )}
            <BodyShort>
                Dersom du har gjort færre arbeidsoppgaver enn vanlig, men brukt lengre tid på dem, skal du svare i
                prosent hvor stor del av arbeidsoppgavene dine du har utført.
            </BodyShort>
        </>
    )
}
