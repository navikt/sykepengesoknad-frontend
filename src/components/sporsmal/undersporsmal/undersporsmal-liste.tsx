import React from 'react'

import { Sporsmal } from '../../../types/types'
import Vis from '../../vis'
import SporsmalSwitch from '../sporsmal-switch'

interface UndersporsmalListeProps {
    oversporsmal: Sporsmal
    oversporsmalSvar?: string
}

const UndersporsmalListe = ({ oversporsmal, oversporsmalSvar }: UndersporsmalListeProps) => {
    return (
        <>{oversporsmal.undersporsmal.map((underspm: Sporsmal, idx: number) => {
            return (
                <Vis
                    hvis={
                        !oversporsmal.kriterieForVisningAvUndersporsmal ||
                        oversporsmal.kriterieForVisningAvUndersporsmal === oversporsmalSvar
                    }
                    key={idx}
                    render={() =>
                        <SporsmalSwitch sporsmal={underspm} />
                    }
                />
            )
        }).filter((underspm: any) => underspm !== null)}
        </>
    )
}

export default UndersporsmalListe

