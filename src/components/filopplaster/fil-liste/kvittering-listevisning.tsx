import { Table, Loader, Label } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'

import { UtgiftTyper, Kvittering, Sporsmal } from '../../../types/types'
import { formatterTall } from '../../../utils/utils'
import Slettknapp from '../../slettknapp/slettknapp'
import fetchMedRequestId from '../../../utils/fetch'

export interface KvitteringListeVisningProps {
    kvittering: Kvittering
    sporsmal: Sporsmal
    updateFilliste: () => void
}
const KvitteringListeVisning = ({ kvittering, sporsmal, updateFilliste }: KvitteringListeVisningProps) => {
    const [fil, setFil] = useState<File>()
    useEffect(() => {
        fetchMedRequestId(
            `/syk/sykepengesoknad/api/sykepengesoknad-kvitteringer/api/v2/kvittering/${kvittering.blobId}`,
            {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            },
        ).then((fetchResult) => {
            fetchResult.response.blob().then((blob) => {
                setFil(blob as any)
            })
        })
    }, [kvittering.blobId])

    return (
        <Table.ExpandableRow content={fil ? <img alt={fil.name} src={URL.createObjectURL(fil)} /> : <Loader />}>
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
