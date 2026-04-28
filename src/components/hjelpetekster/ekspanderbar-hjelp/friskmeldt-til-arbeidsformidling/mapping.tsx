import React from 'react'

import { ReadmoreTittelOgKomponent } from '../ekspanderbar-hjelp'

import { InntektUnderveisFtaHjelpBody, inntektUnderveisFtaTittel } from './inntekt-underveis-fta-hjelp-body'
import { JobbsituasjonenDinHjelpBody, jobbsituasjonenDinTittel } from './jobbsituasjonen-din-hjelp-body'

export const ftaMapping = (): Record<string, ReadmoreTittelOgKomponent> => ({
    FTA_INNTEKT_UNDERVEIS: { tittel: inntektUnderveisFtaTittel, komponent: <InntektUnderveisFtaHjelpBody /> },
    FTA_JOBBSITUASJONEN_DIN: { tittel: jobbsituasjonenDinTittel, komponent: <JobbsituasjonenDinHjelpBody /> },
})
