import { RSSoknadstatus } from '../types/rs-types/rs-soknadstatus'
import { Soknad } from '../types/types'
import env from './environment'

export const getUrlTilSoknad = (soknad: Soknad) => {
    if (soknad.status === RSSoknadstatus.SENDT) {
        return `/kvittering/${soknad.id}`
    }
    if (soknad.status === RSSoknadstatus.AVBRUTT) {
        return `/soknader/${soknad.id}/1`   // TODO: Denne burde ligge under kvittering
    }
    return `/soknader/${soknad.id}/1`
}


const basenameUtenTrailingSlash = () => {
    const baseName = env.baseName
    if (baseName.endsWith('/')) {
        return baseName.substring(0, baseName.length - 1)
    }
    return baseName
}


export const utlandssoknadUrl = basenameUtenTrailingSlash() + '/sykepengesoknad-utland'

export const oversiktside = '/'
