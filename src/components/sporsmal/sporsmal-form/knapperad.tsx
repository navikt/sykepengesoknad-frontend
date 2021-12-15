import Alertstripe from 'nav-frontend-alertstriper'
import { Fareknapp, Knapp } from 'nav-frontend-knapper'
import { Normaltekst } from 'nav-frontend-typografi'
import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import { useAppStore } from '../../../data/stores/app-store'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tekst } from '../../../utils/tekster'
import PersonvernLesMer from '../../soknad-intro/personvern-les-mer'
import Vis from '../../vis'
import { avbrytSoknad } from './avbryt-soknad'

type Event = MouseEvent<HTMLAnchorElement | HTMLButtonElement>;

interface KnapperadProps {
    poster: boolean;
}

const Knapperad = ({ poster }: KnapperadProps) => {
    const { valgtSoknad, setValgtSoknad, soknader, setSoknader, feilmeldingTekst, setFeilmeldingTekst } = useAppStore()
    const history = useHistory()
    const { stegId } = useParams<RouteParams>()
    const [ avbryter, setAvbryter ] = useState<boolean>(false)

    const stegNo = parseInt(stegId)
    const spmIndex = stegNo - 2
    const erUtlandssoknad = valgtSoknad!.soknadstype === RSSoknadstype.OPPHOLD_UTLAND

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

    useEffect(() => {
        setVilAvbryte(false)
    },[ stegId ])

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
            <Knapp type="hoved" htmlType="submit" spinner={poster}>{tekst(nokkel)}</Knapp>
            <div className="avbrytDialog blokk-l">
                <button className="lenke avbrytlenke avbrytDialog__trigger" onClick={handleVilAvbryte}>
                    <Normaltekst tag="span">{tekst('sykepengesoknad.avbryt.simpel')}</Normaltekst>
                </button>
                <Vis hvis={vilAvbryte}
                    render={() =>
                        <div ref={avbrytDialog} className="avbrytDialog__dialog pekeboble">
                            <Normaltekst>{tekst('sykepengesoknad.avbryt.sporsmal.forklaring')}</Normaltekst>
                            <Normaltekst style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                                <strong>{tekst('sykepengesoknad.avbryt.sporsmal')}</strong>
                            </Normaltekst>
                            <div className="blokk-xs">
                                <Fareknapp spinner={avbryter}
                                    onClick={handleAvbryt}>{tekst('sykepengesoknad.avbryt.ja')}</Fareknapp>
                            </div>
                            <div aria-live="polite">
                                <Vis hvis={feilmeldingTekst}
                                    render={() => <Alertstripe type="feil">{feilmeldingTekst}</Alertstripe>}
                                />
                            </div>
                            <button className="avbrytlenke lenke" onClick={handleVilAvbryte}>
                                {tekst('sykepengesoknad.avbryt.angre')}
                            </button>
                        </div>
                    }
                />
            </div>
            <Vis hvis={stegNo === 1 && !erUtlandssoknad}
                render={() =>
                    <PersonvernLesMer />
                }
            />
        </div>
    )
}

export default Knapperad
