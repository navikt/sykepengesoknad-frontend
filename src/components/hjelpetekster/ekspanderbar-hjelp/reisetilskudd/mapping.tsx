import React from 'react'

import { ReadmoreTittelOgKomponent } from '../ekspanderbar-hjelp'
import { TilbakeIArbeidHjelpBody, tilbakeIArbeidTittel } from '../arbeidstaker/tilbake-i-arbeid-hjelp-body'

import { KvitteringerHjelpBody, kvitteringerTittel } from './kvitteringer-hjelp-body'
import { TransportTilDagligHjelpBody, transportTilDagligTittel } from './transport-til-daglig-hjelp-body'
import { BrukteReisetilskuddetHjelpBody, brukteReisetilskuddetTittel } from './brukte-reisetilskuddet-hjelp-body'

export const reisetilskuddMapping = (): Record<string, ReadmoreTittelOgKomponent> => ({
    TILBAKE_I_ARBEID_GRADERT_REISETILSKUDD: {
        tittel: tilbakeIArbeidTittel,
        komponent: <TilbakeIArbeidHjelpBody />,
    },
    BRUKTE_REISETILSKUDDET: {
        tittel: brukteReisetilskuddetTittel,
        komponent: <BrukteReisetilskuddetHjelpBody />,
    },
    TRANSPORT_TIL_DAGLIG: { tittel: transportTilDagligTittel, komponent: <TransportTilDagligHjelpBody /> },
    KVITTERINGER: { tittel: kvitteringerTittel, komponent: <KvitteringerHjelpBody /> },
})
