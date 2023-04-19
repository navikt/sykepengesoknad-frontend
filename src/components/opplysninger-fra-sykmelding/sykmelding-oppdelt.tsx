import React from 'react'
import { BodyShort, Label } from '@navikt/ds-react'

import { Sykmelding } from '../../types/sykmelding'
import { erOppdelt } from '../../utils/periode-utils'
import { Soknad } from '../../types/types'
import { tekst } from '../../utils/tekster'

interface SykmeldingOppdeltProps {
    valgtSykmelding: Sykmelding
    valgtSoknad: Soknad
}

const SykmeldingOppdelt = ({ valgtSykmelding, valgtSoknad }: SykmeldingOppdeltProps) => {
    const oppdelt = erOppdelt(valgtSoknad, valgtSykmelding)

    if (valgtSoknad.klippet || !oppdelt) {
        return null
    }

    return (
        <>
            <Label size="small" as="h3" className="mt-4">
                {tekst('sykmelding.oppdelt.tittel')}
            </Label>
            <BodyShort>{tekst('sykmelding.oppdelt.info')}</BodyShort>
        </>
    )
}

export default SykmeldingOppdelt
