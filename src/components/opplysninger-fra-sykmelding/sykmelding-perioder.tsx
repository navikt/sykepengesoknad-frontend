import { BodyShort, GuidePanel, Label } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'
import parser from 'html-react-parser'

import { Periode, Sykmelding } from '../../types/sykmelding'
import { getDuration } from '../../utils/dato-utils'
import { erOppdelt } from '../../utils/periode-utils'
import { sorterEtterEldsteTom } from '../../utils/sykmelding-utils'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'
import { Soknad } from '../../types/types'
import { useWindowSize } from '../../utils/useWindowSize'

interface SykmeldingPerioderProps {
    valgtSoknad: Soknad
    valgtSykmelding: Sykmelding
}

const SykmeldingPerioder = ({ valgtSoknad, valgtSykmelding }: SykmeldingPerioderProps) => {
    const sortertePerioder = valgtSykmelding.sykmeldingsperioder.sort(sorterEtterEldsteTom) || []
    const { mobile } = useWindowSize()

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
        <div className="sykmelding-perioder">
            {sortertePerioder.map((periode: Periode, index: number) => {
                const fom = dayjs(periode.fom).format('D. MMM')
                const tom = dayjs(periode.tom).format('D. MMM YYYY')
                const dager = getDuration(periode.fom, periode.tom)

                return (
                    <div className="avsnitt" key={index}>
                        <Label size="small" as="h3" className="avsnitt-hode">
                            {tekst('din-sykmelding.periode.tittel')}
                        </Label>

                        <BodyShort>
                            <strong>
                                {fom} - {tom}
                            </strong>{' '}
                            &bull; {dager} dager
                        </BodyShort>

                        <BodyShort>{hentPeriodeTekst(periode)}</BodyShort>

                        <Vis
                            hvis={periode.gradert?.reisetilskudd}
                            render={() => (
                                <>
                                    <img
                                        style={{ width: 16, height: 16 }}
                                        src={'/syk/sykepengesoknad/static/check-box-1.png'}
                                        alt="Avkrysset"
                                    />
                                    <BodyShort as="span">
                                        {' Kan være i delvis arbeid ved bruk av reisetilskudd'}
                                    </BodyShort>
                                </>
                            )}
                        />
                    </div>
                )
            })}
            {erOppdelt(valgtSoknad, valgtSykmelding) && (
                <GuidePanel poster={mobile == true}>
                    <BodyShort>{parser(tekst('sykepengesoknad.sykmelding-utdrag.oppdelt.bjorn'))}</BodyShort>
                </GuidePanel>
            )}
        </div>
    )
}

export default SykmeldingPerioder
