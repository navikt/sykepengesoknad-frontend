export enum RSArbeidssituasjon {
    NAERINGSDRIVENDE = 'NAERINGSDRIVENDE',
    FRILANSER = 'FRILANSER',
    ARBEIDSTAKER = 'ARBEIDSTAKER',
    ARBEIDSLEDIG = 'ARBEIDSLEDIG',
    FISKER = 'FISKER',
    JORDBRUKER = 'JORDBRUKER',
    ANNET = 'ANNET',
}

export type RSArbeidssituasjonType =
    | 'NAERINGSDRIVENDE'
    | 'FRILANSER'
    | 'ARBEIDSTAKER'
    | 'ARBEIDSLEDIG'
    | 'ANNET'
    | 'FISKER'
    | 'JORDBRUKER'
