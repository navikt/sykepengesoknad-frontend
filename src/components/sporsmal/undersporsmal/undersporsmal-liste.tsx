import { Label } from '@navikt/ds-react'

import { Sporsmal } from '../../../types/types'
import SporsmalSwitch from '../sporsmal-switch'

import { tekstMap } from './undersporsmal-tekster'

interface UndersporsmalListeProps {
    oversporsmal: Sporsmal
    oversporsmalSvar?: string
}

const UndersporsmalListe = ({ oversporsmal, oversporsmalSvar }: UndersporsmalListeProps) => {
    const { kriterieForVisningAvUndersporsmal, undersporsmal, tag } = oversporsmal
    const skalVise =
        (!kriterieForVisningAvUndersporsmal || kriterieForVisningAvUndersporsmal === oversporsmalSvar) &&
        undersporsmal.length > 0
    if (!skalVise) return null

    const validUndersporsmal = undersporsmal
        .filter((underspm: any) => underspm !== null)
        .map((underspm: Sporsmal, idx: number) => <SporsmalSwitch key={idx} sporsmal={underspm} />)

    return (
        <div className="mt-4">
            {tekstMap[tag] && (
                <Label as="h2" className="mt-8">
                    {tekstMap[tag]}
                </Label>
            )}

            {validUndersporsmal}
        </div>
    )
}

export default UndersporsmalListe
