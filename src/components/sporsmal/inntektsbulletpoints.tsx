import { Heading, List } from '@navikt/ds-react'
import React from 'react'

import { Soknad } from '../../types/types'

export const Inntektsbulletpoints = ({ soknad }: { soknad: Soknad }) => {
    const navnListe = soknad.ghostInntekter?.map((inntektskilde) => inntektskilde.navn) || []

    if (navnListe.length == 0) return null
    return (
        <>
            <Heading className="mt-10" size={'small'}>
                Andre arbeidsforhold vi har registrert på deg:
            </Heading>

            <List className="mt-4 mb-10">
                {navnListe?.map((bedriftNavn, index) => (
                    <List.Item key={index}>{bedriftNavn}</List.Item>
                ))}
            </List>
        </>
    )
}
