import { Label } from '@navikt/ds-react'
import React from 'react'

import { RSSvar } from '../../../types/rs-types/rs-svar'
import {
    tilLesbarDatoUtenAarstall,
    tilLesbarPeriodeUtenArstall,
} from '../../../utils/dato-utils'
import Vis from '../../vis'
import { OppsummeringProps } from '../oppsummering'
import Avkrysset from './avkrysset'

const datoEllerIkkeTilBehandling = (svar: RSSvar): string => {
    if (
        svar === undefined ||
        svar.verdi === '' ||
        svar.verdi === 'Ikke til behandling'
    ) {
        return 'Ikke til behandling'
    }
    return tilLesbarDatoUtenAarstall(svar.verdi)
}

const Behandlingsdager = ({ sporsmal }: OppsummeringProps) => {
    return (
        <>
            <Vis
                hvis={sporsmal.undersporsmal}
                render={() => (
                    <div className="oppsummering__sporsmal">
                        <Label as="h3">{sporsmal.sporsmalstekst}</Label>
                        <Vis
                            hvis={sporsmal.undersporsmal.length > 0}
                            render={() => (
                                <div className="oppsummering__undersporsmalsliste">
                                    {sporsmal.undersporsmal.map((uspm, idx) => {
                                        return (
                                            <div
                                                className="oppsummering__sporsmal"
                                                key={idx}
                                            >
                                                <Label as="h3">
                                                    {tilLesbarPeriodeUtenArstall(
                                                        uspm.min,
                                                        uspm.max
                                                    )}
                                                </Label>
                                                <div className="oppsummering__tekstsvar oppsummering__dato">
                                                    <Avkrysset
                                                        tekst={datoEllerIkkeTilBehandling(
                                                            uspm.svarliste
                                                                .svar[0]
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        />
                    </div>
                )}
            />
        </>
    )
}

export default Behandlingsdager
