import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { hentEgenmeldingsdager } from '../../utils/sykmelding-utils'
import { Sykmelding } from '../../types/sykmelding'

interface EgenmeldingsdagerProps {
    valgtSykmelding: Sykmelding
}

const Egenmeldingsdager = ({ valgtSykmelding }: EgenmeldingsdagerProps) => {
    const dager = hentEgenmeldingsdager(valgtSykmelding)

    return (
        <>
            {dager && dager.length > 0 && (
                <section className="mt-8">
                    <Label size="small" as="h3">
                        Egenmeldingsdager ({dager.length} dager)
                    </Label>
                    <ul>
                        {dager.map((d, idx) => (
                            <BodyShort as="li" key={`egenmeldingdag-${idx}`}>
                                {d}
                            </BodyShort>
                        ))}
                    </ul>
                </section>
            )}
        </>
    )
}

export default Egenmeldingsdager
