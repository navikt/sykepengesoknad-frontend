import React, { useState } from 'react'

import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'

import { EmojiFlexjar } from './emoji-flexjar'

export const FlexjarKvittering = () => {
    const [activeState, setActiveState] = useState<number | string | null>(null)
    const [thanksFeedback, setThanksFeedback] = useState<boolean>(false)
    const { valgtSoknad } = useSoknadMedDetaljer()

    const feedbackId = 'sykepengesoknad-kvittering'
    return (
        <EmojiFlexjar
            feedbackId={feedbackId}
            setActiveState={setActiveState}
            activeState={activeState}
            thanksFeedback={thanksFeedback}
            setThanksFeedback={setThanksFeedback}
            getPlaceholder={() => 'Fortell oss om din opplevelse (valgfritt)'}
            flexjarsporsmal="Hvordan opplevde du denne søknaden?"
            flexjartittel="Hjelp oss med å gjøre søknaden bedre"
            feedbackProps={{
                soknadstype: valgtSoknad?.soknadstype.toString(),
            }}
        />
    )
}
