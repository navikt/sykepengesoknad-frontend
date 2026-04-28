import React from 'react'

import { Sporsmal } from '../../../../types/types'
import { ReadmoreTittelOgKomponent } from '../ekspanderbar-hjelp'

import { EndringSNHjelpBody, endringSNTittel } from './utdatert/endring-sn-hjelp-body'
import {
    VarigEndring25prosentHjelpBody,
    varigEndring25prosentTittel,
} from './utdatert/varig-endring25prosent-hjelp-body'
import { DriftIVirksomhetHjelpBody, driftIVirksomhetTittel } from './utdatert/drift-i-virksomhet-hjelp-body'
import { AvvikletVirksomhetHjelpBody, avvikletVirksomhetTittel } from './utdatert/avviklet-virksomhet-hjelp-body'
import {
    NaringsdrivendeVirksomhetenAvvikletHjelpBody,
    naringsdrivendeVirksomhetenAvvikletTittel,
} from './naringsdrivende-virksomheten-avviklet-hjelp-body'
import {
    NaringsdrivendeNyIArbeidsLivetHjelpBody,
    naringsdrivendeNyIArbeidsLivetTittel,
} from './naringsdrivende-ny-i-arbeids-livet-hjelp-body'
import {
    NaringsdrivendeVarigEndringHjelpBody,
    naringsdrivendeVarigEndringTittel,
} from './naringsdrivende-varig-endring-hjelp-body'
import {
    NaringsdrivendeOppholdIUtlandetHjelpBody,
    naringsdrivendeOppholdIUtlandetTittel,
} from './naringsdrivende-opphold-i-utlandet-hjelp-body'
import {
    NaringsdrivendeOpprettholdtInntektHjelpBody,
    naringsdrivendeOpprettholdtInntektTittel,
} from './naringsdrivende-opprettholdt-inntekt-hjelp-body'
import {
    NaringsdrivendeOpprettholdtInntektGradertHjelpBody,
    naringsdrivendeOpprettholdtInntektGradertTittel,
} from './naringsdrivende-opprettholdt-inntekt-gradert-hjelp-body'
import {
    ArbeidUnderveisNaeringsdrivendeHjelpBody,
    arbeidUnderveisNaeringsdrivendeTittel,
} from './arbeid-underveis-naeringsdrivende-hjelp-body'
import {
    InntektsopplysningerNyIArbeidslivetHjelpBody,
    inntektsopplysningerNyIArbeidslivetTittel,
} from './utdatert/inntektsopplysninger-ny-i-arbeidslivet-hjelp-body'

export const naringsdrivendeMapping = (sporsmal: Sporsmal): Record<string, ReadmoreTittelOgKomponent> => ({
    INNTEKTSKILDE_SELVSTENDIG_VARIG_ENDRING_GRUPPE: { tittel: endringSNTittel, komponent: <EndringSNHjelpBody /> },
    INNTEKTSOPPLYSNINGER_VARIG_ENDRING_25_PROSENT: {
        tittel: varigEndring25prosentTittel,
        komponent: <VarigEndring25prosentHjelpBody sporsmal={sporsmal} />,
    },
    INNTEKTSOPPLYSNINGER_DRIFT_VIRKSOMHETEN: {
        tittel: driftIVirksomhetTittel,
        komponent: <DriftIVirksomhetHjelpBody />,
    },
    INNTEKTSOPPLYSNINGER_VIRKSOMHETEN_AVVIKLET: {
        tittel: avvikletVirksomhetTittel,
        komponent: <AvvikletVirksomhetHjelpBody />,
    },
    INNTEKTSOPPLYSNINGER_NY_I_ARBEIDSLIVET: {
        tittel: inntektsopplysningerNyIArbeidslivetTittel,
        komponent: <InntektsopplysningerNyIArbeidslivetHjelpBody />,
    },
    NARINGSDRIVENDE_OPPRETTHOLDT_INNTEKT: {
        tittel: naringsdrivendeOpprettholdtInntektTittel,
        komponent: <NaringsdrivendeOpprettholdtInntektHjelpBody />,
    },
    NARINGSDRIVENDE_OPPRETTHOLDT_INNTEKT_GRADERT: {
        tittel: naringsdrivendeOpprettholdtInntektGradertTittel,
        komponent: <NaringsdrivendeOpprettholdtInntektGradertHjelpBody />,
    },
    NARINGSDRIVENDE_OPPHOLD_I_UTLANDET: {
        tittel: naringsdrivendeOppholdIUtlandetTittel,
        komponent: <NaringsdrivendeOppholdIUtlandetHjelpBody />,
    },
    NARINGSDRIVENDE_VIRKSOMHETEN_AVVIKLET: {
        tittel: naringsdrivendeVirksomhetenAvvikletTittel,
        komponent: <NaringsdrivendeVirksomhetenAvvikletHjelpBody />,
    },
    NARINGSDRIVENDE_NY_I_ARBEIDSLIVET: {
        tittel: naringsdrivendeNyIArbeidsLivetTittel,
        komponent: <NaringsdrivendeNyIArbeidsLivetHjelpBody />,
    },
    NARINGSDRIVENDE_VARIG_ENDRING: {
        tittel: naringsdrivendeVarigEndringTittel,
        komponent: <NaringsdrivendeVarigEndringHjelpBody />,
    },
    ARBEID_UNDERVEIS_100_PROSENT_NARINGSDRIVENDE: {
        tittel: arbeidUnderveisNaeringsdrivendeTittel,
        komponent: <ArbeidUnderveisNaeringsdrivendeHjelpBody gradert={false} />,
    },
    JOBBET_DU_GRADERT_NARINGSDRIVENDE: {
        tittel: arbeidUnderveisNaeringsdrivendeTittel,
        komponent: <ArbeidUnderveisNaeringsdrivendeHjelpBody gradert={true} />,
    },
})
