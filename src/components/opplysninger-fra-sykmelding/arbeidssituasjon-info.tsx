import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { hentArbeidssituasjon } from '../../utils/sykmelding-utils'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'
import { Sykmelding } from '../../types/sykmelding'

interface ArbeidssituasjonInfoProps {
    valgtSykmelding: Sykmelding
}

const ArbeidssituasjonInfo = ({ valgtSykmelding }: ArbeidssituasjonInfoProps) => {
    const arbeidssituasjon = hentArbeidssituasjon(valgtSykmelding)

    return (
        <Vis
            hvis={arbeidssituasjon}
            render={() => (
                <div className="avsnitt">
                    <Label size="small" as="h3" className="avsnitt-hode">
                        {tekst('din-sykmelding.arbeidssituasjon.tittel.2')}
                    </Label>
                    <BodyShort>
                        {tekst(`din-sykmelding.arbeidssituasjon.alternativ.${arbeidssituasjon!.toLowerCase()}` as any)}
                    </BodyShort>
                </div>
            )}
        />
    )
}

export default ArbeidssituasjonInfo
