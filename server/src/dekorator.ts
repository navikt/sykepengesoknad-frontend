import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr'

import { logger } from './logger'

export const getHtmlWithDecorator = (filePath) =>
    injectDecoratorServerSide({
        dekoratorenUrl: process.env.DECORATOR_URL,
        env: process.env.DECORATOR_ENV as any,
        filePath: filePath,
        simple: true,
        chatbot: false,
        urlLookupTable: false,
    })
