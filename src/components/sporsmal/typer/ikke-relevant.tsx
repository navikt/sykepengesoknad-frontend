import { BodyLong, Label } from '@navikt/ds-react'
import React from 'react'

import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { TagTyper } from '../../../types/enums'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

const skalHaUndersporsmal = [
    TagTyper.MEDLEMSKAP_OPPHOLD_UTENFOR_EOS_PERIODE,
    TagTyper.MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE_PERIODE,
    TagTyper.MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE_PERIODE,
]
const IkkeRelevant = ({ sporsmal }: SpmProps) => {
    if (!skalHaUndersporsmal.includes(sporsmal.tag)) {
        return (
            <div className="mt-4 rounded-md border border-gray-600 p-4">
                <Label as="h2" className="mb-4">
                    {sporsmal.sporsmalstekst}
                </Label>
                {sporsmal.undertekst && <BodyLong as="div">{parserWithReplace(sporsmal.undertekst)}</BodyLong>}
            </div>
        )
    }
    return (
        <div aria-live="assertive">
            <UndersporsmalListe oversporsmal={sporsmal} />
        </div>
    )
}

export default IkkeRelevant
