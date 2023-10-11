import React from 'react'
import { Table } from '@navikt/ds-react'

import { Kvittering } from '../../../types/types'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { formatterTall } from '../../../utils/utils'
import { hentSvar } from '../../sporsmal/hent-svar'
import Vis from '../../vis'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'

import KvitteringListeVisning from './kvittering-listevisning'

const FilListe = () => {
    const { valgtSoknad, stegId } = useSoknadMedDetaljer()

    const stegNum = Number(stegId)
    const spmIndex = stegNum - 1

    if (!valgtSoknad) return null

    const sporsmal = valgtSoknad.sporsmal[spmIndex]
    const kvitteringer = hentSvar(sporsmal)

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
                                <Table.HeaderCell scope="col">
                                    <span className="sr-only">Ekspander for å se kvitteringen</span>
                                </Table.HeaderCell>
                                <Table.HeaderCell scope="col">Utgift</Table.HeaderCell>
                                <Table.HeaderCell scope="col">Beløp</Table.HeaderCell>
                                <Table.HeaderCell scope="col">
                                    <span className="sr-only">Slett kvitteringen</span>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {kvitteringer.reverse().map((kvittering: Kvittering) => (
                                <KvitteringListeVisning
                                    key={kvittering.blobId}
                                    kvittering={kvittering}
                                    sporsmal={sporsmal}
                                />
                            ))}
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
