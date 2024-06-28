import { BodyShort, Skeleton } from '@navikt/ds-react'
import React from 'react'

import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'

const Fremdriftsbar = () => {
    const { valgtSoknad, stegNo } = useSoknadMedDetaljer()

    const aktivtSteg = stegNo - 1
    if (valgtSoknad && aktivtSteg == 0) return null

    if (aktivtSteg == 0) {
        // ingen progressbar på første side
        return null
    }

    const antallSteg =
        valgtSoknad?.sporsmal.filter((s) => s.tag !== 'VAER_KLAR_OVER_AT' && s.tag !== 'TIL_SLUTT').length || 9

    const bredde = valgtSoknad ? (100 / antallSteg) * aktivtSteg : 0

    const valueText = `${aktivtSteg} av ${antallSteg} steg`

    return (
        <div
            className="my-4 md:my-6"
            role="progressbar"
            aria-valuenow={aktivtSteg}
            aria-valuemin={1}
            aria-valuemax={antallSteg}
            aria-valuetext={valueText}
            aria-label="Søknadssteg"
        >
            <div className="relative mx-auto mt-4">
                <div className="h-3 rounded-lg bg-gray-200" />
                <div
                    className="-mt-3 h-3 rounded-lg bg-gray-900"
                    style={{
                        width: `${bredde}%`,
                    }}
                />
            </div>
            <div className="mt-4 flex justify-between">
                <BodyShort as={valgtSoknad ? 'span' : Skeleton}>{valueText}</BodyShort>
            </div>
        </div>
    )
}

export default Fremdriftsbar
