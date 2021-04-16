import './brodsmuler.less'

import { OppChevron } from 'nav-frontend-chevron'
import Lenke from 'nav-frontend-lenker'
import { Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { Brodsmule } from '../../types/types'
import env from '../../utils/environment'
import VisBlock from '../vis-block'
import personIkon from './person.svg'

const LITEN = 768

const faste: Brodsmule[] = [
    { tittel: 'Ditt NAV', sti: env.dittNavUrl, erKlikkbar: true },
    { tittel: 'Ditt sykefravær', sti: env.sykefravaerUrl, erKlikkbar: true }
]

const BrodsmuleBit = ({ sti, tittel, erKlikkbar }: Brodsmule) => {
    const erEkstern = sti && (sti.startsWith('https://') || sti.startsWith('http://'))

    const link = erEkstern
        ? <Lenke href={sti}>{tittel}</Lenke>
        : sti
            ? <Link to={sti} className="lenke">{tittel}</Link>
            : <span>{tittel}</span>

    if (!erKlikkbar) {
        return (
            <li className="smule">
                <span className="vekk">Du er her:</span>
                <span>{tittel}</span>
            </li>
        )
    } else if (erKlikkbar) {
        return (
            <li className="smule">{link}</li>
        )
    }
    return (
        <li className="smule">
            <span>{tittel}</span>
        </li>
    )
}

interface BrodsmulerProps {
    brodsmuler: Brodsmule[];
}

const Brodsmuler = ({ brodsmuler }: BrodsmulerProps) => {
    const [ synlige, setSynlige ] = useState<Brodsmule[]>([])
    const [ skjerm, setSkjerm ] = useState<number>(window.innerWidth)
    const smulesti = useRef<HTMLElement>(null)

    brodsmuler = faste.concat(brodsmuler)

    useEffect(() => {
        window.addEventListener('resize', () => {
            setSkjerm(window.innerWidth)
        })
        setSynlige(skjerm <= LITEN ? [ brodsmuler[brodsmuler.length - 1] ] : brodsmuler)
        // eslint-disable-next-line
    }, [ skjerm ])

    const toggleSynlige = () => {
        if (synlige.length === brodsmuler.length) {
            setSynlige([ brodsmuler[brodsmuler.length - 1] ])
            smulesti.current!.classList.remove('apen')
        } else {
            setSynlige(brodsmuler)
            smulesti.current!.classList.add('apen')
        }
    }

    return (
        <nav className="brodsmuler" ref={smulesti} aria-label="Du er her: ">
            <div className="limit">
                <img src={personIkon} alt="Du" className="brodsmuler__ikon" />
                <Normaltekst tag="ul" className="brodsmuler__smuler">
                    <VisBlock hvis={skjerm <= LITEN}
                        render={() => {
                            return (
                                <li className="smule">
                                    <button
                                        aria-label={
                                            synlige.length === brodsmuler.length
                                                ? 'Vis redusert brødsmulesti'
                                                : 'Vis hele brødsmulestien'}
                                        className="js-toggle"
                                        onClick={toggleSynlige}
                                    >
                                        ...
                                    </button>
                                </li>
                            )
                        }}
                    />

                    {synlige.map((smule, index) => {
                        return (
                            <BrodsmuleBit key={index}
                                sti={smule.sti}
                                tittel={
                                    skjerm <= LITEN && smule.mobilTittel && !smulesti.current!.classList.contains('apen')
                                        ? smule.mobilTittel
                                        : smule.tittel
                                }
                                erKlikkbar={smule.erKlikkbar}
                            />
                        )
                    })}
                </Normaltekst>
                <button
                    aria-label={
                        synlige.length === brodsmuler.length
                            ? 'Vis redusert brødsmulesti'
                            : 'Vis hele brødsmulestien'}
                    className="js-toggle"
                    onClick={toggleSynlige}
                >
                    <OppChevron />
                </button>
            </div>
        </nav>
    )
}

export default Brodsmuler
