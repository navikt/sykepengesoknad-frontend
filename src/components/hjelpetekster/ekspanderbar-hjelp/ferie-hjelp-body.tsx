import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import { LenkeMedIkon } from '../../lenke-med-ikon/LenkeMedIkon'

export const FerieHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>Som arbeidstaker har du krav på lovbestemt ferie hvert år.</BodyShort>
            <BodyShort spacing>
                Ferie betyr at du har avtalt med arbeidsgiver å ta fri fra arbeidet og du benytter deg av dine utdelte
                feriedager.
            </BodyShort>
            <BodyShort spacing>
                Du kan dra på ferie mens du er sykmeldt, men du får ikke utbetalt sykepenger når du har ferie.
                Opparbeidet feriepenger fra året før skal dekke dine feriedager. Har du ikke opparbeidet deg feriepenger
                fra året før har du likevel rett på ubetalt ferie. Tidspunktet for hvor lenge du har rett til sykepenger
                forskyves når du tar ferie.
            </BodyShort>
            <BodyShort spacing>
                Når du tar ut lovbestemt ferie, trenger du ikke å søke om å beholde sykepengene selv om du skal reise ut
                av Norge. Da svarer du ja på dette spørsmålet og oppgir dagene du har hatt ferie.
            </BodyShort>
            <BodyShort spacing>
                Svar ja, hvis du har hatt ferie mens du er sykmeldt. Legg deretter inn dato for perioden du hadde ferie.
                Merk at røde dager ikke går under lovbestemt ferie.
            </BodyShort>
            <BodyShort spacing>
                Svar nei, dersom du ikke har hatt ferie, eller hvis du har blitt syk rett før eller under den planlagte
                ferien og dermed ikke hatt glede av den. Da kan du ha rett til å utsette ferien din.
            </BodyShort>
            <LenkeMedIkon href="https://www.nav.no/sykepenger#ferie" text="Les mer om ferie og sykepenger her." />
        </>
    )
}
