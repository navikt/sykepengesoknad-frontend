import { Table, Loader, Label } from '@navikt/ds-react'
import React from 'react'

import { UtgiftTyper, Kvittering, Sporsmal } from '../../../types/types'
import { formatterTall } from '../../../utils/utils'
import Slettknapp from '../../slettknapp/slettknapp'
import useKvittering from '../../../hooks/useKvittering'

export interface KvitteringListeVisningProps {
    kvittering: Kvittering
    sporsmal: Sporsmal
    updateFilliste: () => void
}
const KvitteringListeVisning = ({ kvittering, sporsmal, updateFilliste }: KvitteringListeVisningProps) => {
    const { data: fil } = useKvittering(kvittering.blobId)

    return (
        <Table.ExpandableRow
            content={
                fil ? (
                    <img
                        alt={`kvittering for ${UtgiftTyper[kvittering.typeUtgift].toLowerCase()}`}
                        src={URL.createObjectURL(fil)}
                    />
                ) : (
                    <Loader />
                )
            }
        >
            <Table.DataCell>
                <Label as="h2">{UtgiftTyper[kvittering.typeUtgift]}</Label>
            </Table.DataCell>
            <Table.DataCell className="whitespace-nowrap">{formatterTall(kvittering.belop! / 100)} kr</Table.DataCell>
            <Table.DataCell className="text-right">
                <Slettknapp sporsmal={sporsmal} kvittering={kvittering} updateFilliste={updateFilliste} />
            </Table.DataCell>
        </Table.ExpandableRow>
    )
}
export default KvitteringListeVisning
