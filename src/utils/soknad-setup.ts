import { Soknad, Sykmelding } from '../types/types';

export const finnSoknad = (state: any, ownProps: any) => {
    const soknader = state.soknader.data.filter((s: Soknad) => {
        return s.id === ownProps.params.sykepengesoknadId;
    });
    return soknader.length === 1 ? soknader[0] : undefined;
};

export const finnSykmelding = (state: any, ownProps: any) => {
    const soknad = finnSoknad(state, ownProps);
    const sykmeldinger = state.dineSykmeldinger.data.filter((s: Sykmelding) => {
        return s.id === soknad.sykmeldingId;
    });
    return sykmeldinger.length === 1 ? sykmeldinger[0] : undefined;
};

/*
const soknadSetup = (validate: Function, Component: ReactNode, initialize = false) => {

    return compose(
        connected,
        reduxForm({
            validate,
            destroyOnUnmount: false,
            forceUnregisterOnUnmount: true,
            enableReinitialize: true,
            keepDirtyOnReinitialize: true,
            onSubmitFail: (errors, dispatch, submitError, props) => {
                onSubmitFail(errors, dispatch, getSoknadSkjemanavn(props.soknad.id));
            },
        }),
    )(Component);
};
*/

//export default soknadSetup;
