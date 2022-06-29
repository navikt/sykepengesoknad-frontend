import { Button, GuidePanel } from '@navikt/ds-react'
import React from 'react'
import { useHistory } from 'react-router-dom'

import { Soknad } from '../../types/types'
import { urlTilSoknad } from '../soknad/soknad-link'

interface Props {
    soknader: Soknad[]
}

export const GjenstaendeSoknader = ({ soknader }: Props) => {
    const history = useHistory()

    if (soknader.length == 0) {
        return null
    }
    const sortert = soknader.sort((a, b) => a.fom!.getTime() - b.fom!.getTime())

    return (
        <GuidePanel>
            Du har {soknader.length} søknader du må velge om du skal bruke.
            <Button
                style={{ display: 'block', marginTop: '1em' }}
                onClick={() => {
                    history.push(urlTilSoknad(sortert[0]))
                }}
            >
                Gå til søknaden
            </Button>
        </GuidePanel>
    )
}
