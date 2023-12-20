import { Heading, Select, BodyShort } from '@navikt/ds-react'
import React, { useState } from 'react'

import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { sorterEtterNyesteFom, sorterEtterSendt, sorterEtterStatus } from '../../utils/sorter-soknader'
import Vis from '../vis'
import { RSSoknadmetadata } from '../../types/rs-types/rs-soknadmetadata'

import FremtidigeSoknaderTeaser from './fremtidige-soknader-teaser'
import UtgaattSoknaderTeaser from './utgatt-soknader-teaser'
import { ListevisningLenkepanel } from './listevisning-lenkepanel'

interface SoknaderTeasereProps {
    soknader: RSSoknadmetadata[]
    tittel: string
    tomListeTekst?: string
    kanSorteres?: boolean
}

enum Sortering {
    Dato = 'Dato',
    Status = 'Status',
    Sendt = 'Sendt',
}

const Teasere = ({ soknader, tittel, tomListeTekst, kanSorteres = false }: SoknaderTeasereProps) => {
    const [sortering, setSortering] = useState<Sortering>(Sortering.Dato)

    const sorterteSoknader = () => {
        if (kanSorteres) {
            if (sortering === 'Dato') {
                return soknader.sort(sorterEtterNyesteFom)
            } else if (sortering === 'Status') {
                return soknader.sort(sorterEtterStatus)
            } else if (sortering === 'Sendt') {
                return soknader.sort(sorterEtterSendt)
            }
        }
        return soknader
    }

    return (
        <div data-cy={tittel} className="mb-12">
            <div className="mb-3 flex justify-between">
                <Vis
                    hvis={sorterteSoknader().length > 0 || tomListeTekst}
                    render={() => (
                        <Heading size="medium" spacing level="2">
                            {tittel}
                        </Heading>
                    )}
                />
                <Vis
                    hvis={kanSorteres && sorterteSoknader().length > 0}
                    render={() => (
                        <Select
                            size="small"
                            label="Sorter etter"
                            onChange={(event) => setSortering(event.target.value as Sortering)}
                        >
                            {Object.values(Sortering).map((sort) => (
                                <option value={sort} key={sort}>
                                    {sort}
                                </option>
                            ))}
                        </Select>
                    )}
                />
            </div>

            {sorterteSoknader().map((soknad, idx) => {
                switch (soknad.status) {
                    case RSSoknadstatus.FREMTIDIG:
                        return <FremtidigeSoknaderTeaser key={idx} soknad={soknad} />
                    case RSSoknadstatus.SENDT:
                    case RSSoknadstatus.AVBRUTT:
                        return <ListevisningLenkepanel key={idx} soknad={soknad} />
                    case RSSoknadstatus.UTGAATT:
                        return <UtgaattSoknaderTeaser key={idx} soknad={soknad} />
                    default:
                        return <ListevisningLenkepanel key={idx} soknad={soknad} />
                }
            })}
            <Vis hvis={soknader.length === 0} render={() => <BodyShort weight="semibold">{tomListeTekst}</BodyShort>} />
        </div>
    )
}

export default Teasere
