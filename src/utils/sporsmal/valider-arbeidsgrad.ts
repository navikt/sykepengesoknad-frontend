import dayjs from 'dayjs';

import { hentPeriodeListe, hentSvar } from '../../components/sporsmal/hent-svar';
import { useAppStore } from '../../data/stores/app-store'
import { TagTyper } from '../../types/enums';
import { Sporsmal } from '../../types/types';
import { ukeDatoListe } from '../dato-utils';
import { finnHovedSporsmal, hentSporsmal, hentUndersporsmal } from '../soknad-utils';


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
        if (![ TagTyper.JOBBET_DU_GRADERT, TagTyper.JOBBET_DU_100_PROSENT ].includes(hovedSporsmal!.tag)) {
            return true;
        }
        if (values[hovedSporsmal!.id] === 'NEI') {
            return true;
        }

        const verditype = hentUndersporsmal(hovedSporsmal!, TagTyper.HVOR_MYE_HAR_DU_JOBBET)!.id;

        if (values[verditype] === 'prosent') {
            return true;
        }

        const timerTotaltId = hentUndersporsmal(hovedSporsmal!, TagTyper.HVOR_MANGE_TIMER_PER_UKE)!.id;
        const faktiskTimerId = hentUndersporsmal(hovedSporsmal!, TagTyper.HVOR_MYE_TIMER_VERDI)!.id;

        const dagerIPeriode = faktiskeSykedager.length;
        const uker = dagerIPeriode / 7;
        const sykefravaerGrad = periode.grad / 100;
        const timerTotalt = parseFloat(values[timerTotaltId]);
        const faktiskTimer = parseFloat(values[faktiskTimerId]);

        const maksArbeid = timerTotalt * uker * sykefravaerGrad;

        const faktiskGrad = faktiskTimer / maksArbeid;

        return faktiskGrad < sykefravaerGrad;
    };

    return [ validerGrad ];
};

export default useValiderArbeidsgrad;
