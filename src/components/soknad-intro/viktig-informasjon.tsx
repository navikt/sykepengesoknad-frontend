import { BodyLong, GuidePanel, Label } from '@navikt/ds-react'
import React from 'react'
import { useRouter } from 'next/router'

import { tekst } from '../../utils/tekster'
import useSoknad from '../../hooks/useSoknad'

export const ViktigInformasjon = () => {
    const router = useRouter()
    const { id } = router.query as { id: string }
    const { data: valgtSoknad } = useSoknad(id)

    if (!valgtSoknad) {
        return null
    }

    const merknadsTyperSomVarsles = ['UGYLDIG_TILBAKEDATERING', 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER']

    if (valgtSoknad.merknaderFraSykmelding?.some((a) => merknadsTyperSomVarsles.includes(a.type))) {
        return (
            <GuidePanel
                poster
                style={
                    {
                        '--ac-guide-panel-border': 'var(--a-orange-400)',
                        '--ac-guide-panel-illustration-bg': 'var(--a-orange-200)',
                    } as React.CSSProperties
                }
            >
                <Label as="h2" spacing>
                    {tekst('viktig-informasjon.overskrift')}
                </Label>
                <BodyLong spacing>{tekst('viktig-informasjon.avsnitt.1')}</BodyLong>
                <BodyLong spacing>{tekst('viktig-informasjon.avsnitt.2')}</BodyLong>
                <Label as="h3" spacing>
                    {tekst('viktig-informasjon.under-overskrift')}
                </Label>
                <BodyLong spacing>{tekst('viktig-informasjon.avsnitt.3')}</BodyLong>
            </GuidePanel>
        )
    }
    return null
}
