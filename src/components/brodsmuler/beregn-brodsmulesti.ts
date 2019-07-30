import { getLedetekst } from '@navikt/digisyfo-npm';
import beregnSteg, { KVITTERING } from './beregn-steg';
import { getSykefravaerUrl, getUrlTilSoknad } from '../../utils/url-utils';

interface BrodSmule {
    tittel: string;
    sti: string;
    erKlikkbar: boolean;
}

const beregnBrodsmulesti = (sti: string, id: string) => {
    const dittSykefravaerSmule: BrodSmule = {
        tittel: getLedetekst('landingsside.sidetittel'),
        sti: getSykefravaerUrl(),
        erKlikkbar: true,
    };

    const soknaderSmule: BrodSmule = {
        tittel: 'Søknader om sykepenger',
        sti: getUrlTilSoknad(id, sti),
        erKlikkbar: true,
    };

    const soknadSmule: BrodSmule = {
        tittel: 'Søknad',
        sti: getUrlTilSoknad(id, sti),
        erKlikkbar: true,
    };

    switch (beregnSteg(sti)) {
        case KVITTERING: {
            const kvitteringSmule: BrodSmule = {
                tittel: 'Kvittering',
                sti: '/kvittering',
                erKlikkbar: false
            };
            return [dittSykefravaerSmule, soknaderSmule, soknadSmule, kvitteringSmule];
        }
        default: {
            return [dittSykefravaerSmule, soknaderSmule, soknadSmule];
        }
    }
};

export default beregnBrodsmulesti;
