import { BodyShort } from '@navikt/ds-react'
import cls from 'classnames'
import parser from 'html-react-parser'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import BjornBildeLiten from './bjorn-bilde-liten'
import BjornBildeStor from './bjorn-bilde-stor'

interface BjornProps {
    bildeAlt?: string
    nokkel?: string
    children?: React.ReactElement
    hvit?: boolean
    stor?: boolean
    vertikal?: boolean
    ekstraMarginTop?: boolean
    className?: string
}

export const Bjorn = ({
    bildeAlt = 'NAV-ansatt',
    nokkel,
    children,
    hvit = false,
    stor = false,
    vertikal = false,
    ekstraMarginTop = false,
    className = '',
}: BjornProps) => {
    const classNames = cls(`hjelpeboble ${className}`, {
        'hjelpeboble--horisontal': !vertikal,
        'hjelpeboble--margin--top': ekstraMarginTop,
    })

    const bobleClassNames = cls({
        hjelpeboble__boble: true, // eslint-disable-line
        'hjelpeboble__boble--hvit': hvit,
        'hjelpeboble__boble--stor': stor,
        'hjelpeboble__boble--horisontal': !vertikal,
    })

    const bildeClassNames = cls({
        hjelpeboble__bilde: true, // eslint-disable-line
        'hjelpeboble__bilde--hvit': hvit,
        'hjelpeboble__bilde--stor': stor,
        'hjelpeboble__bilde--horisontal': !vertikal,
    })

    const Bilde = stor ? BjornBildeStor : BjornBildeLiten

    return (
        <div className={classNames}>
            <div className={bobleClassNames}>
                {nokkel !== undefined ? (
                    <BodyShort>{parser(tekst(nokkel as any))}</BodyShort>
                ) : (
                    children
                )}
            </div>
            <div className={bildeClassNames}>
                <Bilde alt={bildeAlt} />
            </div>
        </div>
    )
}

export default Bjorn
