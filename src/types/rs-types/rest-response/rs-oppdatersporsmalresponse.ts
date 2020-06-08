import { RSSoknad } from '../rs-soknad'
import { RSSporsmal } from '../rs-sporsmal'

export interface RSOppdaterSporsmalResponse {
    mutertSoknad: RSSoknad;
    oppdatertSporsmal: RSSporsmal;
}
