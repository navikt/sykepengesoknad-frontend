import dayjs from 'dayjs';

import { hentPeriodeListe, hentSvar } from '../../components/sporsmal/hent-svar';
import { useAppStore } from '../../data/stores/app-store'
import { TagTyper } from '../../types/enums';
import { Sporsmal } from '../../types/types';
import { ukeDatoListe } from '../dato-utils';
import { finnHovedSporsmal, hentSporsmal, hentUndersporsmal } from '../soknad-utils';
import {getLedetekst, tekst} from "../tekster";


const useValiderArbeidsgrad = ( sporsmal: Sporsmal ) => {
    const { valgtSoknad } = useAppStore();

    const feriedager = hentPeriodeListe(hentSporsmal(valgtSoknad!, TagTyper.FERIE_NAR_V2)!)
        .flatMap(periode => ukeDatoListe(periode[0].toDateString(), periode[1].toDateString()));
    const permisjonsdager = hentPeriodeListe(hentSporsmal(valgtSoknad!, TagTyper.PERMISJON_NAR_V2)!)
        .flatMap(periode => ukeDatoListe(periode[0].toDateString(), periode[1].toDateString()));
    const ekskluderteDager = [ feriedager, permisjonsdager ].flat();

    const tilbake = hentSvar(hentSporsmal(valgtSoknad!, TagTyper.TILBAKE_NAR)!);

    const hovedSporsmal = finnHovedSporsmal(valgtSoknad!, sporsmal);
    const periode = valgtSoknad!.soknadPerioder[hovedSporsmal!.tagIndex!];
    const periodeDager = ukeDatoListe(periode.fom.toString(), periode.tom.toString());

    const faktiskeSykedager = periodeDager
        .filter(dag => !ekskluderteDager.find(ekskludertDag => ekskludertDag.toString() === dag.toString()))
        .filter(dag => {
            if (tilbake !== '') {
                return dag < dayjs(tilbake)
            } else {
                return true
            }
        });

    const validerGrad = ( values: Record<string, any> ) => {
        const timerPerUkeId = hentUndersporsmal(hovedSporsmal!, TagTyper.HVOR_MANGE_TIMER_PER_UKE)!.id;
        const faktiskTimerId = hentUndersporsmal(hovedSporsmal!, TagTyper.HVOR_MYE_TIMER_VERDI)!.id;

        const dagerIPeriode = faktiskeSykedager.length;
        const uker = dagerIPeriode / 7;
        const forventetArbeidsGrad = 1.0 - (periode.grad / 100);
        const timerPerUke = parseFloat(values[timerPerUkeId]);
        const faktiskTimer = parseFloat(values[faktiskTimerId]);

        const faktiskArbeidsGrad = faktiskTimer / uker / timerPerUke;

        return faktiskArbeidsGrad < forventetArbeidsGrad
            ? getLedetekst(tekst('soknad.feilmelding.MINDRE_TIMER_ENN_FORVENTET'), { 'GRAD': Math.round(forventetArbeidsGrad * 100)})
            : true;
    };

    return { validerGrad, hovedSporsmal };
};

export default useValiderArbeidsgrad;
