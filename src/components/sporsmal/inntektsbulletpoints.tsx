import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'
import { CheckmarkCircleIcon } from '@navikt/aksel-icons'

import { TagTyper } from '../../types/enums'
import { Soknad, Sporsmal } from '../../types/types'

export const Inntektsbulletpoints = ({ sporsmal, soknad }: { sporsmal: Sporsmal; soknad: Soknad }) => {
    if (!skalHaInntektsbulletpoints(sporsmal, soknad)) return null

    interface ListItemWithIconProps {
        content: string | null | undefined
    }

    const ListItemWithIcon = ({ content }: ListItemWithIconProps) => (
        <li className="mb-4 flex max-w-sm gap-4 rounded-lg bg-gray-50 p-4 py-6 ">
            <CheckmarkCircleIcon
                title="a11y-title"
                className="m-width-[24px] m-height-[24px] pt1 flex-shrink-0 text-xl font-bold"
                height={24}
                width={24}
            />
            <BodyShort className="">{content}</BodyShort>
        </li>
    )

    return (
        <>
            <Label as="p" className="mb-4 mt-10">
                Arbeidsforhold vi har registrert på deg:
            </Label>

            <ul data-cy="inntektskilder--fra-inntektskomponenten-liste" className="mb-10">
                <ListItemWithIcon content={soknad.arbeidsgiver?.navn} />
                {soknad.inntektskilderDataFraInntektskomponenten?.map((inntektskilde, index) => (
                    <ListItemWithIcon key={index} content={inntektskilde.navn} />
                ))}
            </ul>
        </>
    )
}

export function skalHaInntektsbulletpoints(sporsmal: Sporsmal, soknad: Soknad) {
    return (
        sporsmal.tag === TagTyper.ANDRE_INNTEKTSKILDER_V2 &&
        typeof soknad.inntektskilderDataFraInntektskomponenten !== 'undefined' &&
        soknad.inntektskilderDataFraInntektskomponenten !== null
    )
}
