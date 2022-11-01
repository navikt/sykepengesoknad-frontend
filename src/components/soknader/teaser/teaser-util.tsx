import { BodyShort } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'

import { arbeidstakerGradert } from '../../../data/mock/data/opplaering'
import { RSArbeidssituasjon } from '../../../types/rs-types/rs-arbeidssituasjon'
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tilLesbarDatoMedArstall } from '../../../utils/dato-utils'
import { isOpplaering } from '../../../utils/environment'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { RSSoknadmetadata } from '../../../types/rs-types/rs-soknadmetadata'

export const teaserTittel = (soknad: RSSoknadmetadata) => {
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

export const finnArbeidsgivernavn = (soknad: RSSoknadmetadata) => {
    return soknad.arbeidsgiver && soknad.arbeidsgiver.navn ? soknad.arbeidsgiver.navn : ''
}

const imgPath = '/syk/sykepengesoknad/static/'

export const hentIkon = (soknad: RSSoknadmetadata) => {
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

export const hentIkonHover = (soknad: RSSoknadmetadata) => {
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

export const leggTilSoknadstypeForDemoside = (soknad: RSSoknadmetadata) => {
    if (
        isOpplaering() &&
        soknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND &&
        soknad.soknadstype !== RSSoknadstype.REISETILSKUDD
    ) {
        const forste = soknad.id === arbeidstakerGradert.id ? 'førstegangssøknad' : ''
        const arbeidssituasjon = soknad.arbeidssituasjon?.toLowerCase()
        const soknadstype =
            soknad.soknadstype === RSSoknadstype.BEHANDLINGSDAGER ? soknad.soknadstype.toLowerCase() : ''
        const grad = soknad.soknadPerioder.map((periode) => periode.grad + '%')
        return (
            <BodyShort className="inngangspanel__undertekst__demo">
                {`${arbeidssituasjon} ${forste} ${soknadstype}, ${grad} sykmeldt`}
            </BodyShort>
        )
    }
    return <></>
}

export const hentTeaserStatustekst = (soknad: RSSoknadmetadata) => {
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
    return ''
}

export const periodeListevisning = (soknad: RSSoknadmetadata) => {
    if (
        soknad.soknadstype === RSSoknadstype.BEHANDLINGSDAGER &&
        soknad.arbeidssituasjon !== RSArbeidssituasjon.ARBEIDSTAKER
    ) {
        return ''
    }

    const perioder = soknad.soknadPerioder
        .map((p) => {
            if (soknad.soknadstype === RSSoknadstype.BEHANDLINGSDAGER) {
                return getLedetekst(tekst('soknad.teaser.sykmeldt-behandlingsdager-fra'), {
                    '%ARBEIDSGIVER%': finnArbeidsgivernavn(soknad),
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
        })
        .filter((p) => p != null)

    return perioder.length === 0 ? (
        ''
    ) : (
        <ul className="inngangspanel__periode__undertekst">
            {perioder.map((p, i) => (
                <BodyShort as="li" key={i}>
                    {' '}
                    {p}{' '}
                </BodyShort>
            ))}
        </ul>
    )
}

export interface SykepengesoknadTeaserProps {
    soknad: RSSoknadmetadata
}
