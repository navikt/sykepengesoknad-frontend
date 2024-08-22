import { GuidePanel } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { SpmProps } from '../sporsmal-form/sporsmal-form'
import Oppsummering from '../../oppsummering/oppsummering'

const Oppsummeringsside = ({ sporsmal }: SpmProps) => {
    const { setValue } = useFormContext()
    useEffect(() => {
        setValue(sporsmal.id, true)
    }, [setValue, sporsmal.id])

    return (
        <>
            <GuidePanel poster>
                Nå kan du se over at alt er riktig før du sender inn søknaden. Ved behov kan du endre opplysningene
                inntil 12 måneder etter innsending.
            </GuidePanel>
            <Oppsummering />
        </>
    )
}

export default Oppsummeringsside
