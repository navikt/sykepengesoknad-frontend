import { BodyShort, Label } from '@navikt/ds-react'
import { format } from 'date-fns'
import { nb } from 'date-fns/locale/nb'
import React from 'react'

import { tekst } from '../../utils/tekster'
import { Sykmelding } from '../../types/sykmelding'

interface SykmeldingDatoProps {
    valgtSykmelding: Sykmelding
}

const SykmeldingDato = ({ valgtSykmelding }: SykmeldingDatoProps) => {
    return (
        <section className="mt-8">
            <Label size="small" as="h3">
                {tekst('sykepengesoknad.sykmelding-utdrag.dato-sykmeldingen-ble-skrevet')}
            </Label>
            <BodyShort>{format(valgtSykmelding.behandletTidspunkt, 'd. MMM yyyy', { locale: nb })}</BodyShort>
        </section>
    )
}

export default SykmeldingDato
