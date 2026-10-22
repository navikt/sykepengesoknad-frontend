import React from 'react'

import { ReadmoreTittelOgKomponent } from '../ekspanderbar-hjelp'
import { FiskereLottInntektHjelpBody, fiskereLottInntektTittel } from './fiskere-lott-inntekt-hjelp-body'
import {
    FiskereLottInntektGradertHjelpBody,
    fiskereLottInntektGradertTittel,
} from './fiskere-lott-inntekt-gradert-hjelp-body'

export const fiskereMapping = (): Record<string, ReadmoreTittelOgKomponent> => ({
    FISKER_LOTT_OPPRETTHOLDT_INNTEKT: {
        tittel: fiskereLottInntektTittel,
        komponent: <FiskereLottInntektHjelpBody />,
    },
    FISKER_LOTT_OPPRETTHOLDT_INNTEKT_GRADERT: {
        tittel: fiskereLottInntektGradertTittel,
        komponent: <FiskereLottInntektGradertHjelpBody />,
    },
})
