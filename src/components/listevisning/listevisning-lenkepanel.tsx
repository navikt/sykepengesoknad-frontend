import { Button, LinkPanel, Tag, BodyShort } from '@navikt/ds-react'
import { addDays } from 'date-fns'
import React from 'react'
import Link from 'next/link'
import { InformationIcon } from '@navikt/aksel-icons'

import { cn } from '../../utils/tw-utils'
import { RSSoknadstatus, RSSoknadstatusType } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadmetadata } from '../../types/rs-types/rs-soknadmetadata'
import { urlTilSoknad } from '../soknad/soknad-link'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { tilLesbarDatoMedArstall, tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import { getLedetekst, tekst } from '../../utils/tekster'

import { periodeListevisning, teaserTittel } from './teaser-util'
import { isMockBackend, isOpplaering } from '../../utils/environment'

const StyletLinkPanel = ({ soknad, paddingBottom }: { soknad: RSSoknadmetadata; paddingBottom: boolean }) => {
    const orange = soknad.status === 'NY' || soknad.status === 'UTKAST_TIL_KORRIGERING'
    const erDemo = isMockBackend() || isOpplaering()

    return (
        <LinkPanel
            className={cn('p-6 [&>div]:w-full', {
                'mb-4': paddingBottom,
                'border-ax-border-warning-subtle bg-ax-bg-warning-soft hover:border-ax-border-warning': orange,
            })}
            as="div"
            border
        >
            <div className="flex gap-3 max-[560px]:flex-col">
                <div className="grow">
                    {erDemo && soknad.demoinfo && (
                        <Tag
                            className="mb-2 inline-flex items-center gap-1 rounded px-2 py-1 text-sm bg-ax-bg-meta-lime-moderate"
                            icon={<InformationIcon aria-hidden />}
                        >
                            {`Demoinfo: ${soknad.demoinfo}`}
                        </Tag>
                    )}
                    <LinkPanel.Title>
                        {soknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND && (
                            <BodyShort size="small" spacing>
                                {tilLesbarPeriodeMedArstall(soknad.fom, soknad.tom)}
                            </BodyShort>
                        )}
                        {teaserTittel(soknad)}
                    </LinkPanel.Title>
                    <LinkPanel.Description>{periodeListevisning(soknad)}</LinkPanel.Description>
                </div>
                <div className="flex shrink-0 items-center">
                    <SoknadTag soknad={soknad} />
                </div>
            </div>
        </LinkPanel>
    )
}

export const ListevisningLenkepanel = ({ soknad, onClick }: { soknad: RSSoknadmetadata; onClick?: () => void }) => {
    if (onClick) {
        return (
            <Button
                type="button"
                data-testid={`button-listevisning-${soknad.id}`}
                className="mb-4 w-full p-0  text-left [&>span]:w-full"
                onClick={() => {
                    onClick()
                }}
            >
                <StyletLinkPanel soknad={soknad} paddingBottom={false} />
            </Button>
        )
    }
    const skipUtlandInfoside =
        (soknad.status == 'AVBRUTT' || soknad.status == 'SENDT') && soknad.soknadstype == 'OPPHOLD_UTLAND'
    return (
        <Link href={urlTilSoknad(soknad, true, skipUtlandInfoside)} data-testid={`link-listevisning-${soknad.id}`}>
            <StyletLinkPanel soknad={soknad} paddingBottom={true} />
        </Link>
    )
}

export const SoknadTag = ({ soknad }: { soknad: RSSoknadmetadata }) => {
    const tekst = hentTeaserStatustekst(soknad)
    if (!tekst) return null
    const type = statusTilType(soknad.status)
    return (
        <Tag variant={type} size="small">
            <span className="sr-only">, status:</span>
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
            '%DATO%': tilLesbarDatoMedArstall(addDays(soknad.tom!, 1)),
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
