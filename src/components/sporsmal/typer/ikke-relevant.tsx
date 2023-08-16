import { BodyLong, Label } from '@navikt/ds-react'
import React from 'react'

import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import { TagTyper } from '../../../types/enums'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { Sporsmal } from '../../../types/types'

interface IkkeRelevantProps {
    sporsmal: Sporsmal
    sporsmalIndex: number
}
const IkkeRelevant = ({ sporsmal, sporsmalIndex }: IkkeRelevantProps) => {
    const skalHaUndersporsmal = [
        TagTyper.MEDLEMSKAP_OPPHOLD_UTENFOR_EOS_GRUPPERING,
        TagTyper.MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE_GRUPPERING,
        TagTyper.MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE_GRUPPERING,
    ]

    if (skalHaUndersporsmal.includes(sporsmal.tag)) {
        return (
            <div
                className={sporsmalIndex! > 0 ? 'mt-8 border-t border-dashed border-gray-400' : ''}
                aria-live="assertive"
            >
                <UndersporsmalListe oversporsmal={sporsmal} />
            </div>
        )
    }
    return (
        <div className="mt-4 rounded-md border border-gray-600 p-4">
            <Label as="h2" className="mb-4">
                {sporsmal.sporsmalstekst}
            </Label>
            {sporsmal.undertekst && <BodyLong as="div">{parserWithReplace(sporsmal.undertekst)}</BodyLong>}
        </div>
    )
}

export default IkkeRelevant
