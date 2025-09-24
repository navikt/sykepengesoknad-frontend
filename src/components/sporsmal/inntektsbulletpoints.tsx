import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'
import { CheckmarkCircleIcon } from '@navikt/aksel-icons'

import { KjentInntektskilde, Soknad, Sporsmal } from '../../types/types'

export const Inntektsbulletpoints = ({ soknad, sporsmal }: { soknad: Soknad; sporsmal: Sporsmal }) => {
    const navn: string[] = []
    if (sporsmal.metadata) {
        const items = sporsmal.metadata.kjenteInntektskilder as KjentInntektskilde[]
        items.forEach((item) => navn.push(item.navn))
    } else {
        navn.push(soknad.arbeidsgiver!.navn)
        soknad.inntektskilderDataFraInntektskomponenten?.forEach((inntektskilde) => navn.push(inntektskilde.navn))
    }

    return (
        <>
            <Label as="p" className="mb-4 mt-10">
                Arbeidsforhold vi har registrert på deg:
            </Label>

            <ul data-cy="inntektskilder--fra-inntektskomponenten-liste" className="mb-10">
                {navn?.map((n, index) => (
                    <ListItemWithIcon key={index} content={n} />
                ))}
            </ul>
        </>
    )
}

const ListItemWithIcon = ({ content }: { content: string }) => (
    <li className="mb-4 flex w-full md:max-w-[320px] items-center gap-4 rounded-lg bg-gray-50 p-2 min-h-[48px]">
        <CheckmarkCircleIcon
            className="m-width-[24px] m-height-[24px] pt1  text-xl font-bold shrink-0"
            height={24}
            width={24}
            aria-hidden="true"
            focusable="false"
            role="presentation"
        />
        <BodyShort>{content}</BodyShort>
    </li>
)
