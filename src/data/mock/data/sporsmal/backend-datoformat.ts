const maaneder = [
    'januar',
    'februar',
    'mars',
    'april',
    'mai',
    'juni',
    'juli',
    'august',
    'september',
    'oktober',
    'november',
    'desember',
]

type Dato = {
    readonly ar: string
    readonly maned: number
    readonly dag: number
}

const splittDato = (dato: string): Dato => {
    const [ar, maned, dag] = dato.split('-')
    return { ar, maned: Number(maned), dag: Number(dag) }
}

const maaned = (dato: Dato): string => maaneder[dato.maned - 1]

export const formatterDato = (dato: string): string => {
    const deler = splittDato(dato)
    return `${deler.dag}. ${maaned(deler)} ${deler.ar}`
}

export const formatterPeriode = (fom: string, tom: string): string => {
    const fomDato = splittDato(fom)
    const tomDato = splittDato(tom)
    const fomTekst = `${fomDato.dag}.${fomDato.maned === tomDato.maned ? '' : ` ${maaned(fomDato)}`}${fomDato.ar === tomDato.ar ? '' : ` ${fomDato.ar}`}`
    return `${fomTekst} - ${formatterDato(tom)}`
}
