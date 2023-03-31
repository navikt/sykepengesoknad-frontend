import React from 'react'
import useForceUpdate from 'use-force-update'
import { useParams } from 'react-router-dom'
import { Table } from '@navikt/ds-react'

import { Kvittering } from '../../../types/types'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { formatterTall } from '../../../utils/utils'
import { hentSvar } from '../../sporsmal/hent-svar'
import Vis from '../../vis'
import { RouteParams } from '../../../app'
import useSoknad from '../../../hooks/useSoknad'

import KvitteringListeVisning from './kvittering-listevisning'

const FilListe = () => {
    const { id, stegId } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)

    const stegNum = Number(stegId)
    const spmIndex = stegNum - 1
    const forceUpdate = useForceUpdate()

    if (!valgtSoknad) return null

    const sporsmal = valgtSoknad.sporsmal[spmIndex]
    const kvitteringer = hentSvar(sporsmal)

    const updateFilliste = () => {
        forceUpdate()
    }

    const totaltBeløp = (): number =>
        (kvitteringer
            ? kvitteringer
                  .filter((kvittering: Kvittering) => kvittering.belop)
                  .map((kvittering: Kvittering) => kvittering.belop!)
                  .reduce((a: number, b: number) => a + b, 0.0)
            : 0.0) / 100

    return (
        <Vis
            hvis={kvitteringer.length > 0}
            render={() => (
                <>
                    <Table zebraStripes={true}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell />
                                <Table.HeaderCell scope="col">Utgift</Table.HeaderCell>
                                <Table.HeaderCell scope="col">Beløp</Table.HeaderCell>
                                <Table.HeaderCell scope="col"></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {kvitteringer.reverse().map((kvittering: Kvittering) => {
                                return (
                                    <KvitteringListeVisning
                                        key={kvittering.blobId}
                                        kvittering={kvittering}
                                        updateFilliste={updateFilliste}
                                        sporsmal={sporsmal}
                                    />
                                )
                            })}
                            <Table.Row>
                                <Table.DataCell colSpan={2} className="border-b-0 font-bold">
                                    {getLedetekst(tekst('fil_liste.utlegg.sum'), {
                                        '%ANTALL_BILAG%': kvitteringer.length,
                                        '%FLERTALL%': kvitteringer.length > 1 ? 'er' : '',
                                    })}
                                </Table.DataCell>
                                <Table.DataCell colSpan={2} className="border-b-0 font-bold">
                                    {formatterTall(totaltBeløp())} kr
                                </Table.DataCell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </>
            )}
        />
    )
}

export default FilListe
