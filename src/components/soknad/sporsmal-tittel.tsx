import { Heading, Skeleton } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../utils/tekster'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { Soknad, Sporsmal } from '../../types/types'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { erSisteSide } from '../sporsmal/sporsmal-utils'

export const SporsmalTittel = () => {
    const { valgtSoknad, stegNo, sporsmal } = useSoknadMedDetaljer()

    return (
        <Heading
            as={valgtSoknad && sporsmal ? 'h2' : Skeleton}
            level="2"
            size="medium"
            data-cy="sporsmal-tittel"
            className="mb-4 mt-16"
        >
            {valgtSoknad && sporsmal ? hentTekst(valgtSoknad, stegNo, sporsmal) : 'Placeholder'}
        </Heading>
    )
}

const hentTekst = (soknad: Soknad, sidenummer: number, sporsmal: Sporsmal) => {
    if (sidenummer === 1 && soknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND) {
        return tekst('sykepengesoknad.start.tittel')
    }
    const nokkel = sporsmal.tag.toLowerCase()
    return erSisteSide(soknad, sidenummer)
        ? tekst('sykepengesoknad.til-slutt.tittel')
        : tekst(`sykepengesoknad.${nokkel}.tittel` as any)
}
