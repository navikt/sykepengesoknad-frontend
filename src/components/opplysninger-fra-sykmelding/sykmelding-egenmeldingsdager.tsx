import { Label } from '@navikt/ds-react'
import React from 'react'

import { hentEgenmeldingsdager } from '../../utils/sykmelding-utils'
import Vis from '../vis'
import { Sykmelding } from '../../types/sykmelding'

interface EgenmeldingsdagerProps {
    valgtSykmelding: Sykmelding
}

const Egenmeldingsdager = ({ valgtSykmelding }: EgenmeldingsdagerProps) => {
    const dager = hentEgenmeldingsdager(valgtSykmelding)

    return (
        <Vis
            hvis={dager && dager.length > 0}
            render={() => (
                <div className="avsnitt">
                    <Label size="small" as="h3" className="avsnitt-hode">
                        Egenmeldingsdager ({dager!.length} dager)
                    </Label>
                    <ul>
                        {dager?.map((d, idx) => (
                            <li key={`egenmeldingdag-${idx}`}>{d}</li>
                        ))}
                    </ul>
                </div>
            )}
        />
    )
}

export default Egenmeldingsdager
