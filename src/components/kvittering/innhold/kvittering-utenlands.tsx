import { BodyLong, Heading, Label } from '@navikt/ds-react'
import React from 'react'
import { InformationSquareFillIcon } from '@navikt/aksel-icons'

import { sendtForMerEnn30DagerSiden } from '../../../utils/dato-utils'
import { tekst } from '../../../utils/tekster'
import { LenkeMedIkon } from '../../lenke-med-ikon/LenkeMedIkon'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { KvtteringPanel } from '../kvittering-panel'
import GridItems from '../grid-items'

export const KvitteringUtenlands = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    if (!valgtSoknad) return null

    if (sendtForMerEnn30DagerSiden(valgtSoknad.sendtTilArbeidsgiverDato, valgtSoknad.sendtTilNAVDato)) {
        return null
    }

    return (
        <KvtteringPanel>
            <GridItems
                venstre={
                    <div className="flex h-full items-center justify-center">
                        <InformationSquareFillIcon title="" fontSize="1.5rem" className="text-icon-info" />
                    </div>
                }
            >
                <Heading size="small" level="3" className="my-4">
                    {tekst('kvittering.hva-skjer-videre')}
                </Heading>
            </GridItems>
            <GridItems>
                <div className="mb-6 mt-2">
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
                <LenkeMedIkon
                    href={tekst('kvittering.utenlands.lenke.url')}
                    text={tekst('kvittering.utenlands.lenke')}
                />
                .
                <div className="mt-6">
                    <Label as="h2">{tekst('kvittering.utenlands.overskrift3')}</Label>
                    <BodyLong spacing as="span">
                        {tekst('kvittering.utenlands.brodtekst3')}{' '}
                    </BodyLong>
                </div>
            </GridItems>
        </KvtteringPanel>
    )
}
