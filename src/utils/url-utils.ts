import { RSSoknadstatus } from '../types/rs-types/rs-soknadstatus'
import { RSSvartype } from '../types/rs-types/rs-svartype'
import { Soknad } from '../types/types'

export const getUrlTilSoknad = (soknad: Soknad) => {
    if (soknad.status === RSSoknadstatus.SENDT) {
        return `/kvittering/${soknad.id}`
    }
    if (soknad.status === RSSoknadstatus.AVBRUTT) {
        return `/soknader/${soknad.id}/1`   // TODO: Denne burde ligge under kvittering
    }

    const soknaderUrl = `/soknader/${soknad.id}`

    return erDelvisUtfylt(soknad)
        ? `${soknaderUrl}/${finnPosisjonPaSisteBesvarteSporsmal(soknad) + 1}`
        : `${soknaderUrl}/1`
}

export const erDelvisUtfylt = function(soknad: Soknad): boolean {
    const antallRelevanteSporsmal = hentRelevanteSporsmal(soknad).length
    const posisjonPaSisteBesvarteSporsmal = finnPosisjonPaSisteBesvarteSporsmal(soknad)
    return posisjonPaSisteBesvarteSporsmal > 0 && (posisjonPaSisteBesvarteSporsmal !== antallRelevanteSporsmal)
}

const hentRelevanteSporsmal = function(soknad: Soknad) {
    return soknad.sporsmal.filter((sporsmal) => sporsmal.svartype !== RSSvartype.IKKE_RELEVANT)
}

const finnPosisjonPaSisteBesvarteSporsmal = function(soknad: Soknad) {
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

export const utlandssoknadUrl = '/syk/sykepengesoknad/sykepengesoknad-utland'

export const oversiktside = '/'
