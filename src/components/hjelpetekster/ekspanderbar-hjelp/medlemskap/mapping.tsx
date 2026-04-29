import React from 'react'

import { ReadmoreTittelOgKomponent } from '../ekspanderbar-hjelp'

import { ArbeidUtenforNorgeHjelpBody, arbeidUtenforNorgeTittel } from './arbeid-utenfor-norge-hjelp-body'
import {
    MedlemskapArbeidUtenforNorgeHjelpBody,
    medlemskapArbeidUtenforNorgeTittel,
} from './medlemskap-arbeid-utenfor-norge-hjelp-body'
import {
    MedlemskapOppholdUtenforEOSHjelpBody,
    medlemskapOppholdUtenforEOSTittel,
} from './medlemskap-opphold-utenfor-eos-hjelp-body'
import {
    MedlemskapOppholdUtenforNorgeHjelpBody,
    medlemskapOppholdUtenforNorgeTittel,
} from './medlemskap-opphold-utenfor-Norge-hjelp-body'
import {
    MedlemskapOppholdstillatelseHjelpBody,
    medlemskapOppholdstillatelseTittel,
    MedlemskapOppholdstillatelseV2HjelpBody,
    medlemskapOppholdstillatelseV2Tittel,
} from './medlemskap-oppholdstillatelse-hjelp-body'

export const medlemskapMapping = (): Record<string, ReadmoreTittelOgKomponent> => ({
    ARBEID_UTENFOR_NORGE: { tittel: arbeidUtenforNorgeTittel, komponent: <ArbeidUtenforNorgeHjelpBody /> },
    MEDLEMSKAP_OPPHOLD_UTENFOR_EOS: {
        tittel: medlemskapOppholdUtenforEOSTittel,
        komponent: <MedlemskapOppholdUtenforEOSHjelpBody />,
    },
    MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE: {
        tittel: medlemskapOppholdUtenforNorgeTittel,
        komponent: <MedlemskapOppholdUtenforNorgeHjelpBody />,
    },
    MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE: {
        tittel: medlemskapArbeidUtenforNorgeTittel,
        komponent: <MedlemskapArbeidUtenforNorgeHjelpBody />,
    },
    MEDLEMSKAP_OPPHOLDSTILLATELSE: {
        tittel: medlemskapOppholdstillatelseTittel,
        komponent: <MedlemskapOppholdstillatelseHjelpBody />,
    },
    MEDLEMSKAP_OPPHOLDSTILLATELSE_V2: {
        tittel: medlemskapOppholdstillatelseV2Tittel,
        komponent: <MedlemskapOppholdstillatelseV2HjelpBody />,
    },
})
