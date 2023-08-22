import React from 'react'

import { RSSvartype } from '../../types/rs-types/rs-svartype'

import BehDager from './typer/beh-dager'
import CheckboxKomp from './typer/checkbox-komp'
import CheckboxPanel from './typer/checkbox-panel'
import DagerKomp from './typer/dager-komp'
import DatoInput from './typer/dato-komp'
import IkkeRelevant from './typer/ikke-relevant'
import JaNeiStor from './typer/ja-nei-stor'
import JaNeiLiten from './typer/ja-nei-liten'
import Land from './typer/land'
import Opplasting from './typer/opplasting/opplasting'
import Perioder from './typer/perioder'
import RadioTimerProsent from './typer/radio-timer-prosent'
import TallKomp from './typer/tall-komp'
import UkjentSporsmal from './typer/ukjent-sporsmal'
import { SpmProps } from './sporsmal-form/sporsmal-form'
import { Fritekst } from './typer/fritekst'
import RadioKomp from './typer/radio-komp'
import Combobox from './typer/combobox'

const SporsmalSwitch = ({ sporsmal }: SpmProps) => {
    switch (sporsmal.svartype) {
        case RSSvartype.CHECKBOX_PANEL:
            return <CheckboxPanel sporsmal={sporsmal} />

        case RSSvartype.CHECKBOX_GRUPPE:
            return <CheckboxKomp sporsmal={sporsmal} />

        case RSSvartype.DATO:
            return <DatoInput sporsmal={sporsmal} />

        case RSSvartype.PERIODER:
            return <Perioder sporsmal={sporsmal} />

        case RSSvartype.DATOER:
            return <DagerKomp sporsmal={sporsmal} />

        case RSSvartype.JA_NEI:
            if (
                !sporsmal.erHovedsporsmal &&
                (sporsmal.parentKriterie === 'CHECKED' ||
                    sporsmal.parentKriterie === 'JA' ||
                    sporsmal.undersporsmal.length === 0)
            ) {
                return <JaNeiLiten sporsmal={sporsmal} />
            }
            return <JaNeiStor sporsmal={sporsmal} />

        case RSSvartype.TIMER:
        case RSSvartype.PROSENT:
        case RSSvartype.TALL:
        case RSSvartype.BELOP:
        case RSSvartype.KILOMETER:
            return <TallKomp sporsmal={sporsmal} />

        case RSSvartype.RADIO_GRUPPE:
            return <RadioKomp sporsmal={sporsmal} />
        case RSSvartype.RADIO_GRUPPE_TIMER_PROSENT:
            return <RadioTimerProsent sporsmal={sporsmal} />

        case RSSvartype.SELECT:
            return <Combobox sporsmal={sporsmal} />

        case RSSvartype.INFO_BEHANDLINGSDAGER:
            return <BehDager sporsmal={sporsmal} />

        case RSSvartype.LAND:
            return <Land sporsmal={sporsmal} />

        case RSSvartype.FRITEKST:
            return <Fritekst sporsmal={sporsmal} />

        case RSSvartype.KVITTERING:
            return <Opplasting sporsmal={sporsmal} />

        case RSSvartype.IKKE_RELEVANT:
            return <IkkeRelevant sporsmal={sporsmal} />

        default:
            return <UkjentSporsmal sporsmal={sporsmal} />
    }
}

export default SporsmalSwitch
