import { Alert, Button } from '@navikt/ds-react'
import React, { MouseEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { tekst } from '../../../utils/tekster'
import { avbrytSoknad } from '../../avbryt-soknad-modal/avbryt-soknad'
import useSoknad from '../../../hooks/useSoknad'
import useSoknader from '../../../hooks/useSoknader'
import { RouteParams } from '../../../app'

type Event = MouseEvent<HTMLAnchorElement | HTMLButtonElement>

const KnapperadAvbryt = () => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)
    const { data: soknader } = useSoknader()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const [feilmeldingTekst, setFeilmeldingTekst] = useState<string>()

    if (!valgtSoknad || !soknader) return null

    const handleAvbryt = (event: Event) => {
        event.preventDefault()
        setFeilmeldingTekst(undefined)

        avbrytSoknad({
            valgtSoknad: valgtSoknad,
            soknader: soknader,
            queryClient: queryClient,
            navigate: navigate,
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
