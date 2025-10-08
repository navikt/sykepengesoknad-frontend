import React from 'react'

import { RSSvartype } from '../../types/rs-types/rs-svartype'
import { Sporsmal } from '../../types/types'

import BehDager from './typer/beh-dager'
import CheckboxKomp from './typer/checkbox-komp'
import CheckboxPanel from './typer/checkbox-panel'
import DagerKomp from './typer/dager-komp'
import IkkeRelevant from './typer/ikke-relevant'
import JaNeiStor from './typer/ja-nei-stor'
import JaNeiLiten from './typer/ja-nei-liten'
import Opplasting from './typer/opplasting'
import Perioder from './typer/perioder'
import RadioTimerProsent from './typer/radio-timer-prosent'
import TallKomp from './typer/tall-komp'
import UkjentSporsmal from './typer/ukjent-sporsmal'
import { Fritekst } from './typer/fritekst'
import RadioKomp from './typer/radio-komp'
import ComboboxSingle from './typer/combobox-single'
import ComboboxMultiple from './typer/combobox-multiple'
import GruppeAvUndersporsmal from './typer/gruppe-av-undersporsmal'
import Oppsummeringsside from './typer/oppsummeringsside'
import MonthInput from './typer/maaned-komp'
import DatoInput from './typer/dato-komp'

interface SporsmalSwitchProps {
    sporsmal: Sporsmal
    sporsmalIndex: number
    erSisteSporsmal: boolean
    erHovedsporsmal: boolean
}
const SporsmalSwitch = ({ sporsmal, sporsmalIndex, erSisteSporsmal, erHovedsporsmal }: SporsmalSwitchProps) => {
    switch (sporsmal.svartype) {
        case RSSvartype.CHECKBOX_PANEL:
            return <CheckboxPanel sporsmal={sporsmal} />

        case RSSvartype.CHECKBOX_GRUPPE:
            return <CheckboxKomp sporsmal={sporsmal} />

        case RSSvartype.DATO:
            return <DatoInput sporsmal={sporsmal} />

        case RSSvartype.MAANED:
            return <MonthInput sporsmal={sporsmal} />

        case RSSvartype.PERIODE:
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
            return <RadioKomp sporsmal={sporsmal} erHovedsporsmal={erHovedsporsmal} />
        case RSSvartype.RADIO_GRUPPE_TIMER_PROSENT:
            return <RadioTimerProsent sporsmal={sporsmal} />

        case RSSvartype.COMBOBOX_SINGLE:
            return <ComboboxSingle sporsmal={sporsmal} />

        case RSSvartype.INFO_BEHANDLINGSDAGER:
            return <BehDager sporsmal={sporsmal} />

        case RSSvartype.LAND:
        case RSSvartype.COMBOBOX_MULTI:
            return <ComboboxMultiple sporsmal={sporsmal} />

        case RSSvartype.FRITEKST:
            return <Fritekst sporsmal={sporsmal} />

        case RSSvartype.KVITTERING:
            return <Opplasting sporsmal={sporsmal} />

        case RSSvartype.GRUPPE_AV_UNDERSPORSMAL:
            return (
                <GruppeAvUndersporsmal
                    sporsmal={sporsmal}
                    sporsmalIndex={sporsmalIndex}
                    erSisteSporsmal={erSisteSporsmal}
                />
            )

        case RSSvartype.IKKE_RELEVANT:
            return <IkkeRelevant sporsmal={sporsmal} />

        case RSSvartype.BEKREFTELSESPUNKTER:
        case RSSvartype.OPPSUMMERING:
            return <Oppsummeringsside sporsmal={sporsmal} />

        default:
            return <UkjentSporsmal sporsmal={sporsmal} />
    }
}

export default SporsmalSwitch
