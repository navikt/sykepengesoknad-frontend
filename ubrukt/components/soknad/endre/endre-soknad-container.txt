import { connect } from 'react-redux';
import EndreSoknad from './EndreSoknad';
import { opprettUtkastTilKorrigeringForespurt } from '../../data/soknader/soknaderActions';

export const visEndringSelector = (state, soknad) => {
    const ETT_AAR_SIDEN = new Date();
    ETT_AAR_SIDEN.setYear(ETT_AAR_SIDEN.getFullYear() - 1);
    return soknad.opprettetDato >= ETT_AAR_SIDEN;
};

export const mapStateToProps = (state, ownProps) => {
    const soknad = ownProps.soknad;

    return {
        vis: visEndringSelector(state, soknad),
        endrer: state.soknader.endrer,
    };
};

const EndreSoknadContainer = connect(mapStateToProps, { endreSoknad: opprettUtkastTilKorrigeringForespurt })(EndreSoknad);

export default EndreSoknadContainer;
