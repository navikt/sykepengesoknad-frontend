import { Heading, Skeleton } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../utils/tekster'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { Soknad } from '../../types/types'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { erSisteSide, fjernIndexFraTag } from '../sporsmal/sporsmal-utils'

export const SporsmalTittel = () => {
    const { valgtSoknad, stegNo } = useSoknadMedDetaljer()

    return (
        <Heading
            {...(valgtSoknad ? {} : { as: Skeleton })}
            level="2"
            size="medium"
            data-cy="sporsmal-tittel"
            className="mb-4 mt-16"
        >
            {valgtSoknad ? tekst(hentNokkel(valgtSoknad, stegNo) as any) : 'Placeholder'}
        </Heading>
    )
}

const hentNokkel = (soknad: Soknad, sidenummer: number) => {
    const sporsmal = soknad.sporsmal[sidenummer - 1]
    if (sporsmal === undefined) {
        return ''
    }
    if (sidenummer === 1 && soknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND) {
        return 'sykepengesoknad.start.tittel'
    }
    const nokkel = fjernIndexFraTag(sporsmal.tag).toLowerCase()
    return erSisteSide(soknad, sidenummer) ? 'sykepengesoknad.til-slutt.tittel' : `sykepengesoknad.${nokkel}.tittel`
}
