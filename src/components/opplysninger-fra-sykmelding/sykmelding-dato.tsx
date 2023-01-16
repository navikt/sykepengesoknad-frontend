import { BodyShort, Label } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { tekst } from '../../utils/tekster'

const SykmeldingDato = () => {
    const { valgtSykmelding } = useAppStore()

    if (!valgtSykmelding) return null

    return (
        <div className="avsnitt">
            <Label size="small" as="h3" className="avsnitt-hode">
                {tekst('sykepengesoknad.sykmelding-utdrag.dato-sykmeldingen-ble-skrevet')}
            </Label>
            <BodyShort>{dayjs(valgtSykmelding!.behandletTidspunkt).format('D. MMM YYYY')}</BodyShort>
        </div>
    )
}

export default SykmeldingDato
