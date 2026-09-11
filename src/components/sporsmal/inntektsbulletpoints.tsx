import { BodyShort, Heading, Label, List } from '@navikt/ds-react'
import React from 'react'

import { KjentInntektskilde, Soknad, Sporsmal } from '../../types/types'

export const Inntektsbulletpoints = ({ soknad, sporsmal }: { soknad: Soknad; sporsmal: Sporsmal }) => {
    const navnListe: string[] = []
    if (sporsmal.metadata) {
        const items = sporsmal.metadata.kjenteInntektskilder as KjentInntektskilde[]
        items.forEach((item) => navnListe.push(item.navn))
    } else {
        soknad.inntektskilderDataFraInntektskomponenten?.forEach((inntektskilde) => navnListe.push(inntektskilde.navn))
    }

    if (navnListe.length == 0) return null
    return (
        <>
            <Heading className="mt-10" size={"small"}>Andre arbeidsforhold vi har registrert på deg:</Heading>


            <List className="mt-4 mb-10">
                {navnListe?.map((bedriftNavn, index) => (
                    <List.Item key={index}>{bedriftNavn}</List.Item>
                ))}
            </List>
        </>
    )
}
