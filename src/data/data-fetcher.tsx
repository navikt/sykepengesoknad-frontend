import Spinner from 'nav-frontend-spinner'
import React, { useEffect } from 'react'

import IngenData from '../pages/feil/ingen-data'
import { RSSoknad } from '../types/rs-types/rs-soknad'
import { Soknad, Sykmelding } from '../types/types'
import { UnleashToggles } from '../types/types'
import env from '../utils/environment'
import { logger } from '../utils/logger'
import { unleashKeys } from './mock/data/toggles'
import useFetch from './rest/use-fetch'
import { FetchState, hasAny401, hasAnyFailed, hasData, isAnyNotStartedOrPending, isNotStarted } from './rest/utils'
import { useAppStore } from './stores/app-store'

export function DataFetcher(props: { children: any }) {
    const { setUnleash, setSoknader, setSykmeldinger } = useAppStore()

    const unleash = useFetch<{}>()
    const rssoknader = useFetch<RSSoknad[]>()
    const sykmeldinger = useFetch<Sykmelding[]>()

    useEffect(() => {
        if (isNotStarted(unleash)) {
            unleash.fetch(env.unleashUrl, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(unleashKeys),
                headers: { 'Content-Type': 'application/json' }
            }, (fetchState: FetchState<UnleashToggles>) => {
                setUnleash(fetchState.data as any)
            })
        }
        if (isNotStarted(rssoknader)) {
            rssoknader.fetch(env.syfoapiRoot + '/syfosoknad/api/soknader', {
                credentials: 'include',
            }, (fetchState: FetchState<RSSoknad[]>) => {
                if (hasData(fetchState)) {
                    setSoknader(fetchState.data!.map(soknad => {
                        return new Soknad(soknad)
                    }))
                }
            })
        }
        if (isNotStarted(sykmeldinger)) {
            sykmeldinger.fetch(env.syforestRoot + '/sykmeldinger', {
                credentials: 'include',
            }, (fetchState: FetchState<Sykmelding[]>) => {
                if (hasData(fetchState)) {
                    setSykmeldinger(fetchState.data)
                }
            })
        }
        // eslint-disable-next-line
    }, [rssoknader]);

    if (isAnyNotStartedOrPending([ unleash, rssoknader, sykmeldinger ])) {
        return <Spinner type={'XXL'} />

    } else if (hasAny401([ unleash, rssoknader, sykmeldinger ])) {
        window.location.href = `${hentLoginUrl()}?redirect=${window.location.href}`

    } else if (hasAnyFailed([ unleash, rssoknader, sykmeldinger ])) {
        logger.error('Klarer ikke hente en av disse [ unleash, rssoknader, sykmeldinger ]')
        return <IngenData />
    }

    return props.children
}

export const hentLoginUrl = () => {
    window.localStorage.setItem('REDIRECT_ETTER_LOGIN', window.location.href)
    return env.loginServiceUrl
}
