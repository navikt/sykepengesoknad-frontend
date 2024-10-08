import 'node-fetch'

import { DecoratorComponentsReact, fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr'
import getConfig from 'next/config'
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

import { createInitialServerSideBreadcrumbs } from '../hooks/useBreadcrumbs'

const { serverRuntimeConfig } = getConfig()

// The 'head'-field of the document initialProps contains data from <head> (meta-tags etc)
const getDocumentParameter = (initialProps: DocumentInitialProps, name: string) => {
    return initialProps.head?.find((element) => element?.props?.name === name)?.props?.content
}

interface Props {
    Decorator: DecoratorComponentsReact
    language: string
}

class MyDocument extends Document<Props> {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & Props> {
        const initialProps = await Document.getInitialProps(ctx)

        const Decorator = await fetchDecoratorReact({
            env: serverRuntimeConfig.decoratorEnv,
            params: {
                simple: true,
                chatbot: false,
                feedback: false,
                breadcrumbs: createInitialServerSideBreadcrumbs(ctx.pathname, ctx.query),
            },
        })

        const language = getDocumentParameter(initialProps, 'lang')

        return { ...initialProps, Decorator, language }
    }

    render(): JSX.Element {
        const { Decorator, language } = this.props
        const showDecorator = serverRuntimeConfig.noDecorator != 'true'

        return (
            <Html lang={language || 'no'}>
                <Head>{showDecorator && <Decorator.HeadAssets />}</Head>
                <body>
                    {showDecorator && <Decorator.Header />}
                    <Main />
                    {showDecorator && (
                        <>
                            <Decorator.Footer />
                            <Decorator.Scripts />
                        </>
                    )}
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
