import { BodyLong, Button, Detail, Heading, LinkPanel, Tag } from '@navikt/ds-react'
import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

import { cn } from '../../utils/tw-utils'
import { RSSoknadstatus, RSSoknadstatusType } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadmetadata } from '../../types/rs-types/rs-soknadmetadata'
import { urlTilSoknad } from '../soknad/soknad-link'
import Vis from '../vis'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { tilLesbarDatoMedArstall, tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import { isOpplaering } from '../../utils/environment'
import { getLedetekst, tekst } from '../../utils/tekster'

import { leggTilSoknadstypeForDemoside, periodeListevisning, teaserTittel } from './teaser-util'

export const ListevisningLenkepanel = ({ soknad, onClick }: { soknad: RSSoknadmetadata; onClick?: () => void }) => {
    const orange = () => {
        if (soknad.status == 'NY') {
            return true
        }

        if (soknad.status == 'UTKAST_TIL_KORRIGERING') {
            return true
        }
        return false
    }
    const StyletLinkPanel = ({ paddingBottom, href }: { paddingBottom: boolean; href?: string }) => {
        return (
            <LinkPanel
                className={cn('p-6 [&>div]:w-full', {
                    'mb-4': paddingBottom,
                    'border-orange-300 bg-orange-50 hover:border-orange-500': orange(),
                })}
                border
                href={href}
            >
                <div className={'flex gap-3 max-[560px]:flex-col'}>
                    <div className="grow">
                        <>
                            <header>
                                <Vis
                                    hvis={soknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND}
                                    render={() => <Detail>{tilLesbarPeriodeMedArstall(soknad.fom, soknad.tom)}</Detail>}
                                />
                                <Heading size="small" level="3" className={'my-1'}>
                                    {teaserTittel(soknad)}
                                </Heading>
                            </header>
                            {periodeListevisning(soknad)}
                            <Vis hvis={isOpplaering()} render={() => leggTilSoknadstypeForDemoside(soknad)} />
                        </>
                    </div>
                    <div className="flex shrink-0 items-center">
                        <SoknadTag soknad={soknad} />
                    </div>
                </div>
            </LinkPanel>
        )
    }

    if (onClick) {
        return (
            <Button
                data-cy={`button-listevisning-${soknad.id}`}
                className={'mb-4 w-full p-0  text-left [&>span]:w-full'}
                onClick={() => {
                    onClick()
                }}
            >
                <StyletLinkPanel paddingBottom={false}></StyletLinkPanel>
            </Button>
        )
    }
    return (
        <Link to={urlTilSoknad(soknad)} data-cy={`link-listevisning-${soknad.id}`}>
            <StyletLinkPanel paddingBottom={true}></StyletLinkPanel>
        </Link>
    )
}

export const SoknadTag = ({ soknad }: { soknad: RSSoknadmetadata }) => {
    const tekst = hentTeaserStatustekst(soknad)
    if (!tekst) return null
    const type = statusTilType(soknad.status)
    return (
        <Tag variant={type} size="small">
            {tekst}
        </Tag>
    )
}

const statusTilType = (status: RSSoknadstatusType) => {
    switch (status) {
        case RSSoknadstatus.SENDT:
            return 'success'
        case RSSoknadstatus.UTGAATT:
        case RSSoknadstatus.FREMTIDIG:
            return 'info'
        case RSSoknadstatus.AVBRUTT:
            return 'warning'
        default:
            return 'info'
    }
}

const hentTeaserStatustekst = (soknad: RSSoknadmetadata) => {
    if (soknad.status === RSSoknadstatus.AVBRUTT || soknad.status === RSSoknadstatus.UTGAATT) {
        return tekst(`soknad.teaser.status.${soknad.status}` as any)
    }
    if (soknad.status === RSSoknadstatus.FREMTIDIG) {
        return getLedetekst(tekst(`soknad.teaser.status.${soknad.status}` as any), {
            '%DATO%': tilLesbarDatoMedArstall(dayjs(soknad.tom).add(1, 'day')),
        })
    }
    if (soknad.status === RSSoknadstatus.SENDT) {
        if (soknad.sendtTilArbeidsgiverDato) {
            if (soknad.sendtTilNAVDato) {
                return tekst(`soknad.teaser.status.${soknad.status}.til-arbeidsgiver-og-nav` as any)
            }
            return tekst(`soknad.teaser.status.${soknad.status}.til-arbeidsgiver` as any)
        }
        return tekst(`soknad.teaser.status.${soknad.status}.til-nav` as any)
    }
    if (soknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING) {
        return tekst('soknad.teaser.utkast-korrigering.tekst')
    }
    return null
}
