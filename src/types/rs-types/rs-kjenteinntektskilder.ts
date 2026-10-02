export interface RSKjentInntektskilde {
    navn: string
    kilde: RSKilde
    orgnummer: string
}

export enum RSKilde {
    INNTEKTSKOMPONENTEN = 'INNTEKTSKOMPONENTEN',
    AAAREG = 'AAAREG',
    SYKMELDING = 'SYKMELDING',
}
