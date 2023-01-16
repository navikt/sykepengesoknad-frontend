import { BodyShort, Detail } from '@navikt/ds-react'
import React from 'react'

import { RSArbeidssituasjon } from '../../types/rs-types/rs-arbeidssituasjon'
import { harForsikring, harSpmOmForsikring, hentArbeidssituasjon } from '../../utils/sykmelding-utils'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'
import { Sykmelding } from '../../types/sykmelding'

interface ForsikringInfoProps {
    valgtSykmelding: Sykmelding
}

const ForsikringInfo = ({ valgtSykmelding }: ForsikringInfoProps) => {
    const arbeidssituasjon = hentArbeidssituasjon(valgtSykmelding)
    const forsikring = harForsikring(valgtSykmelding)

    return (
        <Vis
            hvis={
                (arbeidssituasjon === RSArbeidssituasjon.FRILANSER ||
                    arbeidssituasjon === RSArbeidssituasjon.NAERINGSDRIVENDE) &&
                harSpmOmForsikring(valgtSykmelding)
            }
            render={() => (
                <div className="avsnitt">
                    <Detail as="h3" className="avsnitt-hode">
                        {tekst('sykepengesoknad.sykmelding-utdrag.forsikring')}
                    </Detail>
                    <BodyShort>
                        {tekst(
                            forsikring
                                ? 'sykepengesoknad.sykmelding-utdrag.forsikring-ja'
                                : 'sykepengesoknad.sykmelding-utdrag.forsikring-nei',
                        )}
                    </BodyShort>
                </div>
            )}
        />
    )
}

export default ForsikringInfo
