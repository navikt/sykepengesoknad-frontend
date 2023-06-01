import React from 'react'
import { Label } from '@navikt/ds-react'

import { Sporsmal } from '../../../types/types'
import SporsmalSwitch from '../sporsmal-switch'
import { TagTyper } from '../../../types/enums'

import { UndersporsmalTekster } from './undersporsmal-tekster'

interface UndersporsmalListeProps {
    oversporsmal: Sporsmal
    oversporsmalSvar?: string
}

const UndersporsmalListe = ({ oversporsmal, oversporsmalSvar }: UndersporsmalListeProps) => {
    const skalVise =
        (!oversporsmal.kriterieForVisningAvUndersporsmal ||
            oversporsmal.kriterieForVisningAvUndersporsmal === oversporsmalSvar) &&
        oversporsmal.undersporsmal.length > 0
    if (!skalVise) return null
    return (
        <div className="mt-4">
            {oversporsmal.tag == TagTyper.UTENLANDSK_SYKMELDING_BOSTED && (
                <Label as="h2" className="mt-8">
                    {UndersporsmalTekster['undersporsmal.UTENLANDSK_SYKMELDING_BOSTED']}
                </Label>
            )}
            {oversporsmal.undersporsmal
                .map((underspm: Sporsmal, idx: number) => <SporsmalSwitch key={idx} sporsmal={underspm} />)
                .filter((underspm: any) => underspm !== null)}
        </div>
    )
}

export default UndersporsmalListe
