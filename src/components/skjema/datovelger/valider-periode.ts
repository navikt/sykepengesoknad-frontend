import { fraInputdatoTilJSDato, tilLesbarDatoMedArstall, tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils';

const validerPeriode = (input: any, alternativer: any) => {
    const { fra, til } = alternativer;
    const inputDato = fraInputdatoTilJSDato(input);

    if (fra && til && (inputDato < fra || inputDato > til)) {
        return `Datoen må være innenfor perioden ${tilLesbarPeriodeMedArstall(fra, til)}`;
    }
    if (til && inputDato > til) {
        return `Datoen må være før ${tilLesbarDatoMedArstall(til)}`;
    }
    if (fra && inputDato < fra) {
        return `Datoen må være etter ${tilLesbarDatoMedArstall(fra)}`;
    }
    return undefined;
};

export default validerPeriode;
