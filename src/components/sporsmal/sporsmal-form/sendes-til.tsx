import { BodyShort } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { RSMottaker } from '../../../types/rs-types/rs-mottaker'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { Soknad } from '../../../types/types'
import { parserWithReplace } from '../../../utils/html-react-parser-utils'

export interface SendesTilProps {
    soknad?: Soknad
}

const SendesTil = ({ soknad }: SendesTilProps) => {
    const { mottaker } = useAppStore()
    const [nokkel, setNokkel] = useState<string>()

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

        // eslint-disable-next-line
    }, [mottaker])

    if (!mottaker || !nokkel || soknad?.arbeidssituasjon !== 'ARBEIDSTAKER') {
        return null
    }

    return (
        <div className="bottom_line">
            <BodyShort as="div">
                {soknad.arbeidsgiver !== undefined
                    ? parserWithReplace(
                          getLedetekst(tekst(nokkel as any), {
                              '%ARBEIDSGIVER%': soknad.arbeidsgiver.navn,
                          }),
                      )
                    : parserWithReplace(tekst(nokkel as any))}
            </BodyShort>
        </div>
    )
}

export default SendesTil
