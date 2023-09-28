import { BodyLong, Label } from '@navikt/ds-react'
import React from 'react'

import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { Sporsmal } from '../../../types/types'

interface IkkeRelevantProps {
    sporsmal: Sporsmal
    sporsmalIndex: number
    erSisteSporsmal: boolean
}

const Kulepunkter = ({ sporsmal }: IkkeRelevantProps) => {
    return (
        <div className="mt-4 rounded-md border border-gray-600 p-4">
            <Label as="h2" className="mb-4">
                {sporsmal.sporsmalstekst}
            </Label>

            {/* json stringify the sporsmal, make it pretty formatted */}
            {/*{ <pre>{JSON.stringify(sporsmal, null, 2)}</pre> }*/}

            {/* map trough the svarliste of sporsmal and display the items as separate divs */}
            {/* take svar.verdi and parse it with         "html-react-parser": "^4.2.2",
             */}
            <ul>
                {sporsmal.svarliste.svar.map((svar, index) => (
                    <li key={index}> {parserWithReplace(svar.verdi)} </li>
                ))}
            </ul>

            {sporsmal.undertekst && <BodyLong as="div">{parserWithReplace(sporsmal.undertekst)}</BodyLong>}
            <UndersporsmalListe oversporsmal={sporsmal} />
        </div>
    )
}

export default Kulepunkter
