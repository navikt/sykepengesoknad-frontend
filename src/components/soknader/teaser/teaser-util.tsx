import { BodyLong, BodyShort } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'

import { arbeidstakerGradert } from '../../../data/mock/data/soknader-opplaering'
import { RSArbeidssituasjon } from '../../../types/rs-types/rs-arbeidssituasjon'
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { Soknad } from '../../../types/types'
import { tilLesbarDatoMedArstall } from '../../../utils/dato-utils'
import { isOpplaering } from '../../../utils/environment'
import { getRiktigDato, getSendtTilSuffix } from '../../../utils/soknad-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'

export const erSendtTilBeggeMenIkkeSamtidig = (soknad: Soknad) => {
    return soknad.sendtTilNAVDato && soknad.sendtTilArbeidsgiverDato
        && soknad.sendtTilNAVDato.toDateString() !== soknad.sendtTilArbeidsgiverDato.toDateString()
}

export const teaserTittel = (soknad: Soknad) => {
    if (soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND) {
        return tekst('soknad.utland.teaser.tittel')
    }
    if (soknad.soknadstype === RSSoknadstype.REISETILSKUDD) {
        return tekst('soknad.reisetilskudd.teaser.tittel')
    }
    if (soknad.soknadstype === RSSoknadstype.GRADERT_REISETILSKUDD) {
        return tekst('soknad.gradert-reisetilskudd.teaser.tittel')
    }

    return tekst('soknad.teaser.tittel')
}

export const finnArbeidsgivernavn = (soknad: Soknad) => {
    return soknad.arbeidsgiver && soknad.arbeidsgiver.navn ? soknad.arbeidsgiver.navn : ''
}

interface SendtUliktProps {
    soknad: Soknad
}

export const SendtUlikt = ({ soknad }: SendtUliktProps) => {
    return (
        <BodyLong spacing as="span">
            {getLedetekst(tekst('soknad.teaser.status.SENDT.til-arbeidsgiver'), {
                '%DATO%': dayjs(soknad.sendtTilArbeidsgiverDato).format('DD.MM.YYYY'),
                '%ARBEIDSGIVER%': finnArbeidsgivernavn(soknad),
            })}
            <br />
            {getLedetekst(tekst('soknad.teaser.status.SENDT.til-nav'), {
                '%DATO%': dayjs(soknad.sendtTilNAVDato).format('DD.MM.YYYY'),
            })}
        </BodyLong>
    )
}

const imgPath = '/syk/sykepengesoknad/static/'

export const hentIkon = (soknad: Soknad) => {
    switch (soknad.status) {
        case RSSoknadstatus.NY:
        case RSSoknadstatus.UTKAST_TIL_KORRIGERING: {
            if (soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND) {
                return imgPath + 'soknad-ny-utland.svg'
            }
            return imgPath + 'soknad-ny.svg'
        }
        case RSSoknadstatus.FREMTIDIG: {
            return imgPath + 'soknad-fremtidig.svg'
        }
        case RSSoknadstatus.SENDT: {
            return imgPath + 'soknad-sendt.svg'
        }
        case RSSoknadstatus.AVBRUTT:
        case RSSoknadstatus.UTGAATT: {
            return imgPath + 'soknad-avbrutt.svg'
        }
    }
    return imgPath + 'soknad-ny.svg'
}

export const hentIkonHover = (soknad: Soknad) => {
    switch (soknad.status) {
        case RSSoknadstatus.NY:
        case RSSoknadstatus.UTKAST_TIL_KORRIGERING: {
            if (soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND) {
                return imgPath + 'soknad-ny-utland-hover.svg'
            }
            return imgPath + 'soknad-ny-hover.svg'
        }
        case RSSoknadstatus.FREMTIDIG: {
            return imgPath + 'soknad-fremtidig-hover.svg'
        }
        case RSSoknadstatus.SENDT: {
            return imgPath + 'soknad-sendt-hover.svg'
        }
        case RSSoknadstatus.AVBRUTT:
        case RSSoknadstatus.UTGAATT: {
            return imgPath + 'soknad-avbrutt-hover.svg'
        }
    }
    return imgPath + 'soknad-ny-hover.svg'
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
                        : getLedetekst(tekst(`soknad.teaser.status.${soknad.status}${endelse}` as any), {
                            '%DATO%': dayjs(datoher).format('DD.MM.YYYY'),
                            '%ARBEIDSGIVER%': finnArbeidsgivernavn(soknad),
                        })
                case RSSoknadstatus.NY:
                case RSSoknadstatus.UTKAST_TIL_KORRIGERING: {
                    return getLedetekst(tekst('soknad.teaser.undertekst' as any), {
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
    if (isOpplaering() && soknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND && soknad.soknadstype !== RSSoknadstype.REISETILSKUDD) {
        const forste = soknad.id === arbeidstakerGradert.id ? 'førstegangssøknad' : ''
        const arbeidssituasjon = soknad.arbeidssituasjon?.toLowerCase()
        const soknadstype = soknad.soknadstype === RSSoknadstype.BEHANDLINGSDAGER
            ? soknad.soknadstype.toLowerCase()
            : ''
        const grad = soknad.soknadPerioder.map(periode => periode.grad + '%')
        return (
            <BodyShort className="inngangspanel__undertekst__demo">
                {`${arbeidssituasjon} ${forste} ${soknadstype}, ${grad} sykmeldt`}
            </BodyShort>
        )
    }
    return <></>
}

export const hentTeaserStatustekst = (soknad: Soknad) => {
    if (soknad.status === RSSoknadstatus.AVBRUTT ||
        soknad.status === RSSoknadstatus.UTGAATT) {
        return tekst(`soknad.teaser.status.${soknad.status}` as any)
    }
    if (soknad.status === RSSoknadstatus.FREMTIDIG) {
        return getLedetekst(tekst(`soknad.teaser.status.${soknad.status}` as any), {
            '%DATO%': tilLesbarDatoMedArstall(dayjs(soknad.tom).add(1, 'day'))
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
    return ''
}

export const periodeListevisning = (soknad: Soknad) => {
    if (soknad.soknadstype === RSSoknadstype.BEHANDLINGSDAGER &&
        soknad.arbeidssituasjon !== RSArbeidssituasjon.ARBEIDSTAKER) {
        return ''
    }

    const perioder = soknad.soknadPerioder.map(p => {
        if (soknad.soknadstype === RSSoknadstype.BEHANDLINGSDAGER) {
            return getLedetekst(tekst('soknad.teaser.sykmeldt-behandlingsdager-fra'), {
                '%ARBEIDSGIVER%': finnArbeidsgivernavn(soknad)
            })
        }
        if (soknad.soknadstype === RSSoknadstype.ARBEIDSTAKERE) {
            return getLedetekst(tekst('soknad.teaser.sykmeldt-fra'), {
                '%GRAD%': p.grad,
                '%ARBEIDSGIVER%': finnArbeidsgivernavn(soknad),
            })
        }
        if (soknad.soknadstype === RSSoknadstype.REISETILSKUDD) {
            return null
        }
        return getLedetekst(tekst('soknad.teaser.sykmeldt'), {
            '%GRAD%': p.grad,
        })
    }).filter(p => p != null)

    return (perioder.length === 0) ? '' :
        <ul className="inngangspanel__periode__undertekst">
            {perioder.map((p, i) => <BodyShort as="li" key={i}> {p} </BodyShort>)}
        </ul>
}

export interface SykepengesoknadTeaserProps {
    soknad: Soknad
}
