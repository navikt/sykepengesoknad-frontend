import cls from 'classnames'
import React from 'react'
import { useNavigate, useParams } from 'react-router'
import { useLocation } from 'react-router-dom'

import { SEPARATOR } from '../../../utils/constants'
import Vis from '../../vis'
import { pathUtenSteg } from '../sporsmal-utils'
import useSoknad from '../../../hooks/useSoknad'
import { logEvent } from '../../amplitude/amplitude'
import { RouteParams } from '../../../app'

const innerCls = (aktiv: boolean, ferdig: boolean, disabled: boolean) =>
    cls('stegindikator__steg-inner', {
        'stegindikator__steg-inner--aktiv': aktiv,
        'stegindikator__steg-inner--ferdig': ferdig,
        'stegindikator__steg-inner--disabled': disabled,
        'stegindikator__steg-inner--interaktiv': !aktiv,
    })

export interface StegProps {
    label: string
    index: number
}

const Steg = ({ label, index }: StegProps) => {
    const { id, stegId } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)
    const navigate = useNavigate()
    const location = useLocation()

    const aktivtSteg = parseInt(stegId!)
    const num = index + 1
    const erAktiv = aktivtSteg === num
    const erPassert = aktivtSteg > num
    const disabled = !erPassert && !erAktiv

    function goTo(idx: number) {
        logEvent('navigere', {
            fra: valgtSoknad!.sporsmal[aktivtSteg - 1].tag,
            til: valgtSoknad!.sporsmal[idx - 1].tag,
        })
        navigate(pathUtenSteg(location.pathname) + SEPARATOR + idx + location.search)
    }

    return (
        <li className="stegindikator__steg" aria-current={erAktiv ? 'step' : undefined}>
            <Vis
                hvis={aktivtSteg >= index + 2}
                render={() => (
                    <button
                        className={innerCls(erAktiv, erPassert, disabled)}
                        title={label}
                        disabled={disabled}
                        onClick={() => goTo(num)}
                    >
                        <div className="stegindikator__steg-num">{num}</div>
                    </button>
                )}
            />

            <Vis
                hvis={aktivtSteg < index + 2}
                render={() => (
                    <div className={innerCls(erAktiv, erPassert, disabled)} title={label}>
                        <div className="stegindikator__steg-num">{num}</div>
                    </div>
                )}
            />
        </li>
    )
}

export default Steg
