import { BodyShort, Label } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'

import { Periode, Sykmelding } from '../../types/sykmelding'
import { getDuration } from '../../utils/dato-utils'
import { sorterEtterEldsteTom } from '../../utils/sykmelding-utils'
import { tekst } from '../../utils/tekster'

interface SykmeldingPerioderProps {
    valgtSykmelding: Sykmelding
}

const SykmeldingPerioder = ({ valgtSykmelding }: SykmeldingPerioderProps) => {
    const sortertePerioder = valgtSykmelding.sykmeldingsperioder.sort(sorterEtterEldsteTom) || []

    const hentPeriodeTekst = (periode: Periode) => {
        switch (periode.type) {
            case 'AVVENTENDE':
                return 'Avventende sykmelding'
            case 'AKTIVITET_IKKE_MULIG':
                return '100% sykmeldt'
            case 'GRADERT':
                return `${periode.gradert?.grad}% sykmeldt`
            case 'REISETILSKUDD':
                return 'Reisetilskudd'
            case 'BEHANDLINGSDAGER':
                if (periode.behandlingsdager! > 1) {
                    return `${periode.behandlingsdager} behandlingsdager`
                }
                return '1 behandlingsdag'
            default:
                return ''
        }
    }

    return (
        <section>
            {sortertePerioder.map((periode: Periode, index: number) => {
                const fom = dayjs(periode.fom).format('D. MMM')
                const tom = dayjs(periode.tom).format('D. MMM YYYY')
                const dager = getDuration(periode.fom, periode.tom)

                return (
                    <div key={index} className="mb-4">
                        <Label size="small" as="h3">
                            {tekst('din-sykmelding.periode.tittel')}
                        </Label>

                        <BodyShort weight="semibold" size="small">
                            {fom} - {tom} ({dager} dager)
                        </BodyShort>

                        <BodyShort>{hentPeriodeTekst(periode)}</BodyShort>

                        {periode.gradert?.reisetilskudd && (
                            <>
                                <img
                                    style={{ width: 16, height: 16 }}
                                    src="/syk/sykepengesoknad/static/check-box-1.png"
                                    alt="Avkrysset"
                                    aria-hidden={true}
                                    className="mb-1 mr-2 inline"
                                />
                                <BodyShort as="span">{tekst('din-sykmelding.periode.gradertreisetilskudd')}</BodyShort>
                            </>
                        )}
                    </div>
                )
            })}
        </section>
    )
}

export default SykmeldingPerioder
