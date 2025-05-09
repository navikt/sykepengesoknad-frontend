import { BodyShort } from '@navikt/ds-react'
import React from 'react'
import { InformationIcon } from '@navikt/aksel-icons'

export const InntektsopplysningerErKonfidensielleInfo = () => {
    return (
        <div className="mt-4 flex max-w-sm gap-4 rounded-lg py-6">
            <InformationIcon
                title="informasjon"
                className="shrink-0 rounded-full bg-gray-200 p-2 text-sm font-bold"
                height={37}
                width={37}
            />
            <BodyShort size="small">
                Informasjon om andre inntektskilder blir behandlet konfidensielt, og blir ikke delt med arbeidsgiver
            </BodyShort>
        </div>
    )
}
