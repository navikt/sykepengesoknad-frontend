import { BodyShort } from '@navikt/ds-react'
import React, { Fragment, ReactElement } from 'react'

export const SvaralternativCheckboxForklaring = ({
    svaralternativTag,
}: {
    svaralternativTag: string
}): ReactElement | null => {
    if (svaralternativTag === 'INNTEKTSKILDE_SELVSTENDIG') {
        return (
            <BodyShort className="text-gray-700 my-4">
                Dette betyr at du er selvstendig næringsdrivende. Du driver en bedrift for egen regning og risiko,
                leverer skattemelding for næringsdrivende, fakturerer kunder og (ofte) lever av overskuddet. Du er din
                egen sjef og ikke ansatt av andre i et arbeidsforhold.
            </BodyShort>
        )
    }

    if (svaralternativTag === 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD') {
        return (
            <BodyShort className="text-gray-700 my-4">
                Dette betyr at du er ansatt hos en eller flere arbeidsgiverne som ikke er kjent for oss enda og derfor
                ikke ligger i listen ovenfor.
            </BodyShort>
        )
    }

    return <Fragment />
}
