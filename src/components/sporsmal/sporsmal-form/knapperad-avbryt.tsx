import { Button } from '@navikt/ds-react'
import React, { MouseEvent } from 'react'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { useAppStore } from '../../../data/stores/app-store'
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

    const { setFeilmeldingTekst } = useAppStore()

    if (!valgtSoknad || !soknader) return null

    const handleAvbryt = (event: Event) => {
        event.preventDefault()

        avbrytSoknad({
            valgtSoknad: valgtSoknad,
            soknader: soknader,
            queryClient: queryClient,
            navigate: navigate,
            setFeilmeldingTekst: setFeilmeldingTekst,
        })
    }

    return (
        <div className="knapperad">
            <Button variant="danger" type="button" onClick={handleAvbryt}>
                {tekst('sykepengesoknad.avbryt.simpel')}
            </Button>
        </div>
    )
}

export default KnapperadAvbryt
