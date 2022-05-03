import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import { hentPeriode } from '../../sporsmal/hent-svar'
import Vis from '../../vis'
import { OppsummeringProps } from '../oppsummering'

const PerioderSum = ({ sporsmal }: OppsummeringProps) => {
    return (
        <div className="oppsummering__sporsmal">
            <Label as="h3">{sporsmal.sporsmalstekst}</Label>
            <div className="oppsummering__tekstsvar">
                {sporsmal.svarliste.svar.map((p, i) => {
                    const periode = hentPeriode(sporsmal, i)
                    return (
                        <Vis
                            hvis={p.verdi}
                            key={i}
                            render={() => (
                                <BodyShort className="oppsummering__dato">
                                    {tilLesbarPeriodeMedArstall(
                                        periode.fom,
                                        periode.tom
                                    )}
                                </BodyShort>
                            )}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default PerioderSum
