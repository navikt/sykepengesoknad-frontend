import * as React from 'react';
import { ReactElement } from 'react';
import Banner from '../components/banner/banner';
import { RouteComponentProps } from 'react-router';
import { Brodsmule, Soknad } from '../types/types';
import { getLedetekst } from '@navikt/digisyfo-npm';
import beregnBrodsmulesti from '../components/brodsmuler/beregn-brodsmulesti';
import { AvgittAvTyper, SoknadStatuser, SoknadTyper, SvarTyper } from '../types/enums';

interface SoknadWrapperProps {
    soknad: Soknad,
    children: ReactElement<any>,
    brodsmuler: Brodsmule[]
}

const soknadSkalUtfylles = (soknad: Soknad) => {
    return soknad && (soknad.status === SoknadStatuser.NY || soknad.status === SoknadStatuser.UTKAST_TIL_KORRIGERING);
};

const SoknadWrapper = ({ soknad, children, brodsmuler }: SoknadWrapperProps) => {
    return soknadSkalUtfylles(soknad)
        ? (
            <>
                <Banner soknad={soknad} brodsmuler={brodsmuler}/>
                <div className="begrensning begrensning--soknad">
                    {children}
                </div>
            </>
        )
        : children;
};

interface SoknadSideProps {
    sti: string;
    soknadId: string;
}

type AllProps = SoknadSideProps & RouteComponentProps;

const SoknadSide = ({ sti, soknadId }: AllProps): any => {
    const brodsmuler = beregnBrodsmulesti(
        sti === undefined ? 'soknader' : sti,
        soknadId === undefined ? 'asdfa-33-lkjj' : soknadId,
    );
    const soknad: Soknad = {
        id: 'sdfgasdfg',
        sykmeldingId: 'sdfasdfg',
        soknadstype: SoknadTyper.ARBEIDSTAKERE,
        status: SoknadStatuser.NY,
        fom: new Date(),
        tom: new Date(),
        avbruttDato: new Date(),
        opprettetDato: new Date(),
        innsendtDato: new Date(),
        sendtTilNAVDato: new Date(),
        sendtTilArbeidsgiverDato: new Date(),
        sporsmal: [{
            id: 'ljlskj-asdfadsf-2344-sdfgs',
            kriterieForVisningAvUndersporsmal: 'Bra språk',
            max: 9,
            min: 3,
            sporsmalstekst: 'Hva heter du?',
            svar: {
                avgittAv: AvgittAvTyper.TIDLIGERE_SOKNAD,
                verdi: 'Ja'
            },
            svartype: SvarTyper.DATO,
            tag: 'ole',
            undertekst: 'Vær så snill da...',
            pavirkerAndreSporsmal: false
        }]
    };

    return (
        <SoknadWrapper brodsmuler={brodsmuler} soknad={soknad} >
            <h1>
                {getLedetekst('aktivitetskrav-varsel.alt.MED_ARBEIDSGIVER')}
            </h1>
        </SoknadWrapper>
    )
};

export default SoknadSide;
