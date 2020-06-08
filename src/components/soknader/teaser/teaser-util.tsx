import dayjs from 'dayjs'
import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import SoknaderHoverIkon from '../../../pages/soknader/soknader-hover.svg'
import SoknaderIkon from '../../../pages/soknader/soknader.svg'
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { Soknad } from '../../../types/types'
import { getRiktigDato, getSendtTilSuffix } from '../../../utils/soknad-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'
import GlobeHoverIkon from './globe-hover.svg'
import GlobeIkon from './globe.svg'

export const erSendtTilBeggeMenIkkeSamtidig = (soknad: Soknad) => {
    return soknad.sendtTilNAVDato && soknad.sendtTilArbeidsgiverDato
        && soknad.sendtTilNAVDato.getTime() !== soknad.sendtTilArbeidsgiverDato.getTime()
}

export const finnArbeidsgivernavn = (soknad: Soknad) => {
    return soknad.arbeidsgiver && soknad.arbeidsgiver.navn ? soknad.arbeidsgiver.navn : ''
}

interface SendtUliktProps {
    soknad: Soknad;
}

export const SendtUlikt = ({ soknad }: SendtUliktProps) => {
    return (
        <Normaltekst tag='span'>
            {getLedetekst(tekst('soknad.teaser.status.SENDT.til-arbeidsgiver'), {
                '%DATO%': dayjs(soknad.sendtTilArbeidsgiverDato).format('DD.MM.YYYY'),
                '%ARBEIDSGIVER%': finnArbeidsgivernavn(soknad),
            })}
            <br />
            {getLedetekst(tekst('soknad.teaser.status.SENDT.til-nav'), {
                '%DATO%': dayjs(soknad.sendtTilNAVDato).format('DD.MM.YYYY'),
            })}
        </Normaltekst>
    )
}

export const hentIkon = (soknadstype: RSSoknadstype) => {
    return soknadstype === RSSoknadstype.OPPHOLD_UTLAND ? GlobeIkon : SoknaderIkon
}

export const hentIkonHover = (soknadstype: RSSoknadstype) => {
    return soknadstype === RSSoknadstype.OPPHOLD_UTLAND ? GlobeHoverIkon : SoknaderHoverIkon
}

export const beregnUndertekst = (soknad: Soknad) => {
    if (soknad.status === RSSoknadstatus.AVBRUTT) {
        return getLedetekst(
            tekst('soknad.teaser.status.AVBRUTT'),
            { '%DATO%': dayjs(soknad.avbruttDato).format('DD.MM.YYYY') }
        )
    }

    if (soknad.status === RSSoknadstatus.FREMTIDIG) {
        return tekst('soknad.teaser.status.FREMTIDIG')
    }

    const endelse = getSendtTilSuffix(soknad)
    const datoher = getRiktigDato(soknad)

    switch (soknad.soknadstype) {
        case RSSoknadstype.OPPHOLD_UTLAND:
        case RSSoknadstype.ARBEIDSLEDIG:
        case RSSoknadstype.ANNET_ARBEIDSFORHOLD:
        case RSSoknadstype.SELVSTENDIGE_OG_FRILANSERE: {
            return soknad.status === RSSoknadstatus.SENDT
                ? getLedetekst(tekst('soknad.teaser.status.SENDT.til-nav'), {
                    '%DATO%': dayjs(datoher).format('DD.MM.YYYY'),
                })
                : ''
        }
        default: {
            switch (soknad.status) {
                case RSSoknadstatus.SENDT:
                    return erSendtTilBeggeMenIkkeSamtidig(soknad)
                        ? <SendtUlikt soknad={soknad} />
                        : getLedetekst(tekst(`soknad.teaser.status.${soknad.status}${endelse}`), {
                            '%DATO%': dayjs(datoher).format('DD.MM.YYYY'),
                            '%ARBEIDSGIVER%': finnArbeidsgivernavn(soknad),
                        })
                case RSSoknadstatus.NY:
                case RSSoknadstatus.UTKAST_TIL_KORRIGERING: {
                    return getLedetekst(tekst('soknad.teaser.undertekst'), {
                        '%ARBEIDSGIVER%': finnArbeidsgivernavn(soknad),
                    })
                }
                default: {
                    return ''
                }
            }
        }
    }
}

export const hentTeaserStatustekst = (soknad: Soknad) => {
    if (
        soknad.status !== RSSoknadstatus.NY &&
        soknad.status !== RSSoknadstatus.SENDT &&
        soknad.status !== RSSoknadstatus.AVBRUTT
    ) {
        return getLedetekst(tekst(`soknad.teaser.status.${soknad.status}`), {
            '%DATO%': dayjs(getRiktigDato(soknad)).format('DD.MM.YYYY'),
        })
    }
    return ''
}

export interface SykepengesoknadTeaserProps {
    soknad: Soknad;
}
