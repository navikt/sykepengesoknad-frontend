import { BodyShort } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'

import { RSMottaker } from '../../../types/rs-types/rs-mottaker'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { Soknad } from '../../../types/types'
import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import useMottakerSoknad from '../../../hooks/useMottakerSoknad'

export default function SendesTil({ soknad }: { soknad: Soknad }) {
    const [nokkel, setNokkel] = useState<string>()
    const { data: mottaker } = useMottakerSoknad(soknad.id)

    useEffect(() => {
        if (mottaker === RSMottaker.ARBEIDSGIVER) {
            setNokkel('sykepengesoknad.oppsummering.arbeidsgiver-som-mottaker')
        }
        if (mottaker === RSMottaker.NAV) {
            setNokkel('sykepengesoknad.oppsummering.nav-som-mottaker')
        }
        if (mottaker === RSMottaker.ARBEIDSGIVER_OG_NAV) {
            setNokkel('sykepengesoknad.oppsummering.nav-arbeidsgiver-som-mottaker')
        }
    }, [mottaker])

    if (!mottaker || !nokkel || soknad.arbeidssituasjon !== 'ARBEIDSTAKER') {
        return null
    }

    return (
        <BodyShort as="div" className="mt-8 border-t border-gray-400 py-8 text-left">
            {soknad.arbeidsgiver !== undefined
                ? parserWithReplace(
                      getLedetekst(tekst(nokkel as any), {
                          '%ARBEIDSGIVER%': soknad.arbeidsgiver.navn,
                      }),
                  )
                : parserWithReplace(tekst(nokkel as any))}
        </BodyShort>
    )
}
