import { Heading, Skeleton } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../utils/tekster'
import { UseSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { Soknad } from '../../types/types'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { erSisteSide, fjernIndexFraTag } from '../sporsmal/sporsmal-utils'

export const SporsmalTittel = () => {
    const { valgtSoknad, erUtenlandssoknad, stegNo } = UseSoknadMedDetaljer()

    function tittel() {
        if (valgtSoknad) return tekst(hentNokkel(valgtSoknad!, stegNo) as any)
        return 'placeholder'
    }

    if (stegNo !== 1 && !erUtenlandssoknad)
        return (
            <Heading
                as={valgtSoknad ? Heading : Skeleton}
                data-cy="sporsmal-tittel"
                level="2"
                size="medium"
                className="mb-4 mt-16"
            >
                {tittel()}
            </Heading>
        )
}

export const hentNokkel = (soknad: Soknad, sidenummer: number) => {
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
