import { Alert, BodyLong, Heading, Label } from '@navikt/ds-react'
import React from 'react'
import { useRouter } from 'next/router'

import { sendtForMerEnn30DagerSiden } from '../../../utils/dato-utils'
import { tekst } from '../../../utils/tekster'
import useSoknad from '../../../hooks/useSoknad'
import { LenkeMedIkon } from '../../lenke-med-ikon/LenkeMedIkon'

const KvitteringUtenlands = () => {
    const router = useRouter()
    const { id } = router.query as { id: string; stegId: string }
    const { data: valgtSoknad } = useSoknad(id)

    if (!valgtSoknad) return null

    if (sendtForMerEnn30DagerSiden(valgtSoknad.sendtTilArbeidsgiverDato, valgtSoknad.sendtTilNAVDato)) {
        return null
    }

    return (
        <Alert variant="info" className="bg-white" data-cy="kvittering-alert">
            <Heading size="small" level="3">
                {tekst('kvittering.hva-skjer-videre')}
            </Heading>
            <div className="my-6">
                <Label as="h2">{tekst('kvittering.utenlands.overskrift1')}</Label>
                <BodyLong spacing as="span">
                    {tekst('kvittering.utenlands.brodtekst1')}{' '}
                </BodyLong>
            </div>
            <div className="my-6">
                <Label as="h2">{tekst('kvittering.utenlands.overskrift2')}</Label>
                <BodyLong as="ul">
                    <li>{tekst('kvittering.utenlands.liste1')}</li>
                    <li>{tekst('kvittering.utenlands.liste2')}</li>
                    <li>{tekst('kvittering.utenlands.liste3')}</li>
                </BodyLong>
            </div>
            <LenkeMedIkon href={tekst('kvittering.utenlands.lenke.url')} text={tekst('kvittering.utenlands.lenke')} />.
            <div className="my-6">
                <Label as="h2">{tekst('kvittering.utenlands.overskrift3')}</Label>
                <BodyLong spacing as="span">
                    {tekst('kvittering.utenlands.brodtekst3')}{' '}
                </BodyLong>
            </div>
        </Alert>
    )
}

export default KvitteringUtenlands
