import { BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'
import useForceUpdate from 'use-force-update'

import { useAppStore } from '../../../data/stores/app-store'
import { Kvittering, Sporsmal, UtgiftTyper } from '../../../types/types'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { formatterTall } from '../../../utils/utils'
import Slettknapp from '../../slettknapp/slettknapp'
import { hentSvar } from '../../sporsmal/hent-svar'
import Vis from '../../vis'

interface Props {
    sporsmal: Sporsmal
    fjernKnapp?: boolean
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
        <Vis hvis={kvitteringer.length > 0}
            render={() =>
                <BodyShort as="table" className="tabell tabell--stripet fil_liste">
                    <Vis hvis={fjernKnapp}
                        render={() =>
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
                        }
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
                                <Heading size="small" as="span">
                                    {getLedetekst(tekst('fil_liste.utlegg.sum'), {
                                        '%ANTALL_BILAG%': kvitteringer.length,
                                        '%FLERTALL%': kvitteringer.length > 1 ? 'er' : ''
                                    })}
                                </Heading>
                            </td>
                            <td className="belop">
                                <Heading size="small" as="span">
                                    {formatterTall(totaltBeløp())} kr
                                </Heading>
                            </td>
                            <td />
                        </tr>
                    </tbody>
                </BodyShort>
            }
        />
    )
}

export default FilListe
