import { BodyShort, Label } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'

import { Periode, Sykmelding } from '../../types/sykmelding'
import { getDuration } from '../../utils/dato-utils'
import { erOppdelt } from '../../utils/periode-utils'
import { sorterEtterEldsteTom } from '../../utils/sykmelding-utils'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'
import { Soknad } from '../../types/types'
import { ProgressivtGuidePanel } from '../guidepanel/ProgressivtGuidePanel'
import { parserWithReplace } from '../../utils/html-react-parser-utils'

interface SykmeldingPerioderProps {
    valgtSoknad: Soknad
    valgtSykmelding: Sykmelding
}

const SykmeldingPerioder = ({ valgtSoknad, valgtSykmelding }: SykmeldingPerioderProps) => {
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

                        <Label size="small">
                            {fom} - {tom} ({dager} dager)
                        </Label>

                        <BodyShort>{hentPeriodeTekst(periode)}</BodyShort>

                        <Vis
                            hvis={periode.gradert?.reisetilskudd}
                            render={() => (
                                <>
                                    <img
                                        style={{ width: 16, height: 16 }}
                                        src={'/syk/sykepengesoknad/static/check-box-1.png'}
                                        alt="Avkrysset"
                                        aria-hidden={true}
                                    />
                                    <BodyShort as="span">
                                        {tekst('din-sykmelding.periode.gradertreisetilskudd')}
                                    </BodyShort>
                                </>
                            )}
                        />
                    </div>
                )
            })}
            {erOppdelt(valgtSoknad, valgtSykmelding) && (
                <ProgressivtGuidePanel>
                    <BodyShort>{parserWithReplace(tekst('sykepengesoknad.sykmelding-utdrag.oppdelt.bjorn'))}</BodyShort>
                </ProgressivtGuidePanel>
            )}
        </section>
    )
}

export default SykmeldingPerioder
