import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr'


export const getHtmlWithDecorator = (filePath) =>
    injectDecoratorServerSide({
        env: process.env.DECORATOR_ENV as any,
        filePath: filePath,
        simple: true,
        chatbot: false,
        urlLookupTable: false,
    })

