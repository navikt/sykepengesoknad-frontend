import React from 'react'

import { getSykmeldingStartDate, Sykmelding } from '../../types/sykmelding'
import { sykmeldingerUrl } from '../../utils/environment'
import { tallTilSpråk } from '../../utils/tallTilSpraak'
import { getLedetekst, tekst } from '../../utils/tekster'
import { AlertMedKnapp } from '../alert-med-knapp/alert-med-knapp'

interface UsendtSykmeldingProps {
    usendteSykmeldinger: Sykmelding[]
}

export const EldreUsendtSykmelding = ({
    usendteSykmeldinger,
}: UsendtSykmeldingProps) => {
    const sorterteUsendte = [...usendteSykmeldinger].sort((a, b) =>
        getSykmeldingStartDate(a).diff(getSykmeldingStartDate(b))
    )

    return (
        <AlertMedKnapp
            heading={tekst('eldre.usendt.header')}
            innhold={getLedetekst(tekst('eldre.usendt.sykmelding.alert'), {
                '%ANTALL%': tallTilSpråk(usendteSykmeldinger.length),
                '%FLERTALL%': usendteSykmeldinger.length > 1 ? 'er' : '',
            })}
            url={sykmeldingerUrl() + '/' + sorterteUsendte[0].id}
            knappeTekst={tekst('eldre.usendt.sykmelding.gaa-til-sykmeldingen')}
            komponent="usendt sykmelding"
        />
    )
}
