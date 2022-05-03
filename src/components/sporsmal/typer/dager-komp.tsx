import { BodyShort } from '@navikt/ds-react'
import dayjs, { Dayjs } from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { maaneder, sammeAar, sammeMnd } from '../../../utils/dato-utils'
import { tekst } from '../../../utils/tekster'
import FeilLokal from '../../feil/feil-lokal'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import SporsmalstekstH3 from '../sporsmalstekst/sporsmalstekstH3'

dayjs.extend(weekOfYear)
dayjs.extend(isoWeek)

interface KalenderUke {
    ukenr: number
    dager: KalenderDag[]
}

interface KalenderDag {
    dayjs: Dayjs
    tid: 'foran' | 'etter' | 'inni'
}

const DagerKomp = ({ sporsmal }: SpmProps) => {
    const { register, setValue } = useFormContext()
    const feilmelding = hentFeilmelding(sporsmal)
    const watchDager = useWatch({ name: sporsmal.id })

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

    const min = dayjs(sporsmal.min!)
    const max = dayjs(sporsmal.max!)
    const forsteDagIKalender = min.startOf('isoWeek')
    const sisteDagIKalender = max.endOf('isoWeek')

    const alleUker: KalenderUke[] = []
    for (let uke = forsteDagIKalender; uke.endOf('isoWeek') <= sisteDagIKalender; uke = uke.add(1, 'week')) {
        const dager: KalenderDag[] = []
        for(let dag = uke.startOf('isoWeek'); dag <= uke.endOf('isoWeek'); dag = dag.add(1, 'day')) {
            if (dag < min) {
                dager.push({ dayjs: dag, tid: 'foran' })
            } else if (dag > max) {
                dager.push({ dayjs: dag, tid: 'etter' })
            } else {
                dager.push({ dayjs: dag, tid: 'inni' })
            }
        }
        alleUker.push({
            ukenr: uke.isoWeek(),
            dager: dager
        })
    }

    const velgAlleUkedager = () => {
        const dager: string[] = []
        alleUker.forEach((uke: KalenderUke) => {
            uke.dager.forEach((dag) => {
                if (dag.tid === 'inni' && dag.dayjs.isoWeekday() <= 5) {
                    dager.push(dag.dayjs.format('YYYY-MM-DD'))
                }
            })
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
                <BodyShort as="h4" className="kalender__tittel">{kalTittel()}</BodyShort>
                <BodyShort as="div" className="ukedager">
                    <span>uke</span>
                    <span>Man</span>
                    <span>Tir</span>
                    <span>Ons</span>
                    <span>Tor</span>
                    <span>Fre</span>
                    <span>Lør</span>
                    <span>Søn</span>
                </BodyShort>

                {alleUker.map((uke: KalenderUke) => {
                    return (
                        <div className="kalenderuke" key={uke.ukenr}>
                            <div className="ukenr">{uke.ukenr}</div>

                            {uke.dager.map((dag, idx) => {
                                const sunday = dag.dayjs.isoWeekday() === 7 ? 'sun' : ''
                                return (
                                    <div className={`kalenderdag ${dag.tid} ${sunday}`} key={idx}>
                                        {kalenderdag(dag, uke.ukenr, idx)}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}

                <FeilLokal sporsmal={sporsmal} />

                <BodyShort className="kalendervalg">
                    <button type="button" className="lenkeknapp velgalle" onClick={velgAlleUkedager}>
                        {tekst('sporsmal.egen-bil.kalender.ukedager')}
                    </button>
                    <button type="button" className="lenkeknapp fjernalle" onClick={fjernAlle}>
                        <img src="/syk/sykepengesoknad/static/slettknapp.svg" alt="" />
                        {tekst('sporsmal.egen-bil.kalender.fjern')}
                    </button>
                </BodyShort>
            </div>
        </>
    )
}

export default DagerKomp
