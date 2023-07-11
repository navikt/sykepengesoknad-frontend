import { Alert, Button } from '@navikt/ds-react'
import React, { MouseEvent, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { tekst } from '../../../utils/tekster'
import { avbrytSoknad } from '../../avbryt-soknad-modal/avbryt-soknad'
import useSoknad from '../../../hooks/useSoknad'
import useSoknader from '../../../hooks/useSoknader'

type Event = MouseEvent<HTMLAnchorElement | HTMLButtonElement>

const KnapperadAvbryt = () => {
    const router = useRouter()
    const { id } = router.query as { id: string }
    const { data: valgtSoknad } = useSoknad(id)
    const { data: soknader } = useSoknader()
    const queryClient = useQueryClient()

    const [feilmeldingTekst, setFeilmeldingTekst] = useState<string>()

    if (!valgtSoknad || !soknader) return null

    const handleAvbryt = (event: Event) => {
        event.preventDefault()
        setFeilmeldingTekst(undefined)

        avbrytSoknad({
            valgtSoknad: valgtSoknad,
            soknader: soknader,
            queryClient: queryClient,
            router: router,
            setFeilmeldingTekst: setFeilmeldingTekst,
        })
    }

    return (
        <>
            <Button variant="danger" type="button" onClick={handleAvbryt} data-cy="avbryt-soknad">
                {tekst('sykepengesoknad.avbryt.simpel')}
            </Button>
            {feilmeldingTekst && (
                <Alert variant="error" className="mt-4">
                    {feilmeldingTekst}
                </Alert>
            )}
        </>
    )
}

export default KnapperadAvbryt
