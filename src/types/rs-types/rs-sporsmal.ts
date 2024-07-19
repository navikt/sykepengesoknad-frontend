import { Sporsmal } from '../types'

import { RSSvar } from './rs-svar'
import { RSSvartype, RSSvartypeType } from './rs-svartype'
import { RSVisningskriterie, RSVisningskriterieType } from './rs-visningskriterie'

export interface RSSporsmal {
    id: string
    tag: string
    sporsmalstekst: string | null
    undertekst: string | null
    svartype: RSSvartypeType
    min: string | null
    max: string | null
    kriterieForVisningAvUndersporsmal: RSVisningskriterieType | null
    svar: RSSvar[]
    metadata?: Record<string, string>
    undersporsmal: RSSporsmal[]
    tittel?: string
}

export function sporsmalToRS(sporsmal: Sporsmal): RSSporsmal {
    return rsSporsmalMapping(sporsmal)
}

const rsSporsmalMapping = (sporsmal: Sporsmal): RSSporsmal => {
    const rsSporsmal = {} as RSSporsmal
    rsSporsmal.id = sporsmal.id
    rsSporsmal.tag = sporsmal.tag.toString() + tagIndexEllerBlank(sporsmal.tagIndex as any)
    rsSporsmal.sporsmalstekst = (sporsmal.sporsmalstekst === '' ? null : sporsmal.sporsmalstekst) as any
    rsSporsmal.undertekst = sporsmal.undertekst
    rsSporsmal.svartype = sporsmal.svartype
    rsSporsmal.min = sporsmal.min
    rsSporsmal.metadata = sporsmal.metadata
    rsSporsmal.max = sporsmal.max
    rsSporsmal.kriterieForVisningAvUndersporsmal = rsVisningskriterie(sporsmal.kriterieForVisningAvUndersporsmal) as any
    rsSporsmal.svar = sporsmal.svarliste.svar.map((svar: RSSvar) => {
        const hentVerdi = () => {
            if (sporsmal.svartype == RSSvartype.BELOP) {
                return (Number(svar.verdi) * 100).toString()
            }
            return svar.verdi
        }
        return {
            id: svar.id,
            verdi: hentVerdi(),
        }
    })
    if (sporsmal.undersporsmal) {
        rsSporsmal.undersporsmal = sporsmal.undersporsmal.map((uspm: Sporsmal) => {
            return rsSporsmalMapping(uspm)
        })
    } else {
        rsSporsmal.undersporsmal = []
    }
    return rsSporsmal
}

const tagIndexEllerBlank = (tagIndex: number) => {
    if (tagIndex === undefined) return ''
    return `_${tagIndex}`
}

const rsVisningskriterie = (kriterieForVisningAvUndersporsmal: string) => {
    if (kriterieForVisningAvUndersporsmal as keyof typeof RSVisningskriterie) {
        return RSVisningskriterie[kriterieForVisningAvUndersporsmal as keyof typeof RSVisningskriterie]
    }
    return null
}
