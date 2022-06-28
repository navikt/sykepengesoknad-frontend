import React from 'react'

import { getSykmeldingStartDate, Sykmelding } from '../../types/sykmelding'
import { sykmeldingerUrl } from '../../utils/environment'
import { tallTilSpråk } from '../../utils/tallTilSpraak'
import { getLedetekst, tekst } from '../../utils/tekster'
import { AlertMedKnapp } from '../alert-med-knapp/alert-med-knapp'

interface UsendtSykmeldingProps {
    usendteSykmeldinger: Sykmelding[]
}

export const UsendtSykmelding = ({
    usendteSykmeldinger,
}: UsendtSykmeldingProps) => {
    const sorterteUsendte = [...usendteSykmeldinger].sort((a, b) =>
        getSykmeldingStartDate(a).diff(getSykmeldingStartDate(b))
    )

    return (
        <AlertMedKnapp
            heading={'Før du kan fylle ut søknaden'}
            innhold={getLedetekst(tekst('usendt.sykmelding.alert'), {
                '%ANTALL%': tallTilSpråk(usendteSykmeldinger.length),
                '%FLERTALL%': usendteSykmeldinger.length > 1 ? 'er' : '',
            })}
            url={sykmeldingerUrl() + '/' + sorterteUsendte[0].id}
            knappeTekst={tekst('usendt.sykmelding.gaa-til-sykmeldingen')}
            komponent="usendt sykmelding"
        />
    )
}
