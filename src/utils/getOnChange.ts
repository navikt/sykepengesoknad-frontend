import { erGyldigDato } from './datoUtils';

export const getOnChange = (props: any) => {
    if (props.pavirkerAndreSporsmal) {
        return (event: any, newValue: any) => {
            props.actions.soknadEndret(props.soknad, props.name, newValue);
        };
    }
    return null;
};

/*
export const getOnChangeForDato = (props: any) => {
    if (props.pavirkerAndreSporsmal) {
        return (event: any, newValue: any) => {
            const formatertVerdi = formaterEnkeltverdi(newValue);
            if (erGyldigDato(formatertVerdi)) {
                props.actions.soknadEndret(props.soknad, props.name, newValue);
            }
        };
    }
    return null;
};
*/

export const getOnChangeForPerioder = (props: any) => {
    if (props.pavirkerAndreSporsmal) {
        return (name: any, newValue: any) => {
            if (erGyldigDato(newValue)) {
                props.actions.soknadEndret(props.soknad, name, newValue, props.svartype);
            }
        };
    }
    return null;
};
