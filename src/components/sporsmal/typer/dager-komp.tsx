import './dager-komp.less'

import dayjs, { Dayjs } from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'
import { useForm } from 'react-hook-form'

import { Sporsmal } from '../../../types/types'
import { maaneder, sammeAar, sammeMnd } from '../../../utils/dato-utils'
import { tekst } from '../../../utils/tekster'
import FeilLokal from '../../feil/feil-lokal'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import SporsmalstekstH3 from '../sporsmalstekst/sporsmalstekstH3'
import SlettIkon from './slett-ikon.svg'

dayjs.extend(weekOfYear)
dayjs.extend(isoWeek)

interface KalenderDag {
    dayjs: Dayjs;
    tid: 'foran' | 'etter' | 'inni';
}

const DagerKomp = ({ sporsmal }: SpmProps) => {
    const { register, setValue, watch } = useForm()
    const feilmelding = hentFeilmelding(sporsmal)
    const watchDager = watch(sporsmal.id)

    const dagerSidenMandag = (spm: Sporsmal) => {
        return ((dayjs(spm.min!).day() - 1)) % 7
    }

    const dagerTilSøndag = (spm: Sporsmal) => {
        return (7 - dayjs(spm.max!).day())
    }

    const kalTittel = () => {
        const etaar = sammeAar(sporsmal)
        const enmnd = sammeMnd(sporsmal)
        const min = dayjs(sporsmal.min!)
        const max = dayjs(sporsmal.max!)
        if (enmnd && etaar) {
            return `${maaneder[min.month()]} ${min.year()}`
        } else if (!enmnd && etaar) {
            return `${maaneder[min.month()]} - ${maaneder[max.month()]} ${max.year()}`
        } else if (!enmnd && !etaar) {
            return `${maaneder[min.month()]} ${min.year()} - ${maaneder[max.month()]} ${max.year()}`
        }
    }

    const minWeek = dayjs(sporsmal.min!).isoWeek()
    const maxWeek = dayjs(sporsmal.max!).isoWeek()
    const uker: number[] = []
    for (let i = 0; i <= (maxWeek - minWeek); i++) {
        uker.push(minWeek + i)
    }

    let tell = 1
    const alledager: any = []

    uker.forEach(uke => {
        const pre = dagerSidenMandag(sporsmal)
        const post = dagerTilSøndag(sporsmal)

        if (uke === minWeek) {
            const ukedager: KalenderDag[] = []
            for (let i = 0; i < pre; i++) {
                ukedager.push({ dayjs: dayjs(sporsmal.min!).isoWeekday(i + 1), tid: 'foran' })
            }
            for (let i = ukedager.length; i < 7; i++) {
                ukedager.push({ dayjs: dayjs(sporsmal.min!).isoWeekday(i + 1), tid: 'inni' })
            }
            alledager.push(ukedager)

        } else if (uke === maxWeek) {
            const ukedager: KalenderDag[] = []
            for (let i = 0; i < (5 - post); i++) {
                ukedager.push({ dayjs: dayjs(sporsmal.max!).isoWeekday(i + 1), tid: 'inni' })
            }
            for (let i = ukedager.length; i < 7; i++) {
                ukedager.push({ dayjs: dayjs(sporsmal.max!).isoWeekday(i + 1), tid: 'etter' })
            }
            alledager.push(ukedager)

        } else {
            const start = dayjs(sporsmal.min!)
            const ukedager: KalenderDag[] = []
            for (let i = 1; i <= 7; i++) {
                ukedager.push({ dayjs: start.add((tell * 7) + 1, 'days').isoWeekday(i), tid: 'inni' })
            }
            alledager.push(ukedager)
            tell++
        }
    })

    const velgAlle = () => {
        const dager: string[] = []
        alledager.forEach((uke: any) => {
            for (let i = 0; i < uke.length; i++) {
                const dag = uke[i]
                if (dag.tid === 'inni') {
                    dager.push(dag.dayjs.format('YYYY-MM-DD'))
                }
            }
        })
        setValue(sporsmal.id, Array.from(new Set(dager)))
    }

    const fjernAlle = () => {
        setValue(sporsmal.id, [])
    }

    const kalenderdag = (dag: KalenderDag, ukeidx: number, idx: number) => {
        if (dag.tid !== 'foran' && dag.tid !== 'etter') {
            return (
                <>
                    <input type="checkbox"
                        id={`${sporsmal.id}_${ukeidx}_${idx}`}
                        value={dag.dayjs.format('YYYY-MM-DD')}
                        {...register(sporsmal.id, { required: feilmelding.global })}
                        className={'checkboks' + (watchDager?.includes(dag.dayjs.format('YYYY-MM-DD')) ? ' checked' : '')}
                    />
                    <label htmlFor={`${sporsmal.id}_${ukeidx}_${idx}`}>
                        {dag.dayjs.format('DD')}
                    </label>
                </>
            )
        } else {
            return <span className="label">{dag.dayjs.format('DD')}</span>
        }
    }

    return (
        <>
            <SporsmalstekstH3 sporsmal={sporsmal} />

            <div className="skjemaelement skjema__dager" tabIndex={-1} >
                <Normaltekst tag="h4" className="kalender__tittel">{kalTittel()}</Normaltekst>
                <div className="ukedager">
                    <span>uke</span>
                    <span>Man</span>
                    <span>Tir</span>
                    <span>Ons</span>
                    <span>Tor</span>
                    <span>Fre</span>
                    <span>Lør</span>
                    <span>Søn</span>
                </div>

                {alledager.map((ukedager: KalenderDag[], ukeidx: number) => {
                    return (
                        <div className="kalenderuke" key={ukeidx}>
                            <div className="ukenr">{uker[ukeidx]}</div>

                            {ukedager.map((dag, idx) => {
                                const sunday = dag.dayjs.isoWeekday() === 7 ? 'sun' : ''
                                return (
                                    <div className={`kalenderdag ${dag.tid} ${sunday}`} key={idx}>
                                        {kalenderdag(dag, ukeidx, idx)}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}

                <FeilLokal sporsmal={sporsmal} />

                <Normaltekst className="kalendervalg">
                    <button type="button" className="lenkeknapp velgalle" onClick={velgAlle}>
                        {tekst('sporsmal.egen-bil.kalender.ukedager')}
                    </button>
                    <button type="button" className="lenkeknapp fjernalle" onClick={fjernAlle}>
                        <img src={SlettIkon} alt="" />
                        {tekst('sporsmal.egen-bil.kalender.fjern')}
                    </button>
                </Normaltekst>
            </div>
        </>
    )
}

export default DagerKomp
