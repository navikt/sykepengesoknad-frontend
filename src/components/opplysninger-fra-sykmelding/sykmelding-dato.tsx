import { BodyShort, Label } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'

import { tekst } from '../../utils/tekster'
import { Sykmelding } from '../../types/sykmelding'

interface SykmeldingDatoProps {
    valgtSykmelding: Sykmelding
}

const SykmeldingDato = ({ valgtSykmelding }: SykmeldingDatoProps) => {
    return (
        <div className="avsnitt">
            <Label size="small" as="h3" className="avsnitt-hode">
                {tekst('sykepengesoknad.sykmelding-utdrag.dato-sykmeldingen-ble-skrevet')}
            </Label>
            <BodyShort>{dayjs(valgtSykmelding.behandletTidspunkt).format('D. MMM YYYY')}</BodyShort>
        </div>
    )
}

export default SykmeldingDato
