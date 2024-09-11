import React from 'react'
import Link from 'next/link'

import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSvartype } from '../../types/rs-types/rs-svartype'
import { Soknad } from '../../types/types'
import { RSSoknadmetadata } from '../../types/rs-types/rs-soknadmetadata'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'

interface SoknadLinkProps {
    soknad: RSSoknadmetadata
    children: React.ReactNode
    className: string
}

export const urlTilSoknad = (soknad: Soknad | RSSoknadmetadata, medQueryParams = true, skipUtlandInfoside = false) => {
    const queryParams = medQueryParams ? window.location.search : ''

    if (soknad.soknadstype == RSSoknadstype.OPPHOLD_UTLAND && !skipUtlandInfoside) {
        return utlandsoknadPath + queryParams
    }

    switch (soknad.status) {
        case RSSoknadstatus.SENDT:
            return `/sendt/${soknad.id}${queryParams}`
        case RSSoknadstatus.AVBRUTT:
            return `/avbrutt/${soknad.id}${queryParams}`
        case RSSoknadstatus.UTKAST_TIL_KORRIGERING:
            return `/soknader/${soknad.id}/1${queryParams}`
    }

    const soknaderUrl = `/soknader/${soknad.id}`

    return soknad instanceof Soknad && erDelvisUtfylt(soknad)
        ? `${soknaderUrl}/${finnPosisjonPaSisteBesvarteSporsmal(soknad) + 1}${queryParams}`
        : `${soknaderUrl}/1${queryParams}`
}

const erDelvisUtfylt = (soknad: Soknad): boolean => {
    const antallRelevanteSporsmal = hentRelevanteSporsmal(soknad).length
    const posisjonPaSisteBesvarteSporsmal = finnPosisjonPaSisteBesvarteSporsmal(soknad)
    return posisjonPaSisteBesvarteSporsmal > 0 && posisjonPaSisteBesvarteSporsmal !== antallRelevanteSporsmal
}

const hentRelevanteSporsmal = (soknad: Soknad) => {
    return soknad.sporsmal.filter((sporsmal) => sporsmal.svartype !== RSSvartype.IKKE_RELEVANT)
}

const finnPosisjonPaSisteBesvarteSporsmal = (soknad: Soknad) => {
    const reversertSporsmalsListe = hentRelevanteSporsmal(soknad).slice().reverse()
    let ubesvarteSporsmal = 0

    for (const sporsmal of reversertSporsmalsListe) {
        if (sporsmal.svarliste.svar.length > 0) {
            break
        }
        ubesvarteSporsmal++
    }
    return reversertSporsmalsListe.length - ubesvarteSporsmal
}

const SoknadLink = ({ soknad, children, className }: SoknadLinkProps) => {
    const url = urlTilSoknad(soknad)

    return (
        <Link href={url} className={`${className}`}>
            {children}
        </Link>
    )
}

export const utlandsoknadPath = '/sykepengesoknad-utland'
export const utlandssoknadUrl = `/syk/sykepengesoknad${utlandsoknadPath}`

export const oversiktside = '/'

export default SoknadLink
