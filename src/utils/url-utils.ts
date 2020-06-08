import { Soknad } from '../types/types'
import env from './environment'

export const getUrlTilSoknad = (soknad: Soknad, stegId: string | undefined) => {
    const baseUrl = `/soknader/${soknad.id}`
    return stegId
        ? `${baseUrl}/${stegId}`
        : baseUrl
}


const basenameUtenTrailingSlash = () => {
    const baseName = env.baseName
    if (baseName.endsWith('/')) {
        return baseName.substring(0, baseName.length - 1)
    }
    return baseName
}


export const utlandssoknadUrl = basenameUtenTrailingSlash() + '/sykepengesoknad-utland'
