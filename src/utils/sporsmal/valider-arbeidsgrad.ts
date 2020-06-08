import { hentPeriodeListe, hentSvar } from '../../components/sporsmal/hent-svar';
import { useAppStore } from '../../data/stores/app-store'
import { TagTyper } from '../../types/enums';
import { Sporsmal } from '../../types/types';
import { finnHovedSporsmal, hentSporsmal } from '../soknad-utils';

const periodeTilListeAvDager = ( fom: Date, tom: Date ): Date[] => {
    let dager: Date[] = [];

    const dag = new Date(Date.UTC(fom.getFullYear(), fom.getMonth(), fom.getDate()));
    const utcTom = new Date(Date.UTC(tom.getFullYear(), tom.getMonth(), tom.getDate()));
    while (dag <= utcTom) {
        dager = [ ...dager, new Date(Date.UTC(dag.getUTCFullYear(), dag.getUTCMonth(), dag.getUTCDate())) ];
        dag.setDate(dag.getUTCDate() + 1);
    }

    return dager;
};

const useValiderArbeidsgrad = ( sporsmal: Sporsmal ) => {
    const { valgtSoknad } = useAppStore();

    const feriedager = hentPeriodeListe(hentSporsmal(valgtSoknad!, TagTyper.FERIE_NAR_V2)!)
        .flatMap(periode => periodeTilListeAvDager(periode[0], periode[1]));
    const permisjonsdager = hentPeriodeListe(hentSporsmal(valgtSoknad!, TagTyper.PERMISJON_NAR_V2)!)
        .flatMap(periode => periodeTilListeAvDager(periode[0], periode[1]));
    const ekskluderteDager = [ feriedager, permisjonsdager ].flat();

    const tilbake = hentSvar(hentSporsmal(valgtSoknad!, TagTyper.TILBAKE_NAR)!);

    const hovedSporsmal = finnHovedSporsmal(valgtSoknad!, sporsmal);
    const periode = valgtSoknad!.soknadPerioder[hovedSporsmal!.tagIndex!];
    const periodeDager = periodeTilListeAvDager(new Date(periode.fom), new Date(periode.tom));

    const faktiskeSykedager = periodeDager
        .filter(dag => !ekskluderteDager.find(ekskludertDag => ekskludertDag.getTime() === dag.getTime()))
        .filter(dag => {
            if (tilbake !== '') {
                return dag.getTime() < tilbake?.getTime()
            } else {
                return true
            }
        });

    const kalkulerGrad = ( spm: Sporsmal ) => {
        const dagerIPeriode = faktiskeSykedager.length;
        const uker = dagerIPeriode / 7;

        return uker + spm.id;
        // vet egentlig ikke hvordan vi kan få henta det bruker har skrevet inn for
        // timer pr. uke og faktisk prosent/timer her :(
    };

    return [ kalkulerGrad ];
};

export default useValiderArbeidsgrad;
