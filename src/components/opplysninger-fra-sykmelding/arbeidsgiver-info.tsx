import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../utils/tekster'
import { Soknad } from '../../types/types'

interface ArbeidsgiverInfoProps {
    valgtSoknad: Soknad
}

const ArbeidsgiverInfo = ({ valgtSoknad }: ArbeidsgiverInfoProps) => {
    return (
        <>
            {valgtSoknad.arbeidsgiver && (
                <section className="mt-8">
                    <Label size="small" as="h3">
                        {tekst('sykepengesoknad.sykmelding-utdrag.arbeidsgiver')}
                    </Label>
                    <BodyShort>{valgtSoknad.arbeidsgiver!.navn}</BodyShort>
                </section>
            )}
        </>
    )
}

export default ArbeidsgiverInfo
