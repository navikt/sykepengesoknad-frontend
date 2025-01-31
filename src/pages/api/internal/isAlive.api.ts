import type { NextApiRequest, NextApiResponse } from 'next'

import { checkJwks } from '../../../utils/checkIdportenJwks'

type Data = {
    message: string
}

const isAlive = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
    const jwksOk = await checkJwks()

    if (jwksOk) {
        res.status(200).json({ message: "I'm ready!" })
    } else {
        res.status(500).json({ message: 'Not ready: JWKS check failed' })
    }
}

export default isAlive
