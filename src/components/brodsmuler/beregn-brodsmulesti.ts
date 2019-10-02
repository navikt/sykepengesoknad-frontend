import beregnSteg from './beregn-steg';
import { getSykefravaerUrl, getUrlTilSoknad } from '../../utils/url-utils';
import { Steg } from '../../types/enums';

interface BrodSmule {
    tittel: string;
    sti: string;
    erKlikkbar: boolean;
}

const beregnBrodsmulesti = (sti: string, id: string) => {
    const dittSykefravaerSmule: BrodSmule = {
        tittel: 'Ditt sykefravær',
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
        case Steg.KVITTERING: {
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
