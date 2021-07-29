import './beh.dager.less'

import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { RSSvarliste } from '../../../types/rs-types/rs-svarliste'
import { Sporsmal } from '../../../types/types'
import { ukeDatoListe } from '../../../utils/dato-utils'
import FeilLokal from '../../feil/feil-lokal'
import { hentSvar } from '../hent-svar'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import SporsmalstekstH3 from '../sporsmalstekst/sporsmalstekstH3'

const BehDager = ({ sporsmal }: SpmProps) => {
    const { register, setValue } = useFormContext()
    const antallUker = sporsmal.undersporsmal.length
    const [ lokal, setLokal ] = useState<string[]>(new Array(antallUker).fill(''))

    useEffect(() => {
        const lagret: RSSvarliste[] = hentSvar(sporsmal)
        lagret.forEach((liste, idx) => {
            if (liste.svar[0] !== undefined && liste.svar[0].verdi !== 'Ikke til behandling') {
                lokal[idx] = liste.svar[0].verdi
                const radio = document.querySelector('.radioknapp[value="' + lokal[idx] + '"]')
                radio!.setAttribute('checked', 'checked')
                radio!.parentElement!.parentElement!.querySelector('.fjern')!.classList.remove('skjul')
            }
        })
        setLokal(lokal)
        // eslint-disable-next-line
    }, [ sporsmal ])

    const dagerSidenMandag = (spm: Sporsmal) => {
        return ((dayjs(spm.min!).day() - 1)) % 7
    }

    const dagerTilFredag = (spm: Sporsmal) => {
        return (5 - dayjs(spm.max!).day())
    }

    const radioKlikk = (value: string, index: number, name: string) => {
        setValue(name, value)
        lokal[index] = value
        setLokal(lokal)
    }

    const fjernKlikk = (ukespm: Sporsmal, index: number) => {
        lokal[index] = ''
        document.getElementById(ukespm.id + '_label')!.classList.add('skjul')
    }

    return (
        <>
            <SporsmalstekstH3 sporsmal={sporsmal} />

            <div className="skjemaelement">
                <div className="skjema__beh-dager">
                    <div className="ukedager">
                        <span>Man</span>
                        <span>Tir</span>
                        <span>Ons</span>
                        <span>Tor</span>
                        <span>Fre</span>
                    </div>

                    {sporsmal.undersporsmal.map((ukespm, ukeidx) => {

                        return (
                            <div className="kalenderuke" key={ukeidx}>

                                {Array(dagerSidenMandag(ukespm)).fill(0).map((i, idx) => {
                                    return <div className="kalenderdag tomdag" key={idx} />
                                })}

                                {ukeDatoListe(ukespm.min!, ukespm.max!).map((dagspm, idx) => {
                                    return (
                                        <div className="kalenderdag" key={idx}>
                                            <input type="radio"
                                                id={ukespm.id + '_' + idx}
                                                name={ukespm.id}
                                                value={dagspm.format('YYYY-MM-DD')}
                                                {...register}
                                                onChange={() => radioKlikk(dagspm.format(('YYYY-MM-DD')), ukeidx, ukespm.id)}
                                                className="radioknapp"
                                            />
                                            <label htmlFor={ukespm.id + '_' + idx}
                                                onClick={() =>
                                                    document.getElementById(ukespm.id + '_label')!
                                                        .classList.remove('skjul')}
                                            >
                                                {dagspm.date()}
                                            </label>
                                        </div>
                                    )
                                })}

                                {Array(dagerTilFredag(ukespm)).fill(0).map((i, idx) => {
                                    return <div className="kalenderdag tomdag" key={idx} />
                                })}

                                <div className="kalenderdag">
                                    <input type="radio"
                                        name={ukespm.id}
                                        className="radioknapp"
                                        value=""
                                        id={ukespm.id + '_fjern'}
                                    />
                                    <label htmlFor={ukespm.id + '_fjern'}
                                        id={ukespm.id + '_label'}
                                        className="fjern skjul"
                                        onClick={() => fjernKlikk(ukespm, ukeidx)}
                                    >
                                        fjern
                                    </label>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <FeilLokal sporsmal={sporsmal} />
        </>
    )
}

export default BehDager
