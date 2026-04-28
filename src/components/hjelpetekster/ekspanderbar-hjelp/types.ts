import { ArbeidstakerSporsmalTag } from './arbeidstaker/types'
import { NaeringsdrivendeSporsmalTag } from './naeringsdrivende/types'
import { MedlemskapSporsmalTag } from './medlemskap/types'
import { FellesSporsmalTag } from './felles/types'
import { FriskmeldtTilArbeidsformidlingSporsmalTag } from './friskmeldt-til-arbeidsformidling/types'

export type SporsmalTagMedHjelpetekst =
    | FellesSporsmalTag
    | ArbeidstakerSporsmalTag
    | NaeringsdrivendeSporsmalTag
    | MedlemskapSporsmalTag
    | FriskmeldtTilArbeidsformidlingSporsmalTag
