import Alertstripe from 'nav-frontend-alertstriper'
import { Fareknapp, Knapp } from 'nav-frontend-knapper'
import { Normaltekst } from 'nav-frontend-typografi'
import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import { useAppStore } from '../../../data/stores/app-store'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tekst } from '../../../utils/tekster'
import VisBlock from '../../vis-block'
import { avbrytSoknad } from './avbryt-soknad'

type Event = MouseEvent<HTMLAnchorElement | HTMLButtonElement>;

interface KnapperadProps {
    onSubmit: () => void;
    poster: boolean;
}

const Knapperad = ({ onSubmit, poster }: KnapperadProps) => {
    const { valgtSoknad, setValgtSoknad, soknader, setSoknader, feilmeldingTekst, setFeilmeldingTekst } = useAppStore()
    const history = useHistory()
    const { stegId } = useParams<RouteParams>()
    const [ avbryter, setAvbryter ] = useState<boolean>(false)

    const spmIndex = parseInt(stegId) - 2

    const nokkel = spmIndex === valgtSoknad!.sporsmal.length - (valgtSoknad!.soknadstype === RSSoknadstype.OPPHOLD_UTLAND ? 2 : 3)
        ? 'sykepengesoknad.send'
        : 'sykepengesoknad.ga-videre'
    const avbrytDialog = useRef<HTMLDivElement>(null)
    const [ vilAvbryte, setVilAvbryte ] = useState<boolean>(false)

    useEffect(() => {
        if (vilAvbryte) {
            window.scrollTo({ top: avbrytDialog!.current!.offsetTop, left: 0, behavior: 'smooth' })
        }
    }, [ vilAvbryte ])

    const handleVilAvbryte = (event: Event) => {
        event.preventDefault()
        setVilAvbryte(!vilAvbryte)
    }

    const handleAvbryt = async(event: Event) => {
        event.preventDefault()
        if (avbryter) return
        setAvbryter(true)
        try {
            await avbrytSoknad({
                valgtSoknad: valgtSoknad!,
                setSoknader: setSoknader,
                soknader: soknader,
                setValgtSoknad: setValgtSoknad,
                history: history,
                setFeilmeldingTekst: setFeilmeldingTekst
            })
        } finally {
            setAvbryter(false)
        }
    }

    return (
        <div className="knapperad">
            <Knapp type="hoved" spinner={poster} onClick={() => onSubmit}>{tekst(nokkel)}</Knapp>
            <div className="avbrytDialog blokk-l">
                <button className="lenke avbrytlenke avbrytDialog__trigger" onClick={handleVilAvbryte}>
                    <Normaltekst tag="span">{tekst('sykepengesoknad.avbryt.trigger')}</Normaltekst>
                </button>
                <VisBlock hvis={vilAvbryte}
                    render={() => {
                        return (
                            <div ref={avbrytDialog} className="avbrytDialog__dialog pekeboble">
                                <Normaltekst className="blokk-s">{tekst('sykepengesoknad.avbryt.sporsmal')}</Normaltekst>
                                <div className="blokk-xs">
                                    <Fareknapp spinner={avbryter}
                                        onClick={handleAvbryt}>{tekst('sykepengesoknad.avbryt.ja')}</Fareknapp>
                                </div>
                                <div aria-live="polite">
                                    <VisBlock hvis={feilmeldingTekst !== ''}
                                        render={() => <Alertstripe type="feil">{feilmeldingTekst}</Alertstripe>}
                                    />
                                </div>
                                <button className="avbrytlenke lenke" onClick={handleVilAvbryte}>
                                    {tekst('sykepengesoknad.avbryt.angre')}
                                </button>
                            </div>
                        )
                    }}
                />
            </div>
        </div>
    )
}

export default Knapperad
