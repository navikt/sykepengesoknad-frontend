import { Link } from '@navikt/ds-react'
import parser, { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'
import React from 'react'
import { ExternalLinkIcon } from '@navikt/aksel-icons'

export const tekstMedHtml = (html: string) => parser(html, htmlParserOptionsWithReplace)

const htmlParserOptionsWithReplace: HTMLReactParserOptions = {
    replace: (domNode) => {
        if (domNode instanceof Element && domNode.attribs) {
            if (domNode.name === 'a' && domNode.attribs.href) {
                return (
                    <Link {...domNode.attribs}>
                        {domToReact(domNode.children as DOMNode[], htmlParserOptionsWithReplace)}
                        <ExternalLinkIcon aria-hidden={true} />
                    </Link>
                )
            }
            if (domNode.name === 'li') {
                return (
                    <li className="mt-2" {...domNode.attribs}>
                        {domToReact(domNode.children as DOMNode[], htmlParserOptionsWithReplace)}
                    </li>
                )
            }
        }
    },
}
