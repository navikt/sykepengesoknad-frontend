import { Label } from '@navikt/ds-react'
import React from 'react'

import { Sporsmal } from '../../types/types'

export const NyttArbeidsforhold = ({ spm }: { spm: Sporsmal }) => {
    if (!spm.metadata?.arbeidsstedNavn) {
        return null
    }
    return (
        <>
            <Label as="p" className="mb-4">
                Vi har funnet et nytt arbeidsforhold:
            </Label>
            <GraaBoks tekst={spm.metadata?.arbeidsstedNavn as string} />
        </>
    )
}

function GraaBoks(props: { tekst: string }) {
    return (
        <Label as="p" className="bg-bg-subtle p-4 mb-10 rounded-sm inline-block">
            {props.tekst}
        </Label>
    )
}
