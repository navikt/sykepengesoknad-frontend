import { ArbeidstakerSporsmalTag } from './arbeidstaker/types'
import { NaeringsdrivendeSporsmalTag } from './naeringsdrivende/types'
import { MedlemskapSporsmalTag } from './medlemskap/types'
import { FellesSporsmalTag } from './felles/types'
import { FriskmeldtTilArbeidsformidlingSporsmalTag } from './friskmeldt-til-arbeidsformidling/types'
import { ReisetilskuddSporsmalTag } from './reisetilskudd/types'
import { FiskereSporsmalTag } from './fiskere/types'

export type SporsmalTagMedHjelpetekst =
    | FellesSporsmalTag
    | FiskereSporsmalTag
    | ArbeidstakerSporsmalTag
    | NaeringsdrivendeSporsmalTag
    | MedlemskapSporsmalTag
    | FriskmeldtTilArbeidsformidlingSporsmalTag
    | ReisetilskuddSporsmalTag
