import { Sporsmal } from '../../types/types'
import { TagTyper } from '../../types/enums'

const validerLand = (sporsmal: Sporsmal, values: Record<string, any>) => {
    if (values.length === 0) {
        if (sporsmal.tag == TagTyper.LAND) {
            return 'Du må oppgi et land utenfor EØS. Innenfor EØS trenger du ikke søke.'
        }

        if (sporsmal.tag == TagTyper.UTENLANDSK_SYKMELDING_TRYGD_HVILKET_LAND) {
            return 'Du må oppgi hvilket land du har mottatt sykepenger eller lignende i'
        }
        throw new Error(`Ukjent tag for validering av land ${sporsmal.tag}`)
    }
    return true
}

export default validerLand
