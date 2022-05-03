import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'

const ArbeidsgiverInfo = () => {
    const { valgtSoknad } = useAppStore()

    return (
        <Vis
            hvis={valgtSoknad?.arbeidsgiver}
            render={() => (
                <div className="avsnitt">
                    <Label size="small" as="h3" className="avsnitt-hode">
                        {tekst(
                            'sykepengesoknad.sykmelding-utdrag.arbeidsgiver'
                        )}
                    </Label>
                    <BodyShort>{valgtSoknad!.arbeidsgiver!.navn}</BodyShort>
                </div>
            )}
        />
    )
}

export default ArbeidsgiverInfo
