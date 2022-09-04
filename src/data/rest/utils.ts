import { logger } from '../../utils/logger'

export const redirectTilLoginHvis401 = (response: Response) => {
    if (response.status == 401) {
        logger.info('Redirecter til login grunnet 401.')
        window.location.reload()
        return true
    }
    return false
}
