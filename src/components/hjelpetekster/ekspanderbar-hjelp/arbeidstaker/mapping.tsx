import React from 'react'

import { ReadmoreTittelOgKomponent } from '../ekspanderbar-hjelp'

import { TilbakeIArbeidHjelpBody, tilbakeIArbeidTittel } from './tilbake-i-arbeid-hjelp-body'
import { PermisjonHjelpBody, permisjonTittel } from './permisjon-hjelp-body'
import { ArbeidUnderveisHjelpBody, arbeidUnderveisTittel } from './arbeid-underveis-hjelp-body'
import {
    FravarForSykmeldingenHjelpBody,
    fravarForSykmeldingenTittel,
} from './utdatert/fravar-for-sykmeldingen-hjelp-body'
import { BrukteReisetilskuddetHjelpBody, brukteReisetilskuddetTittel } from './brukte-reisetilskuddet-hjelp-body'
import { KvitteringerHjelpBody, kvitteringerTittel } from './kvitteringer-hjelp-body'
import { KjenteInntektkilderHjelpBody, kjenteInntektkilderTittel } from './kjente-inntektkilder'
import { TilkommenInntektHjelpBody, tilkommenInntektTittel } from './tilkommen-inntekt-hjelp-body'
import {
    FravarForSykmeldingenV2HjelpBody,
    fravarForSykmeldingenV2Tittel,
} from './fravar-for-sykmeldingen-v2-hjelp-body'
import { TransportTilDagligHjelpBody, transportTilDagligTittel } from './transport-til-daglig-hjelp-body'
import { ProsentenLavereHjelpBody, prosentenLavereTittel } from './prosenten-lavere-hjelp-body'

export const arbeidstakerMapping: Record<string, ReadmoreTittelOgKomponent> = {
    TILBAKE_I_ARBEID: { tittel: tilbakeIArbeidTittel, komponent: <TilbakeIArbeidHjelpBody /> },
    TILBAKE_I_ARBEID_GRADERT_REISETILSKUDD: {
        tittel: tilbakeIArbeidTittel,
        komponent: <TilbakeIArbeidHjelpBody />,
    },
    PERMISJON_V2: { tittel: permisjonTittel, komponent: <PermisjonHjelpBody /> },
    ARBEID_UNDERVEIS_100_PROSENT_ARBEIDSTAKER: {
        tittel: arbeidUnderveisTittel,
        komponent: <ArbeidUnderveisHjelpBody />,
    },
    JOBBET_DU_GRADERT_ARBEIDSTAKER: { tittel: arbeidUnderveisTittel, komponent: <ArbeidUnderveisHjelpBody /> },
    FRAVAR_FOR_SYKMELDINGEN: {
        tittel: fravarForSykmeldingenTittel,
        komponent: <FravarForSykmeldingenHjelpBody />,
    },
    FRAVAR_FOR_SYKMELDINGEN_V2: {
        tittel: fravarForSykmeldingenV2Tittel,
        komponent: <FravarForSykmeldingenV2HjelpBody />,
    },
    BRUKTE_REISETILSKUDDET: {
        tittel: brukteReisetilskuddetTittel,
        komponent: <BrukteReisetilskuddetHjelpBody />,
    },
    KVITTERINGER: { tittel: kvitteringerTittel, komponent: <KvitteringerHjelpBody /> },
    KJENTE_INNTEKTSKILDER: { tittel: kjenteInntektkilderTittel, komponent: <KjenteInntektkilderHjelpBody /> },
    NYTT_ARBEIDSFORHOLD_UNDERVEIS: { tittel: tilkommenInntektTittel, komponent: <TilkommenInntektHjelpBody /> },
    TRANSPORT_TIL_DAGLIG: { tittel: transportTilDagligTittel, komponent: <TransportTilDagligHjelpBody /> },
    PROSENTEN_LAVERE_ENN_FORVENTET_ARBEIDSTAKER: {
        tittel: prosentenLavereTittel,
        komponent: <ProsentenLavereHjelpBody />,
    },
}
