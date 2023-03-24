import { BodyShort, Label } from '@navikt/ds-react'
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
                <section className="mt-8">
                    <Label size="small" as="h3">
                        {tekst('sykepengesoknad.sykmelding-utdrag.forsikring')}
                    </Label>
                    <BodyShort>
                        {tekst(
                            forsikring
                                ? 'sykepengesoknad.sykmelding-utdrag.forsikring-ja'
                                : 'sykepengesoknad.sykmelding-utdrag.forsikring-nei',
                        )}
                    </BodyShort>
                </section>
            )}
        />
    )
}

export default ForsikringInfo
