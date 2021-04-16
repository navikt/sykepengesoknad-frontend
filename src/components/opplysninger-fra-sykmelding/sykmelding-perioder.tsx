import dayjs from 'dayjs'
import { Normaltekst, UndertekstBold } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { SykmeldingPeriode } from '../../types/types'
import { getDuration } from '../../utils/dato-utils'
import { erOppdelt } from '../../utils/periode-utils'
import { sorterPerioderEldsteFoerst } from '../../utils/sykmelding-utils'
import { tekst } from '../../utils/tekster'
import Bjorn from '../sporsmal/bjorn/bjorn'
import VisBlock from '../vis-block'

const SykmeldingPerioder = () => {
    const { valgtSoknad, valgtSykmelding } = useAppStore()

    if (!valgtSykmelding) {
        return null
    }

    return (
        <div className="sykmelding-perioder">
            {sorterPerioderEldsteFoerst(valgtSykmelding.mulighetForArbeid.perioder).map((periode: SykmeldingPeriode, index: number) => {
                const fom = dayjs(periode.fom).format('D. MMM')
                const tom = dayjs(periode.tom).format('D. MMM YYYY')
                const dager = getDuration(new Date(periode.fom), new Date(periode.tom)) + ' dager'

                return (
                    <div className="avsnitt" key={index}>
                        <UndertekstBold tag="h3" className="avsnitt-hode">
                            {tekst('din-sykmelding.periode.tittel')}
                        </UndertekstBold>
                        <Normaltekst><strong>{fom} - {tom}</strong> &bull; {dager}</Normaltekst>

                        <VisBlock hvis={periode.grad}
                            render={() => {
                                return (
                                    <Normaltekst>
                                        {periode.grad} {tekst('din-sykmelding.periode.prosent-sykmeldt')}
                                    </Normaltekst>
                                )
                            }}
                        />

                        <VisBlock hvis={periode.behandlingsdager}
                            render={() => {
                                return (
                                    <Normaltekst>
                                        <VisBlock hvis={periode.behandlingsdager! > 1}
                                            render={() => {
                                                return <>
                                                    {periode.behandlingsdager}
                                                    {' '}
                                                    {tekst('din-sykmelding.periode.behandlingsdager')}
                                                </>
                                            }}
                                        />
                                        <VisBlock hvis={periode.behandlingsdager! === 1}
                                            render={() => <>{tekst('din-sykmelding.periode.behandlingsdag')}</>}
                                        />
                                    </Normaltekst>
                                )
                            }}
                        />
                    </div>
                )
            })}
            <VisBlock hvis={erOppdelt(valgtSoknad!, valgtSykmelding)}
                render={() => <Bjorn nokkel="sykepengesoknad.sykmelding-utdrag.oppdelt.bjorn" />}
            />
        </div>
    )
}

export default SykmeldingPerioder
