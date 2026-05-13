import { BodyShort } from '@navikt/ds-react'

export const JobbetDuGradertArbeidstakerHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                Du kan avtale med lederen din å jobbe mer enn det sykmeldingen tilsier. Da oppgir du i timer eller
                prosent hvor mye du har jobbet totalt i denne perioden. Tiden du har jobbet totalt inkluderer det legen
                din har oppgitt at du kan jobbe i sykmeldingen.
            </BodyShort>
            <BodyShort>
                Dette kan også bety at du kan ha færre arbeidsoppgaver men bruke lenger tid på dem. For eksempel kan du
                utføre 50% av dine vanlige arbeidsoppgaver og samtidig jobbe hele arbeidsdager. Er dette tilfellet
                svarer du i prosent hvor stor mengde av arbeidsoppgavene dine du har utført.
            </BodyShort>
        </>
    )
}
