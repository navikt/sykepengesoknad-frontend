import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { RouteParams } from '../../app'
import { useAppStore } from '../../data/stores/app-store'
import env from '../../utils/environment'
import VisBlock from '../vis-block'

const SykSokLokalt = () => {
    const { valgtSoknad, valgtSykmelding } = useAppStore()
    const { stegId } = useParams<RouteParams>()
    const [ width, setWidth ] = useState<number>(window.innerWidth)

    // eslint-disable-next-line
    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth) as any)
        return () => window.removeEventListener('resize', () => setWidth(window.innerWidth) as any)
    })

    if (!env.isDev) {
        return null
    }

    if (!valgtSoknad || !valgtSoknad.sporsmal || !stegId || Number(stegId) >= valgtSoknad.sporsmal.length) {
        return null
    }

    return (
        <VisBlock hvis={width > 767}
            render={()=>{
                return (
                    <div style={{ position: 'absolute', left: 0, fontSize: '10px', marginLeft: '1rem', color: 'gray' }}>
                        <span>type <strong>{valgtSoknad.soknadstype} </strong></span>
                        <span>sok <strong>{
                            valgtSoknad &&
                            valgtSoknad.id.substring(valgtSoknad.id.length - 6, valgtSoknad.id.length)
                        }</strong></span>
                        &nbsp;&nbsp;
                        <span>syk <strong>{
                            valgtSykmelding &&
                            valgtSykmelding.id.substring(valgtSykmelding.id.length - 6, valgtSykmelding.id.length)
                        }</strong></span>
                        &nbsp;&nbsp;
                        <span>spm <strong>{valgtSoknad && valgtSoknad.sporsmal[Number(stegId) - 1].id}</strong>
                            <strong>{valgtSoknad && valgtSoknad.sporsmal[Number(stegId) - 1].tag}</strong>
                        </span>
                    </div>
                )
            }}
        />
    )
}

export default SykSokLokalt
