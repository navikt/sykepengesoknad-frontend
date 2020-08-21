import dayjs from 'dayjs'
import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { arbeidstakerGradert } from '../../../data/mock/data/soknader-opplaering'
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { Soknad } from '../../../types/types'
import env from '../../../utils/environment'
import { getRiktigDato, getSendtTilSuffix } from '../../../utils/soknad-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'
import SoknaderTimeIkon from './img/file-time.svg'
import GlobeHoverIkon from './img/globe-hover.svg'
import SoknadAvbruttIkon from './img/soknad-avbrutt.svg'
import SoknadNyUtlandIkon from './img/soknad-ny-utland.svg'
import SoknadNyIkon from './img/soknad-ny.svg'
import SoknadSendtIkon from './img/soknad-sendt.svg'
import SoknaderHoverIkon from './img/soknader-hover.svg'

export const erSendtTilBeggeMenIkkeSamtidig = (soknad: Soknad) => {
    return soknad.sendtTilNAVDato && soknad.sendtTilArbeidsgiverDato
        && soknad.sendtTilNAVDato.toDateString() !== soknad.sendtTilArbeidsgiverDato.toDateString()
}

export const finnArbeidsgivernavn = (soknad: Soknad) => {
    return soknad.arbeidsgiver && soknad.arbeidsgiver.navn ? soknad.arbeidsgiver.navn : ''
}

interface SendtUliktProps {
    soknad: Soknad;
}

export const SendtUlikt = ({ soknad }: SendtUliktProps) => {
    return (
        <Normaltekst tag="span">
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

export const hentIkon = (soknad: Soknad) => {
    switch (soknad.status) {
        case RSSoknadstatus.NY:
        case RSSoknadstatus.UTKAST_TIL_KORRIGERING: {
            if (soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND) {
                return SoknadNyUtlandIkon
            }
            return SoknadNyIkon
        }
        case RSSoknadstatus.FREMTIDIG: {
            return SoknaderTimeIkon             // TODO: Skal det være en egen på fremtidig?
        }
        case RSSoknadstatus.SENDT: {
            return SoknadSendtIkon
        }
        case RSSoknadstatus.AVBRUTT:
        case RSSoknadstatus.UTGAATT: {
            return SoknadAvbruttIkon
        }
    }
    return SoknadNyIkon
}

export const hentIkonHover = (soknadstype: RSSoknadstype) => {
    //TODO: Oppdater disse
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

export const leggTilSoknadstypeForDemoside = (soknad: Soknad) => {
    if (env.isOpplaering && soknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND) {
        const forste = soknad.id === arbeidstakerGradert.id ? 'førstegangssøknad' : ''
        const arbeidssituasjon = soknad.arbeidssituasjon?.toLowerCase()
        const soknadstype = soknad.soknadstype === RSSoknadstype.BEHANDLINGSDAGER
            ? soknad.soknadstype.toLowerCase()
            : ''
        const grad = soknad.soknadPerioder.map(periode => periode.grad + '%')
        return <Normaltekst className="inngangspanel__undertekst__demo">
            {`${arbeidssituasjon} ${forste} ${soknadstype}, ${grad} sykmeldt`}
        </Normaltekst>
    }
    return ''
}

export const hentTeaserStatustekst = (soknad: Soknad) => {
    if ( soknad.status === RSSoknadstatus.FREMTIDIG ||
        soknad.status === RSSoknadstatus.AVBRUTT ||
        soknad.status === RSSoknadstatus.UTGAATT) {
        return tekst(`soknad.teaser.status.${soknad.status}`)
    }
    if (soknad.status === RSSoknadstatus.SENDT) {
        if (soknad.sendtTilArbeidsgiverDato) {
            if (soknad.sendtTilNAVDato) {
                return tekst(`soknad.teaser.status.${soknad.status}.til-arbeidsgiver-og-nav`)
            }
            return tekst(`soknad.teaser.status.${soknad.status}.til-arbeidsgiver`)
        }
        return tekst(`soknad.teaser.status.${soknad.status}.til-nav`)
    }
    return ''
}

export const periodeListevisning = (soknad: Soknad) => {
    if (soknad.soknadstype === RSSoknadstype.BEHANDLINGSDAGER) {
        return ''
    }
    const perioder = soknad.soknadPerioder.map(p => {
        if (soknad.soknadstype === RSSoknadstype.ARBEIDSTAKERE) {
            return getLedetekst(tekst('soknad.teaser.sykmeldt-fra'), {
                '%GRAD%': p.grad,
                '%ARBEIDSGIVER%': finnArbeidsgivernavn(soknad),
            })
        }
        return getLedetekst(tekst('soknad.teaser.sykmeldt'), {
            '%GRAD%': p.grad,
        })
    })

    // TODO: Perioder har for mye margin
    return (perioder.length === 0) ? '' :
        <ul className={'inngangspanel__undertekst'}>
            {perioder.map((p, i) => <li key={i}> {p} </li>)}
        </ul>
}

export interface SykepengesoknadTeaserProps {
    soknad: Soknad;
}
