import { BodyLong } from '@navikt/ds-react'

import { EkspanderbarHjelpTekster } from './ekspanderbar-hjelp-tekst'

export const TilbakeIArbeidHjelpBody = () => {
    return (
        <>
            <BodyLong>{EkspanderbarHjelpTekster['ekspanderbarhjelp.tilbake_i_arbeid.body1']}</BodyLong>
            <BodyLong className={'mt-4'}>
                {EkspanderbarHjelpTekster['ekspanderbarhjelp.tilbake_i_arbeid.body2']}
            </BodyLong>
            <BodyLong className={'mt-4'}>
                {EkspanderbarHjelpTekster['ekspanderbarhjelp.tilbake_i_arbeid.body3']}
            </BodyLong>
        </>
    )
}
