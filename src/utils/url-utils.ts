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

export const utlandssoknadUrl =  '/syk/sykepengesoknad/sykepengesoknad-utland'

export const oversiktside = '/'
