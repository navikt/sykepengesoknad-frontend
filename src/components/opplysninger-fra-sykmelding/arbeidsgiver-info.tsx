import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../utils/tekster'
import Vis from '../vis'
import { Soknad } from '../../types/types'

interface ArbeidsgiverInfoProps {
    valgtSoknad: Soknad
}

const ArbeidsgiverInfo = ({ valgtSoknad }: ArbeidsgiverInfoProps) => {
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
