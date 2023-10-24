import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import { RSArbeidssituasjon } from '../../types/rs-types/rs-arbeidssituasjon'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { getLedetekst, tekst } from '../../utils/tekster'
import { RSSoknadmetadata } from '../../types/rs-types/rs-soknadmetadata'

export const teaserTittel = (soknad: RSSoknadmetadata) => {
    if (soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND) {
        return tekst('soknad.utland.teaser.tittel')
    }
    if (soknad.soknadstype === RSSoknadstype.INNTEKTSOPPLYSNINGER_FOR_NARINGSDRIVENDE) {
        return 'Inntektsopplysninger for næringsdrivende'
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
        <BodyShort as="ul" className="list-none">
            {perioder.map((p, i) => (
                <BodyShort as="li" key={i}>
                    {p}
                </BodyShort>
            ))}
        </BodyShort>
    )
}

export interface SykepengesoknadTeaserProps {
    soknad: RSSoknadmetadata
}
