import { RSSvar } from '../../../types/rs-types/rs-svar'
import { Soknad, Sporsmal } from '../../../types/types'

export function harLikeSvar(a: Soknad, b: Soknad) {
    if (a.sporsmal.length != b.sporsmal.length) {
        return false
    }

    for (let i = 0; i < a.sporsmal.length; i++) {
        const like = harLikeSvarPaSporsmal(a.sporsmal[i], b.sporsmal[i])
        if (!like) {
            return false
        }
    }

    return true
}

function harLikeSvarPaSporsmal(a: Sporsmal, b: Sporsmal) {
    if (a.tag != b.tag) {
        return false
    }
    if (a.sporsmalstekst != b.sporsmalstekst) {
        return false
    }
    if (!svarErLike(a.svarliste.svar, b.svarliste.svar)) {
        return false
    }

    function oversporsmalSvar() {
        if (a.svarliste.svar.length > 0) {
            return a.svarliste.svar[0].verdi
        }
    }

    if (!a.kriterieForVisningAvUndersporsmal || a.kriterieForVisningAvUndersporsmal === oversporsmalSvar()) {
        return harLikeSvarPaUnderSporsmal(a, b)
    }

    return true
}

function harLikeSvarPaUnderSporsmal(a: Sporsmal, b: Sporsmal) {
    if (a.undersporsmal.length != b.undersporsmal.length) {
        return false
    }

    for (let i = 0; i < a.undersporsmal.length; i++) {
        const like = harLikeSvarPaSporsmal(a.undersporsmal[i], b.undersporsmal[i])
        if (!like) {
            return false
        }
    }
    return true
}

function svarErLike(a: ReadonlyArray<RSSvar>, b: ReadonlyArray<RSSvar>) {
    const predicate = (a: RSSvar) => {
        return a.verdi
    }
    const aFiltrert = a.filter(predicate)
    const bFiltrert = b.filter(predicate)

    if (aFiltrert.length != bFiltrert.length) {
        return false
    }

    for (let i = 0; i < aFiltrert.length; i++) {
        if (aFiltrert[i].verdi != bFiltrert[i].verdi) {
            return false
        }
    }

    return true
}
