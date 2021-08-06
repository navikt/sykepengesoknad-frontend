import dayjs from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { RSSvarliste } from '../../../types/rs-types/rs-svarliste'
import { Sporsmal } from '../../../types/types'
import { ukeDatoListe } from '../../../utils/dato-utils'
import { hentSvar } from '../hent-svar'

interface UkeProps {
    sporsmal: Sporsmal
    ukeidx: number
    ukespm: Sporsmal
}

const BehandlingsUke = ({ sporsmal, ukeidx, ukespm }: UkeProps) => {
    const { register, setValue, watch } = useFormContext()
    const fjernRef = useRef<HTMLLabelElement>(null)
    const ukeWatch = watch(ukespm.id)
    const [ lagret, setLagret ] = useState<RSSvarliste[]>([])

    const hentLagret = () => {
        setLagret(hentSvar(sporsmal))
    }

    useEffect(() => {
        hentLagret()
        const liste = lagret[ukeidx]
        if (liste.svar[0] && liste.svar[0].verdi && liste.svar[0].verdi !== 'Ikke til behandling') {
            fjernRef.current!.classList.remove('skjul')
            setValue(ukespm.id, liste.svar[0].verdi)
        }
        // eslint-disable-next-line
    }, [ lagret ])

    const dagerSidenMandag = (spm: Sporsmal) => {
        return ((dayjs(spm.min!).day() - 1)) % 7
    }

    const dagerTilFredag = (spm: Sporsmal) => {
        return (5 - dayjs(spm.max!).day())
    }

    const radioKlikk = (value: string, index: number, name: string) => {
        setValue(name, value)
    }

    const fjernKlikk = (ukespm: Sporsmal, index: number) => {
        setValue(ukespm.id, '')
        fjernRef.current!.classList.add('skjul')
    }

    return (
        <div className="kalenderuke" key={ukeidx}>

            {Array(dagerSidenMandag(ukespm)).fill(0).map((i, idx) => {
                return <div className="kalenderdag tomdag" key={idx} />
            })}

            {ukeDatoListe(ukespm.min!, ukespm.max!).map((dag, idx) => {
                return (
                    <div className="kalenderdag" key={idx}>
                        <input type="radio"
                            id={ukespm.id + '_' + idx}
                            value={dag.format('YYYY-MM-DD')}
                            {...register(ukespm.id)}
                            onChange={() => radioKlikk(dag.format(('YYYY-MM-DD')), ukeidx, ukespm.id)}
                            checked={ukeWatch === dag.format('YYYY-MM-DD')}
                            className="radioknapp"
                        />
                        <label htmlFor={ukespm.id + '_' + idx}
                            onClick={() =>
                                fjernRef.current!.classList.remove('skjul')}
                        >
                            {dag.date()}
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
                    ref={fjernRef}
                >
                    fjern
                </label>
            </div>
        </div>
    )
}

export default BehandlingsUke
