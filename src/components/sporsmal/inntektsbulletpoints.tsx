import { BodyShort, Label, List } from '@navikt/ds-react'
import React from 'react'

import { KjentInntektskilde, Soknad, Sporsmal } from '../../types/types'

export const Inntektsbulletpoints = ({ soknad, sporsmal }: { soknad: Soknad; sporsmal: Sporsmal }) => {
    const navnListe: string[] = []
    if (sporsmal.metadata) {
        const items = sporsmal.metadata.kjenteInntektskilder as KjentInntektskilde[]
        items.forEach((item) => navnListe.push(item.navn))
    } else {
        navnListe.push(soknad.arbeidsgiver!.navn)
        soknad.inntektskilderDataFraInntektskomponenten?.forEach((inntektskilde) => navnListe.push(inntektskilde.navn))
    }

    return (
        <>
            <Label as="p" className="mt-10">
                Arbeidsforhold vi har registrert på deg:
            </Label>
            <BodyShort>Hentet fra offentlige register.</BodyShort>

            <List aria-label="Inntektskilder fra Aa-registeret" className="mt-4 mb-10">
                {navnListe?.map((bedriftNavn, index) => (
                    <List.Item key={index}>{bedriftNavn}</List.Item>
                ))}
            </List>
        </>
    )
}
