import dayjs from 'dayjs'
import { useFormContext } from 'react-hook-form'

import { hentPeriodeListe, hentSvar } from '../../components/sporsmal/hent-svar'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { Sporsmal } from '../../types/types'
import { ukeDatoListe } from '../dato-utils'
import { finnHovedSporsmal, hentSporsmal, hentUndersporsmal } from '../soknad-utils'
import { getLedetekst, tekst } from '../tekster'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'

const useValiderArbeidsgrad = (sporsmal: Sporsmal) => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    const { getValues } = useFormContext()
    if (!valgtSoknad || (sporsmal.tag !== 'HVOR_MYE_TIMER_VERDI' && sporsmal.tag !== 'HVOR_MYE_HAR_DU_JOBBET')) {
        return { undefined }
    }

    const hovedSporsmal = finnHovedSporsmal(valgtSoknad, sporsmal)

    const tilbake = hentSvar(hentSporsmal(valgtSoknad, 'TILBAKE_NAR')!)

    const periode = valgtSoknad.soknadPerioder[hovedSporsmal!.tagIndex!]
    const periodeDager = ukeDatoListe(periode.fom.toString(), periode.tom.toString())

    const sykedagerForFrilansere = () => {
        return periodeDager
            .filter((dag) => dag.day() !== 0 && dag.day() !== 6)
            .filter((dag) => {
                if (tilbake !== '') {
                    return dag < dayjs(tilbake)
                } else {
                    return true
                }
            })
    }

    const sykedagerForArbeidstakere = () => {
        const feriedager = hentPeriodeListe(hentSporsmal(valgtSoknad, 'FERIE_NAR_V2')!).flatMap((periode) =>
            ukeDatoListe(periode.fom, periode.tom),
        )
        const permisjonsdager = hentPeriodeListe(hentSporsmal(valgtSoknad, 'PERMISJON_NAR_V2')!).flatMap((periode) =>
            ukeDatoListe(periode.fom, periode.tom),
        )
        const ekskluderteDager = [feriedager, permisjonsdager].flat()

        return periodeDager
            .filter((dag) => !ekskluderteDager.find((ekskludertDag) => ekskludertDag.toString() === dag.toString()))
            .filter((dag) => dag.day() !== 0 && dag.day() !== 6)
            .filter((dag) => {
                if (tilbake !== '') {
                    return dag < dayjs(tilbake)
                } else {
                    return true
                }
            })
    }

    const validerGrad = () => {
        const faktiskArbeidsGrad = beregnGrad()
        const forventetArbeidsGrad = 1.0 - periode.grad / 100

        return faktiskArbeidsGrad < forventetArbeidsGrad
            ? getLedetekst(tekst('soknad.feilmelding.MINDRE_TIMER_ENN_FORVENTET'), {
                  '%PROSENT%': Math.floor(faktiskArbeidsGrad! * 100),
              })
            : true
    }

    const beregnGradNy = (
        hvorMyeTimerVerdi: string,
        jobberDuNormalArbeidsuke: string,
        hvorMangeTimerPerUke: string,
    ) => {
        /* forskjellen på denne funksjonen og beregnGrad er at denne funksjonen tar
        inn verdier som argumenter, mens beregnGrad henter verdier fra formen
        beregnGrad virker onSubmit, men ikke alltid fortløpende mens bruker fyller
        inn verdier
         */
        const faktiskeSykedager =
            valgtSoknad.soknadstype === RSSoknadstype.ARBEIDSTAKERE
                ? sykedagerForArbeidstakere()
                : sykedagerForFrilansere()
        const dagerIPeriode = faktiskeSykedager.length

        const uker = dagerIPeriode / 5

        function timerPerUkeVanligvis() {
            if (jobberDuNormalArbeidsuke === 'JA') {
                return 37.5
            }
            if (hvorMangeTimerPerUke !== '') {
                return parseFloat(hvorMangeTimerPerUke)
            }
            // vi kan ikke regne ut arbeidsgrad hvis bruker ikke har svart her
            return undefined
        }

        function timerDennePerioden() {
            if (hvorMyeTimerVerdi !== '') {
                return parseFloat(hvorMyeTimerVerdi)
            }
            // vi beregner ikke arbeidsgrad hvis bruker oppgir prosent eller ikke enda har opgitt antall timer
            return undefined
        }
        const timerPerUke = timerPerUkeVanligvis()
        const faktiskTimer = timerDennePerioden()

        if (!faktiskTimer || !timerPerUke) {
            return undefined
        } else {
            return faktiskTimer / uker / timerPerUke
        }
    }

    const beregnGrad = () => {
        const values = getValues()
        const timerPerUkeId = hentUndersporsmal(hovedSporsmal!, 'HVOR_MANGE_TIMER_PER_UKE')!.id
        const faktiskTimerId = hentUndersporsmal(hovedSporsmal!, 'HVOR_MYE_TIMER_VERDI')!.id

        const timerPerUke = parseFloat(values[timerPerUkeId])
        const faktiskTimer = parseFloat(values[faktiskTimerId])

        const faktiskeSykedager =
            valgtSoknad.soknadstype === RSSoknadstype.ARBEIDSTAKERE
                ? sykedagerForArbeidstakere()
                : sykedagerForFrilansere()

        const dagerIPeriode = faktiskeSykedager.length

        const uker = dagerIPeriode / 5

        return faktiskTimer / uker / timerPerUke
    }

    return { beregnGrad, validerGrad, periode, hovedSporsmal, beregnGradNy }
}

export default useValiderArbeidsgrad
