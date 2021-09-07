import dayjs from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { Sporsmal } from '../../../types/types'
import { ukeDatoListe } from '../../../utils/dato-utils'
import { hentSvar } from '../hent-svar'

interface UkeProps {
    sporsmal: Sporsmal
    ukeidx: number
    ukespm: Sporsmal
}

const BehandlingsUke = ({ sporsmal, ukeidx, ukespm }: UkeProps) => {
    const { register, setValue } = useFormContext()
    const fjernRef = useRef<HTMLLabelElement>(null)
    const [ lokal, setLokal ] = useState<string>('')

    useEffect(() => {
        const svar = hentSvar(sporsmal)
        const liste = svar[ukeidx].svar
        if (liste && liste[0] && liste[0].verdi !== 'Ikke til behandling') {
            setLokal(liste[0].verdi)
            setValue(ukespm.id, liste[0].verdi)
        }
        // eslint-disable-next-line
    }, [])

    const dagerSidenMandag = (spm: Sporsmal) => {
        return ((dayjs(spm.min!).day() - 1)) % 7
    }

    const dagerTilFredag = (spm: Sporsmal) => {
        return (5 - dayjs(spm.max!).day())
    }

    const radioKlikk = (value: string, index: number, name: string) => {
        setLokal(value)
        setValue(ukespm.id, value)
    }

    const fjernKlikk = (ukespm: Sporsmal, index: number) => {
        setLokal('')
        setValue(ukespm.id, '')
    }

    return (
        <div className="kalenderuke" key={ukeidx}>

            {Array(dagerSidenMandag(ukespm)).fill(0).map((i, idx) => {
                return <div className="kalenderdag tomdag" key={idx} />
            })}

            {ukeDatoListe(ukespm.min!, ukespm.max!).map((dag, idx) => {
                const checked = lokal === dag.format('YYYY-MM-DD')
                return (
                    <div className="kalenderdag" key={idx}>
                        <input type="radio"
                            id={ukespm.id + '_' + idx}
                            {...register(ukespm.id)}
                            onChange={() => radioKlikk(dag.format(('YYYY-MM-DD')), ukeidx, ukespm.id)}
                            defaultChecked={checked}
                            className="radioknapp"
                        />
                        <label htmlFor={ukespm.id + '_' + idx}>
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
                    className={lokal ? 'fjern' : 'fjern skjul'}
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
