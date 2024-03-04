interface Tekster {
    [key: string]: string
}

const BekreftelsespunkterOppholdutlandTekster = (harArbeidsgiver: boolean): Tekster => {
    const arbeidsgiver: Tekster = harArbeidsgiver
        ? {
              'vaer-klar-over-at.punkt-1':
                  'Du må avklare med arbeidsgiveren din og den som sykmeldte deg at reisen ikke hindrer planlagte aktiviteter og/eller forlenger sykefraværet ditt. Hvis reisen forlenger sykefraværet ditt eller hindrer planlagte aktiviteter, kan du risikere at sykepengene stanses i den perioden du er på reise.',
          }
        : {}

    const tekster: Tekster = {
        'vaer-klar-over-at.punkt-2':
            'Hvis sykepengene stanses, risikerer du også at sykepengene beregnes etter et nytt og lavere grunnlag når du er tilbake fra reisen.',
        'vaer-klar-over-at.punkt-3':
            'Hvis du er på reise i 4 uker eller mer og sykepengene stanses i denne perioden, risikerer du også å få avslag på videre søknad om sykepenger.',
    }

    return { ...arbeidsgiver, ...tekster }
}

export default BekreftelsespunkterOppholdutlandTekster
