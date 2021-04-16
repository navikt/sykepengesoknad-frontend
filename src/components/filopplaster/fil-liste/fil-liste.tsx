import 'nav-frontend-tabell-style'
import './fil-liste.less'

import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'
import useForceUpdate from 'use-force-update'

import { useAppStore } from '../../../data/stores/app-store'
import { Kvittering, Sporsmal, UtgiftTyper } from '../../../types/types'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { formatterTall } from '../../../utils/utils'
import Slettknapp from '../../slettknapp/slettknapp'
import { hentSvar } from '../../sporsmal/hent-svar'
import VisBlock from '../../vis-block'

interface Props {
    sporsmal: Sporsmal,
    fjernKnapp?: boolean,
}

const FilListe = ({ sporsmal, fjernKnapp }: Props) => {
    const { setValgtKvittering, setOpenModal } = useAppStore()
    const kvitteringer = hentSvar(sporsmal)
    const forceUpdate = useForceUpdate()

    const update = () => {
        forceUpdate()
    }

    const visKvittering = (kvittering: Kvittering) => {
        setOpenModal(true)
        setValgtKvittering(kvittering)
    }

    const totaltBeløp = (): number => (kvitteringer
        ? kvitteringer
            .filter((kvittering: Kvittering) => kvittering.belop)
            .map((kvittering: Kvittering) => kvittering.belop!)
            .reduce((a: number, b: number) => a + b, 0.0)
        : (0.0)) / 100

    return (
        <VisBlock hvis={kvitteringer.length > 0}
            render={() => {
                return (
                    <Normaltekst tag="table" className="tabell tabell--stripet fil_liste">
                        <VisBlock hvis={fjernKnapp}
                            render={() => {
                                return (
                                    <thead>
                                        <tr>
                                            <th role="columnheader" aria-sort="none">
                                                Utgift
                                            </th>
                                            <th role="columnheader" className="belop">
                                                Beløp
                                            </th>
                                            <th />
                                        </tr>
                                    </thead>
                                )
                            }}
                        />
                        <tbody>
                            {kvitteringer.reverse().map((kvittering: Kvittering, idx: number) => (
                                <tr key={idx}>
                                    <td className="transport">
                                        <button type="button" tabIndex={0} className="lenkeknapp" onClick={() => visKvittering(kvittering)}>
                                            {UtgiftTyper[kvittering.typeUtgift]}
                                        </button>
                                    </td>
                                    <td className="belop">
                                        {formatterTall(kvittering.belop! / 100)} kr
                                    </td>
                                    <td>
                                        <Slettknapp sporsmal={sporsmal} kvittering={kvittering} update={update} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tbody className="sumlinje">
                            <tr>
                                <td>
                                    <Undertittel tag="span">
                                        {getLedetekst(tekst('fil_liste.utlegg.sum'), {
                                            '%ANTALL_BILAG%': kvitteringer.length
                                        })}
                                    </Undertittel>
                                </td>
                                <td className="belop">
                                    <Undertittel tag="span">
                                        {formatterTall(totaltBeløp())} kr
                                    </Undertittel>
                                </td>
                                <td />
                            </tr>
                        </tbody>
                    </Normaltekst>
                )
            }}
        />
    )
}

export default FilListe
