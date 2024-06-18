import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'
import { CheckmarkCircleIcon } from '@navikt/aksel-icons'
import dayjs from 'dayjs'

import { Soknad } from '../../types/types'

export const KjentOppholdstillatelse = ({ soknad }: { soknad: Soknad }) => {
    if (soknad.kjentOppholdstillatelse?.fom === null && soknad.kjentOppholdstillatelse?.tom === null) {
        return null
    }

    const fomDato = dayjs(soknad.kjentOppholdstillatelse?.fom).format('YYYY-MM-DD')
    const tomDato = soknad.kjentOppholdstillatelse?.tom
        ? dayjs(soknad.kjentOppholdstillatelse?.tom).format('YYYY-MM-DD')
        : null

    const tekst =
        tomDato === null
            ? `Permanent oppholdstillatelse fra ${fomDato}.`
            : `Midlertidig oppholdstillatelse fra ${fomDato} til ${tomDato}`

    return (
        <>
            <Label as="p" className="mb-4 mt-10">
                Kjent oppholdstillatelse:
            </Label>
            <ul data-cy="medlemskap--kjent-oppholdstillatelse" className="mb-10">
                <ListItemWithIcon content={tekst} />
            </ul>
        </>
    )
}

export const Inntektsbulletpoints = ({ soknad }: { soknad: Soknad }) => {
    return (
        <>
            <Label as="p" className="mb-4 mt-10">
                Arbeidsforhold vi har registrert på deg:
            </Label>

            <ul data-cy="inntektskilder--fra-inntektskomponenten-liste" className="mb-10">
                <ListItemWithIcon content={soknad.arbeidsgiver!.navn} />
                {soknad.inntektskilderDataFraInntektskomponenten?.map((inntektskilde, index) => (
                    <ListItemWithIcon key={index} content={inntektskilde.navn} />
                ))}
            </ul>
        </>
    )
}

const ListItemWithIcon = ({ content }: { content: string }) => (
    <li className="mb-4 flex w-full md:max-w-[320px] items-center gap-4 rounded-lg bg-gray-50 p-2 min-h-[48px]">
        <CheckmarkCircleIcon
            title="a11y-title"
            className="m-width-[24px] m-height-[24px] pt1  text-xl font-bold shrink-0"
            height={24}
            width={24}
        />
        <BodyShort className="">{content}</BodyShort>
    </li>
)
