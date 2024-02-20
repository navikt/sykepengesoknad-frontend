interface Tekster {
    [key: string]: string
}

const BekreftelsespunkterOppholdutlandTekster = (harArbeidsgiver: boolean): Tekster => {
    const tekster: Tekster = {
        'vaer-klar-over-at.punkt-1':
            'Hvis reisen forlenger sykefraværet ditt eller hindrer planlagte aktiviteter, kan du risikere at sykepengene stanses i den perioden du er på reise.',
        'vaer-klar-over-at.punkt-2':
            'Hvis sykepengene stanses, risikerer du også at sykepengene beregnes etter et nytt og lavere grunnlag når du er tilbake fra reisen.',
        'vaer-klar-over-at.punkt-3':
            'Hvis du er på reise i 4 uker eller mer og sykepengene stanses i denne perioden, risikerer du også å få avslag på videre søknad om sykepenger.',
    }

    if (harArbeidsgiver) {
        tekster['vaer-klar-over-at.punkt-4'] = 'Du må avklare reisen med arbeidsgiveren din'
    }

    return tekster
}

export default BekreftelsespunkterOppholdutlandTekster
