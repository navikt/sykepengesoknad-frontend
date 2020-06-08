import dayjs from 'dayjs';

import { hentPeriodeListe, hentSvar } from '../../components/sporsmal/hent-svar';
import { useAppStore } from '../../data/stores/app-store'
import { TagTyper } from '../../types/enums';
import { Sporsmal } from '../../types/types';
import { ukeDatoListe } from '../dato-utils';
import { finnHovedSporsmal, hentSporsmal } from '../soknad-utils';


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

    const validerGrad = ( spm: Sporsmal ) => {
        const dagerIPeriode = faktiskeSykedager.length;
        const uker = dagerIPeriode / 7;

        return uker + spm.id;
        // vet egentlig ikke hvordan vi kan få henta det bruker har skrevet inn for
        // timer pr. uke og faktisk prosent/timer her :(
    };

    return [ validerGrad ];
};

export default useValiderArbeidsgrad;
