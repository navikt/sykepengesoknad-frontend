import dayjs from 'dayjs'
import { Normaltekst, UndertekstBold } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { Periode } from '../../types/sykmelding'
import { getDuration } from '../../utils/dato-utils'
import { erOppdelt } from '../../utils/periode-utils'
import { sorterEtterEldsteTom } from '../../utils/sykmelding-utils'
import { tekst } from '../../utils/tekster'
import Bjorn from '../sporsmal/bjorn/bjorn'
import Vis from '../vis'

const SykmeldingPerioder = () => {
    const { valgtSoknad, valgtSykmelding } = useAppStore()

    const sortertePerioder = valgtSykmelding?.sykmeldingsperioder.sort(sorterEtterEldsteTom) || []

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
                        <UndertekstBold tag="h3" className="avsnitt-hode">
                            {tekst('din-sykmelding.periode.tittel')}
                        </UndertekstBold>

                        <Normaltekst>
                            <strong>{fom} - {tom}</strong> &bull; {dager} dager
                        </Normaltekst>

                        <Normaltekst>
                            {hentPeriodeTekst(periode)}
                        </Normaltekst>
                    </div>
                )
            })}
            <Vis hvis={erOppdelt(valgtSoknad, valgtSykmelding)}
                render={() =>
                    <Bjorn nokkel="sykepengesoknad.sykmelding-utdrag.oppdelt.bjorn" />
                }
            />
        </div>
    )
}

export default SykmeldingPerioder
