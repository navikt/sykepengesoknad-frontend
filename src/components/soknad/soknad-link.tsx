import React from 'react'
import { Link } from 'react-router-dom'

import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSvartype } from '../../types/rs-types/rs-svartype'
import { Soknad } from '../../types/types'

interface SoknadLinkProps {
    soknad: Soknad
    children: React.ReactNode
    className: string
}

export const urlTilSoknad = (soknad: Soknad) => {
    switch (soknad.status) {
        case RSSoknadstatus.SENDT:
            return `/sendt/${soknad.id}${window.location.search}`
        case RSSoknadstatus.AVBRUTT:
            return `/avbrutt/${soknad.id}${window.location.search}`
        case RSSoknadstatus.UTKAST_TIL_KORRIGERING:
            return `/soknader/${soknad.id}/1${window.location.search}`
    }

    const soknaderUrl = `/soknader/${soknad.id}`
    return erDelvisUtfylt(soknad)
        ? `${soknaderUrl}/${finnPosisjonPaSisteBesvarteSporsmal(soknad) + 1}${window.location.search}`
        : `${soknaderUrl}/1${window.location.search}`
}

export const erDelvisUtfyltNySoknad = (soknad: Soknad): boolean => {
    return erDelvisUtfylt(soknad) && soknad.status !== RSSoknadstatus.UTKAST_TIL_KORRIGERING
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
        <Link to={url} className={`${className}`}>
            {children}
        </Link>
    )
}

export const utlandssoknadUrl = '/syk/sykepengesoknad/sykepengesoknad-utland'

export const oversiktside = '/'

export default SoknadLink
