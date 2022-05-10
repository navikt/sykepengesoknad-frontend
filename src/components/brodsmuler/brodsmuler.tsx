import { Collapse } from '@navikt/ds-icons'
import { BodyShort } from '@navikt/ds-react'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { Brodsmule } from '../../types/types'
import { dittNavUrl, sykefravaerUrl } from '../../utils/environment'
import { useAmplitudeInstance } from '../amplitude/amplitude'
import Vis from '../vis'
import Person from './Person'

const LITEN = 768

const faste: Brodsmule[] = [
    { tittel: 'Ditt NAV', sti: dittNavUrl(), erKlikkbar: true },
    { tittel: 'Ditt sykefravær', sti: sykefravaerUrl(), erKlikkbar: true },
]

const BrodsmuleBit = ({ sti, tittel, erKlikkbar }: Brodsmule) => {
    const { logEvent } = useAmplitudeInstance()

    const erEkstern =
        sti && (sti.startsWith('https://') || sti.startsWith('http://'))

    const link = erEkstern ? (
        <a href={sti} className="navds-link">
            {tittel}
        </a>
    ) : sti ? (
        <Link
            to={sti}
            className="navds-link"
            onClick={() => {
                logEvent('navigere', { lenketekst: tittel })
            }}
        >
            <BodyShort as="span" size="small">
                {tittel}
            </BodyShort>
        </Link>
    ) : (
        <BodyShort as="span" size="small">
            {tittel}
        </BodyShort>
    )

    if (!erKlikkbar) {
        return (
            <BodyShort as="li" size="small" className="smule">
                <span className="vekk">Du er her:</span>
                <span>{tittel}</span>
            </BodyShort>
        )
    } else if (erKlikkbar) {
        return (
            <BodyShort as="li" size="small" className="smule">
                {link}
            </BodyShort>
        )
    }

    return (
        <BodyShort as="li" size="small" className="smule">
            <span>{tittel}</span>
        </BodyShort>
    )
}

interface BrodsmulerProps {
    brodsmuler: Brodsmule[]
}

const Brodsmuler = ({ brodsmuler }: BrodsmulerProps) => {
    const [synlige, setSynlige] = useState<Brodsmule[]>([])
    const [skjerm, setSkjerm] = useState<number>(window.innerWidth)
    const smulesti = useRef<HTMLElement>(null)

    brodsmuler = faste.concat(brodsmuler)

    useEffect(() => {
        window.addEventListener('resize', () => {
            setSkjerm(window.innerWidth)
        })
        setSynlige(
            skjerm <= LITEN ? [brodsmuler[brodsmuler.length - 1]] : brodsmuler
        )
        // eslint-disable-next-line
    }, [skjerm])

    const toggleSynlige = () => {
        if (synlige.length === brodsmuler.length) {
            setSynlige([brodsmuler[brodsmuler.length - 1]])
            smulesti.current!.classList.remove('apen')
        } else {
            setSynlige(brodsmuler)
            smulesti.current!.classList.add('apen')
        }
    }

    return (
        <nav className="brodsmuler" ref={smulesti} aria-label="Du er her: ">
            <div className="limit">
                <Person />
                <ul className="brodsmuler__smuler">
                    <Vis
                        hvis={skjerm <= LITEN}
                        render={() => (
                            <li className="smule">
                                <button
                                    aria-label={
                                        synlige.length === brodsmuler.length
                                            ? 'Vis redusert brødsmulesti'
                                            : 'Vis hele brødsmulestien'
                                    }
                                    className="js-toggle"
                                    onClick={toggleSynlige}
                                >
                                    ...
                                </button>
                            </li>
                        )}
                    />

                    {synlige.map((smule, index) => {
                        return (
                            <BrodsmuleBit
                                key={index}
                                sti={smule.sti}
                                tittel={
                                    skjerm <= LITEN &&
                                    smule.mobilTittel &&
                                    !smulesti.current!.classList.contains(
                                        'apen'
                                    )
                                        ? smule.mobilTittel
                                        : smule.tittel
                                }
                                erKlikkbar={smule.erKlikkbar}
                            />
                        )
                    })}
                </ul>
                <button
                    aria-label={
                        synlige.length === brodsmuler.length
                            ? 'Vis redusert brødsmulesti'
                            : 'Vis hele brødsmulestien'
                    }
                    className="js-toggle"
                    onClick={toggleSynlige}
                >
                    <Collapse className="chevron--opp" />
                </button>
            </div>
        </nav>
    )
}

export default Brodsmuler
