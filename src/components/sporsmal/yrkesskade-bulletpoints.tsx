import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { TagTyper } from '../../types/enums'
import { Soknad, Sporsmal, Yrkesskadedato } from '../../types/types'
import { tilLesbarDatoMedArstall } from '../../utils/dato-utils'

export const Yrkesskadebulletpoints = ({ sporsmal, soknad }: { sporsmal: Sporsmal; soknad: Soknad }) => {
    if (sporsmal.tag !== TagTyper.YRKESSKADE_V2) return null

    function skapSkadedatoTekst(y: Yrkesskadedato) {
        return `Skadedato ${tilLesbarDatoMedArstall(y.skadedato)} (Vedtaksdato ${tilLesbarDatoMedArstall(
            y.vedtaksdato,
        )})`
    }

    return (
        <>
            <Label as="p" className="mb-4 mt-10">
                Godkjente yrkesskader vi har registrert på deg:
            </Label>
            <ul className="mb-10">
                {soknad.yrkesskadedatoer?.map((y, index) => {
                    return (
                        <BodyShort as="li" className="mb-4" key={index}>
                            {skapSkadedatoTekst(y)}
                        </BodyShort>
                    )
                })}
            </ul>
        </>
    )
}
