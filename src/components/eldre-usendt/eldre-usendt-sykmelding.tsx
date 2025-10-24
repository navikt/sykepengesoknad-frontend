import React from 'react'

import { getSykmeldingStartDate, Sykmelding } from '../../types/sykmelding'
import { sykmeldingerUrl } from '../../utils/environment'
import { tallTilSpråk } from '../../utils/tallTilSpraak'
import { getLedetekst, tekst } from '../../utils/tekster'

import { GuidepanelMedKnapp } from './guidepanel-med-knapp'

interface UsendtSykmeldingProps {
    usendteSykmeldinger: Sykmelding[]
}

export const EldreUsendtSykmelding = ({ usendteSykmeldinger }: UsendtSykmeldingProps) => {
    const sorterteUsendte = [...usendteSykmeldinger].sort((a, b) =>
        getSykmeldingStartDate(a).diff(getSykmeldingStartDate(b)),
    )

    const knappetekst = () => {
        if (usendteSykmeldinger.length == 1) {
            return tekst('eldre.usendt.sykmelding.gaa-til-sykmeldingen')
        }

        return tekst('eldre.usendt.sykmelding.gaa-til-sykmeldingene')
    }

    const flereSykmeldinger = usendteSykmeldinger.length > 1

    return (
        <GuidepanelMedKnapp
            heading={tekst('eldre.usendt.header')}
            innhold={getLedetekst(tekst('eldre.usendt.sykmelding.alert'), {
                '%ANTALL%': tallTilSpråk(usendteSykmeldinger.length),
                '%FLERTALL%': flereSykmeldinger ? 'er' : '',
            })}
            url={sykmeldingerUrl() + (flereSykmeldinger ? '' : '/' + sorterteUsendte[0].id)}
            knappeTekst={knappetekst()}
            komponent="eldre usendt sykmelding"
        />
    )
}
