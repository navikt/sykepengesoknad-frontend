import { Soknad } from '../types/types'

export const getUrlTilSoknad = (soknad: Soknad, stegId: string | undefined) => {
    const baseUrl = `/soknader/${soknad.id}`
    return stegId
        ? `${baseUrl}/${stegId}`
        : baseUrl
}


export const utlandssoknadUrl = '/sykepengesoknad-utland'

export const oversiktside = '/'
