import { Label, BodyLong } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import VaerKlarOverAtTekster from '../vaer-klar-over-at-tekster'

const Kulepunkter = ({ sporsmal }: SpmProps) => {
    const { setValue } = useFormContext()
    const kulepunkterTekster = Object.values(VaerKlarOverAtTekster)

    useEffect(() => {
        kulepunkterTekster.forEach((tekst, index) => {
            setValue(`kulepunkt-${index}`, tekst)
        })
    }, [kulepunkterTekster, setValue])
    return (
        <div className="mt-4 rounded-md border border-gray-600 p-4">
            <Label as="h2" className="mb-4">
                {sporsmal.sporsmalstekst}
            </Label>
            <ul>
                {kulepunkterTekster.map((tekst, index) => (
                    <li key={index}> {parserWithReplace(tekst)} </li>
                ))}
            </ul>

            {sporsmal.undertekst && <BodyLong as="div">{parserWithReplace(sporsmal.undertekst)}</BodyLong>}
            <UndersporsmalListe oversporsmal={sporsmal} />
        </div>
    )
}

export default Kulepunkter
