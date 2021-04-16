import cls from 'classnames'
import React from 'react'
import { useHistory, useParams } from 'react-router'

import { RouteParams } from '../../../app'
import { useAppStore } from '../../../data/stores/app-store'
import { SEPARATOR } from '../../../utils/constants'
import { useAmplitudeInstance } from '../../amplitude/amplitude'
import VisBlock from '../../vis-block'
import { pathUtenSteg } from '../sporsmal-utils'

const innerCls = (aktiv: boolean, ferdig: boolean, disabled: boolean) =>
    cls('stegindikator__steg-inner', {
        'stegindikator__steg-inner--aktiv': aktiv,
        'stegindikator__steg-inner--ferdig': ferdig,
        'stegindikator__steg-inner--disabled': disabled,
        'stegindikator__steg-inner--interaktiv': !aktiv
    })

export interface StegProps {
    label: string;
    index: number;
}

const Steg = ({ label, index }: StegProps) => {
    const { stegId } = useParams<RouteParams>()
    const { valgtSoknad } = useAppStore()
    const { logEvent } = useAmplitudeInstance()
    const aktivtSteg = parseInt(stegId)
    const num = index + 1
    const erAktiv = aktivtSteg === num
    const erPassert = aktivtSteg > num
    const disabled = !erPassert && !erAktiv
    const history = useHistory()

    function goTo(idx: number) {
        logEvent('navigere', { fra: valgtSoknad!.sporsmal[aktivtSteg - 1].tag, til: valgtSoknad!.sporsmal[idx - 1].tag })
        history.push(pathUtenSteg(history.location.pathname) + SEPARATOR + (idx))
    }

    return (
        <li className="stegindikator__steg" aria-current={(erAktiv) ? 'step' : undefined}>
            <VisBlock hvis={aktivtSteg >= index + 2}
                render={() => {
                    return (
                        <button className={innerCls(erAktiv, erPassert, disabled)}
                            title={label} disabled={disabled}
                            onClick={() => goTo(num)}
                        >
                            <div className="stegindikator__steg-num">{num}</div>
                        </button>
                    )
                }}
            />

            <VisBlock hvis={aktivtSteg < index + 2}
                render={() => {
                    return (
                        <div className={innerCls(erAktiv, erPassert, disabled)} title={label}>
                            <div className="stegindikator__steg-num">{num}</div>
                        </div>
                    )
                }}
            />
        </li>
    )
}

export default Steg
