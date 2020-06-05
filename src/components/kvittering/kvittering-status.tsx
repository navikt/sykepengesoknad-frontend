import React, { useEffect, useState } from 'react';
import { AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { useAppStore } from '../../data/stores/app-store';
import { tekst } from '../../utils/tekster';
import { SvarTil } from '../../types/enums';
import dayjs from 'dayjs';
import Vis from '../vis';

const KvitteringStatus = () => {
    const { valgtSoknad } = useAppStore();
    const [ tilArbNavn, setTilArbNavn ] = useState<string>();
    const [ tilOrg, setTilOrg ] = useState<string>();
    const [ tilNavDato, setTilNavDato ] = useState<string>();
    const [ tilArbDato, setTilArbDato ] = useState<string>();

    useEffect(() => {
        const sendtTilNav = valgtSoknad?.sendtTilNAVDato;
        const datoNav = dayjs(sendtTilNav).format('dddd D. MMM, kl hh:mm');
        setTilNavDato(datoNav.charAt(0).toUpperCase() + datoNav.slice(1));

        const sendtTilArb = valgtSoknad?.sendtTilArbeidsgiverDato;
        const datoArb = dayjs(sendtTilArb).format('dddd D. MMM, kl hh:mm');
        setTilArbDato(datoArb.charAt(0).toUpperCase() + datoArb.slice(1));
        setTilArbNavn(valgtSoknad?.arbeidsgiver?.navn ? valgtSoknad?.arbeidsgiver?.navn : SvarTil.ARBEIDSGIVER);
        setTilOrg(valgtSoknad?.arbeidsgiver?.orgnummer ? `(Org.nr. ${valgtSoknad.arbeidsgiver.orgnummer})` : '');
        // eslint-disable-next-line
    }, [])


    return (
        <Vis hvis={valgtSoknad!.sendtTilArbeidsgiverDato || valgtSoknad!.sendtTilNAVDato}>
            <AlertStripeSuksess>
                <Vis hvis={valgtSoknad!.sendtTilArbeidsgiverDato}>
                    <Undertittel tag="h2">
                        {tekst('kvittering.soknaden-er-sendt-til')} {tilArbNavn} {tilOrg}
                    </Undertittel>
                    <Normaltekst>
                        {tekst('kvittering.mottatt')}: {tilArbDato}
                    </Normaltekst>
                </Vis>
                <Vis hvis={valgtSoknad!.sendtTilNAVDato}>
                    <Undertittel tag="h2">
                        {tekst('kvittering.soknaden-er-sendt-til')} { SvarTil.NAV }
                    </Undertittel>
                    <Normaltekst>
                        {tekst('kvittering.mottatt')}: {tilNavDato}
                    </Normaltekst>
                </Vis>
            </AlertStripeSuksess>
        </Vis>
    );
};

export default KvitteringStatus;
