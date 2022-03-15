import { Button } from '@navikt/ds-react'
import React, { MouseEvent } from 'react'
import { useHistory } from 'react-router-dom'

import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import { avbrytSoknad } from '../../avbryt-soknad-modal/avbryt-soknad'

type Event = MouseEvent<HTMLAnchorElement | HTMLButtonElement>;

const KnapperadAvbryt = () => {
    const { valgtSoknad, soknader, setSoknader, setValgtSoknad, setFeilmeldingTekst } = useAppStore()
    const history = useHistory()

    const handleAvbryt = (event: Event) => {
        event.preventDefault()

        avbrytSoknad({
            valgtSoknad: valgtSoknad!,
            setSoknader: setSoknader,
            soknader: soknader,
            setValgtSoknad: setValgtSoknad,
            history: history,
            setFeilmeldingTekst: setFeilmeldingTekst
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
