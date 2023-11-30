import type { NextApiRequest, NextApiResponse } from 'next'
import { logger } from '@navikt/next-logger'

type Data = {
    message: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
    logger.info('Next.js server: received pre stop request, waiting for 10s before starting shutdown')
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve()
        }, 10_000)
    })
    logger.info('Next.js server: starting shutdown')
    res.status(200).json({ message: 'ready for shutdown' })
}

export default handler
