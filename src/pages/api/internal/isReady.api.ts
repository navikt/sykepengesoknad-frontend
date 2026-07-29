import type { NextApiRequest, NextApiResponse } from 'next'

import { checkJwks } from '../../../utils/checkIdportenJwks'
import { bundledEnv, getServerEnv } from '../../../utils/env'

type Data = {
    message: string
}

const isReady = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
    const jwksOk = await checkJwks()
    if (!jwksOk) {
        res.status(500).json({ message: 'Not ready: JWKS check failed' })
        return
    }

    // Valider server-side env vars kun i sky-miljøer (ikke i demo/mock)
    if (!bundledEnv.NEXT_PUBLIC_MOCK_BACKEND) {
        try {
            getServerEnv()
        } catch (e) {
            res.status(500).json({ message: `Not ready: server env validation failed — ${e}` })
            return
        }
    }

    res.status(200).json({ message: "I'm ready!" })
}

export default isReady
