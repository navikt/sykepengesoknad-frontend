import { Sporsmal } from '../../types/types'


const validerLand = (sporsmal: Sporsmal, values: Record<string, any>) => {
    if (values[sporsmal.id].length === 0) {
        return 'Du må oppgi et land utenfor EØS. Innenfor EØS trenger du ikke søke.'
    }
    return true
}

export default validerLand
