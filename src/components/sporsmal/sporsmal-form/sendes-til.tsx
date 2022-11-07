import { BodyShort } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React, { useEffect, useState } from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { RSMottaker } from '../../../types/rs-types/rs-mottaker'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { Soknad } from '../../../types/types'

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
                    ? parser(
                          getLedetekst(tekst(nokkel as any), {
                              '%ARBEIDSGIVER%': soknad.arbeidsgiver.navn,
                          }),
                      )
                    : parser(tekst(nokkel as any))}
            </BodyShort>
        </div>
    )
}

export default SendesTil
