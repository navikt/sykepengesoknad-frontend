import React from 'react'

import { ReadmoreTittelOgKomponent } from '../ekspanderbar-hjelp'

import { AndreInntektskilderHjelpBody, andreInntektskilderTittel } from './andre-inntektskilder-hjelp-body'
import {
    AndreInntektskilderGammelHjelpBody,
    andreInntektskilderGammelTittel,
} from './utdatert/andre-inntektskilder-gammel-hjelp-body'
import {
    DeprecatedYrkesskadeHjelpBody,
    deprecatedYrkesskadeTittel,
    YrkesskadeHjelpBody,
    yrkesskadeTittel,
} from './yrkesskade-hjelp-body'
import { FerieHjelpBody, ferieTittel } from './ferie-hjelp-body'
import { UtlandHjelpBody, utlandTittel } from './utland-hjelp-body'
import { PermittertNaaHjelpBody, permittertNaaTittel } from './utdatert/permittert-naa-hjelp-body'
import { PermittertPeriodeHjelpBody, permittertPeriodeTittel } from './utdatert/permittert-periode-hjelp-body'
import { UtdanningHjelpBody, utdanningTittel } from './utdanning-hjelp-body'

export const fellesMapping = (): Record<string, ReadmoreTittelOgKomponent> => ({
    YRKESSKADE: { tittel: deprecatedYrkesskadeTittel, komponent: <DeprecatedYrkesskadeHjelpBody /> },
    YRKESSKADE_V2: { tittel: yrkesskadeTittel, komponent: <YrkesskadeHjelpBody /> },
    FERIE_V2: { tittel: ferieTittel, komponent: <FerieHjelpBody /> },
    ANDRE_INNTEKTSKILDER: {
        tittel: andreInntektskilderGammelTittel,
        komponent: <AndreInntektskilderGammelHjelpBody />,
    },
    ANDRE_INNTEKTSKILDER_V2: { tittel: andreInntektskilderTittel, komponent: <AndreInntektskilderHjelpBody /> },
    UTLAND_V2: { tittel: utlandTittel, komponent: <UtlandHjelpBody medNei={true} /> },
    OPPHOLD_UTENFOR_EOS: { tittel: utlandTittel, komponent: <UtlandHjelpBody medNei={true} /> },
    FTA_REISE_TIL_UTLANDET: { tittel: utlandTittel, komponent: <UtlandHjelpBody medNei={false} /> },
    PERMITTERT_NAA: { tittel: permittertNaaTittel, komponent: <PermittertNaaHjelpBody /> },
    PERMITTERT_PERIODE: { tittel: permittertPeriodeTittel, komponent: <PermittertPeriodeHjelpBody /> },
    UTDANNING: { tittel: utdanningTittel, komponent: <UtdanningHjelpBody /> },
})
