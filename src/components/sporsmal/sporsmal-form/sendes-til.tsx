import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import { RSMottaker } from '../../../types/rs-types/rs-mottaker'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { Soknad } from '../../../types/types'
import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import useMottakerSoknad from '../../../hooks/useMottakerSoknad'
import SoknadenTekster from '../../soknad/soknaden-tekster'

export default function SendesTil({ soknad }: { soknad: Soknad }) {
    const { data: mottaker } = useMottakerSoknad(soknad.id)

    let nokkel: keyof typeof SoknadenTekster | undefined
    if (mottaker === RSMottaker.ARBEIDSGIVER) {
        nokkel = 'sykepengesoknad.oppsummering.arbeidsgiver-som-mottaker'
    }
    if (mottaker === RSMottaker.NAV) {
        nokkel = 'sykepengesoknad.oppsummering.nav-som-mottaker'
    }
    if (mottaker === RSMottaker.ARBEIDSGIVER_OG_NAV) {
        nokkel = 'sykepengesoknad.oppsummering.nav-arbeidsgiver-som-mottaker'
    }

    if (!mottaker || !nokkel || soknad.arbeidssituasjon !== 'ARBEIDSTAKER') {
        return null
    }

    return (
        <BodyShort as="div" className="mb-8 text-left">
            {soknad.arbeidsgiver !== undefined
                ? parserWithReplace(
                      getLedetekst(tekst(nokkel), {
                          '%ARBEIDSGIVER%': soknad.arbeidsgiver.navn,
                      }),
                  )
                : parserWithReplace(tekst(nokkel))}
        </BodyShort>
    )
}
