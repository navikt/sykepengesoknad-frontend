import { Sporsmal } from '../../types/types'

const validerLand = (sporsmal: Sporsmal, values: Record<string, any>) => {
    if (values.length === 0) {
        return 'Du må oppgi et land utenfor EU/EØS/Storbritannia. Innenfor EU/EØS/Storbritannia trenger du ikke søke.'
    }
    return true
}

export default validerLand
