interface Tekster {
    [key: string]: string
}

const BekreftelsespunkterOppholdutlandTekster = (harArbeidsgiver: boolean): Tekster => {
    const tekster: Tekster = {
        'vaer-klar-over-at.punkt-1': 'Jeg har avklart med legen at reisen ikke vil forlenge sykefraværet',
        'vaer-klar-over-at.punkt-2': 'Reisen hindrer ikke planlagt behandling eller avtaler med NAV',
    }

    if (harArbeidsgiver) {
        tekster['vaer-klar-over-at.punkt-3'] = 'Reisen er avklart med arbeidsgiveren min'
    }

    return tekster
}

export default BekreftelsespunkterOppholdutlandTekster
