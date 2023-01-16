import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'
import { useParams } from 'react-router-dom'

import { tekst } from '../../utils/tekster'
import Vis from '../vis'
import { RouteParams } from '../../app'
import useSoknad from '../../hooks/useSoknad'

const ArbeidsgiverInfo = () => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)

    return (
        <Vis
            hvis={valgtSoknad?.arbeidsgiver}
            render={() => (
                <div className="avsnitt">
                    <Label size="small" as="h3" className="avsnitt-hode">
                        {tekst('sykepengesoknad.sykmelding-utdrag.arbeidsgiver')}
                    </Label>
                    <BodyShort>{valgtSoknad!.arbeidsgiver!.navn}</BodyShort>
                </div>
            )}
        />
    )
}

export default ArbeidsgiverInfo
