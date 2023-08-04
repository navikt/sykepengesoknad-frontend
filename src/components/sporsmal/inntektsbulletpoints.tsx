import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'
import { InformationIcon } from '@navikt/aksel-icons'
import { CheckmarkCircleIcon } from '@navikt/aksel-icons'

import { TagTyper } from '../../types/enums'
import { Soknad, Sporsmal } from '../../types/types'

export const Inntektsbulletpoints = ({ sporsmal, soknad }: { sporsmal: Sporsmal; soknad: Soknad }) => {
    if (!skalHaInntektsbulletpoints(sporsmal, soknad)) return null

    return (
        <>
            <div className="flex max-w-sm gap-4 rounded-lg bg-gray-50 p-4 py-6">
                <InformationIcon
                    title="informasjon"
                    className="m-width-[37px] m-height-[37px] flex-shrink-0 rounded-full bg-gray-200 text-xl font-bold"
                    height={37}
                    width={37}
                />
                <BodyShort size="small">
                    Informasjon om andre arbeidsforhold blir behandlet konfidensielt, og blir ikke delt med arbeidsgiver
                </BodyShort>
            </div>
            <Label as="p" className="mb-4 mt-10">
                Arbeidsforhold vi har registrert på deg:
            </Label>

            <ul data-cy="inntektskilder--fra-inntektskomponenten-liste" className="mb-10">
                <li className="mb-4 flex max-w-sm gap-4 rounded-lg bg-gray-50 p-4 py-6 ">
                    <CheckmarkCircleIcon
                        title="a11y-title"
                        className="m-width-[24px] m-height-[24px] pt1 flex-shrink-0 text-xl font-bold"
                        height={24}
                        width={24} // padding top for the icon
                    />{' '}
                    <BodyShort className="">{soknad.arbeidsgiver?.navn}</BodyShort>
                </li>

                {soknad.inntektskilderDataFraInntektskomponenten?.map((inntektskilde, index) => (
                    <div key={index}>
                        <BodyShort as="li" className="mb-4 ">
                            {inntektskilde.navn}
                        </BodyShort>
                    </div>
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
