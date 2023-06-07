import { Label } from '@navikt/ds-react'
import React from 'react'

import { RSSvar } from '../../../types/rs-types/rs-svar'
import { tilLesbarDatoUtenAarstall, tilLesbarPeriodeUtenArstall } from '../../../utils/dato-utils'
import Vis from '../../vis'
import { OppsummeringProps } from '../oppsummering'

import Avkrysset from './avkrysset'

const datoEllerIkkeTilBehandling = (svar: RSSvar): string => {
    if (svar === undefined || svar.verdi === '' || svar.verdi === 'Ikke til behandling') {
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
                    <>
                        <Label as="h3" className="mb-2">
                            {sporsmal.sporsmalstekst}
                        </Label>
                        <Vis
                            hvis={sporsmal.undersporsmal.length > 0}
                            render={() => (
                                <>
                                    {sporsmal.undersporsmal.map((uspm, idx) => (
                                        <div data-cy="oppsummering__behandlingsdager" key={idx}>
                                            <Label as="h3" className="mb-2">
                                                {tilLesbarPeriodeUtenArstall(uspm.min, uspm.max)}
                                            </Label>
                                            <Avkrysset tekst={datoEllerIkkeTilBehandling(uspm.svarliste.svar[0])} />
                                        </div>
                                    ))}
                                </>
                            )}
                        />
                    </>
                )}
            />
        </>
    )
}

export default Behandlingsdager
