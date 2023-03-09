import { Link } from '@navikt/ds-react'
import parser, { HTMLReactParserOptions, Element, domToReact } from 'html-react-parser'

export const parserWithReplace = (html: string) => parser(html, htmlParserOptionsWithReplace)

const htmlParserOptionsWithReplace: HTMLReactParserOptions = {
    replace: (domNode) => {
        if (domNode instanceof Element && domNode.attribs) {
            if (domNode.name === 'a' && domNode.attribs.href) {
                return <Link {...domNode.attribs}>{domToReact(domNode.children, htmlParserOptionsWithReplace)}</Link>
            }
        }
    },
}
