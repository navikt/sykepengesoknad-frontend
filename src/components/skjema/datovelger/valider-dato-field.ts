import { erGyldigDato, erGyldigDatoformat } from '../../../utils/dato-utils';
import validerPeriode from './valider-periode';

const validerDatoField = (input: any, alternativer: any) => {
    if (!input) {
        return 'Vennligst fyll ut dato';
    } else if (!erGyldigDatoformat(input)) {
        return 'Datoen må være på formatet dd.mm.åååå';
    } else if (!erGyldigDato(input)) {
        return 'Datoen er ikke gyldig';
    } else if (alternativer && (alternativer.fra || alternativer.til)) {
        return validerPeriode(input, alternativer);
    }
    return undefined;
};

export default validerDatoField;
