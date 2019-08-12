import React from 'react';
import PropTypes from 'prop-types';
import beregnSteg, { AKTIVITETER_I_SYKMELDINGSPERIODEN, FOER_DU_BEGYNNER, FRAVAER_OG_FRISKMELDING, KVITTERING, OPPSUMMERING } from '../../sykepengesoknad/utils/beregnSteg';
import Feilmelding from '../../components/Feilmelding';
import FoerDuBegynnerContainer from '../for-du-begynner/FoerDuBegynnerContainer';
import FravaerOgFriskmeldingContainer from '../fravar-og-friskmelding/FravaerOgFriskmeldingContainer';
import AktiviteterISykmeldingsperiodenContainer from '../aktiviteter-i-sykmeldingsperioden/AktiviteterISykmeldingsperiodenContainer';
import OppsummeringContainer from '../oppsummering/OppsummeringContainer';
import KvitteringContainer from '../kvittering/KvitteringContainer';

const SoknadController = (props) => {
    const { sti } = props;
    const steg = beregnSteg(sti);
    switch (steg) {
        case FOER_DU_BEGYNNER: {
            return <FoerDuBegynnerContainer {...props} />;
        }
        case FRAVAER_OG_FRISKMELDING: {
            return <FravaerOgFriskmeldingContainer {...props} />;
        }
        case AKTIVITETER_I_SYKMELDINGSPERIODEN: {
            return <AktiviteterISykmeldingsperiodenContainer {...props} />;
        }
        case OPPSUMMERING: {
            return <OppsummeringContainer {...props} />;
        }
        case KVITTERING: {
            return <KvitteringContainer {...props} />;
        }
        default: {
            return <Feilmelding />;
        }
    }
};

SoknadController.propTypes = {
    sti: PropTypes.string,
};

export default SoknadController;
