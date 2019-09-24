import React from 'react';
// import { getLedetekst, Bjorn } from '@navikt/digisyfo-npm';
import { getOnChange } from '../../../src/utils/getOnChange';
import { Soknad, Sporsmal } from '../../../src/types/types';
import { Field } from 'formik';
import { formaterEnkeltverdi, genererParseForEnkeltverdi } from './field-utils';
import { AvgittAvTyper } from '../../../src/types/enums';
// import SporsmalMedTillegg from '../skjema/sporsmal-med-tillegg';

// export const jaEllerNeiAlternativer = [JA, NEI];

interface JaEllerNeiRadioknapperProps {
    input: HTMLInputElement,
    intro: string,
    sporsmalstekst: string,
    tag: string,
    soknad: Soknad,
}

/*
export const JaEllerNeiRadioknapper = ({input, intro, sporsmalstekst, tag, soknad}: JaEllerNeiRadioknapperProps) => (
    <Radioknapper name={input.name} spoersmal={sporsmalstekst}>
        {jaEllerNeiAlternativer
            .map((alternativ, index) => (
                <i value={alternativ}
                    label={getLedetekst(`soknad.${alternativ.toLowerCase()}`)}
                    key={index}>
                    <JaEllerNeiPresisering tag={tag} value={input.value} soknad={soknad}/>
                </i>
            ))
        }
    </Radioknapper>
);
*/

/*
const visAvgittAvBjorn = (props: any) => {
    const underspprsmal = props.undersporsmal.find((usporsmal: Sporsmal) => usporsmal.tag === 'EGENMELDINGER_NAR');
    if (underspprsmal) {
        return underspprsmal.svar.some(svaret => svaret.avgittAv === AvgittAvTyper.TIDLIGERE_SOKNAD);
    }
    return false;
};
*/

interface RendreJaEllerNeiProps {
    children: React.ReactNode,
    undersporsmal: Sporsmal[],
    hovedsporsmal: boolean,
    tag: string,
    soknad: Soknad,
}

/*
export const RendreJaEllerNei = ({ children, undersporsmal, hovedsporsmal, tag, soknad }: RendreJaEllerNeiProps) => {
    const classNames = hovedsporsmal ? 'hovedsporsmal' : null;
    const classNamesTilleggssporsmal = hovedsporsmal ? 'hovedsporsmal__tilleggssporsmal' : null;
    const hjelpetekst = <SporsmalHjelpetekst tag={tag}/>;

    const Sporsmal = hovedsporsmal
        ? (<JaEllerNeiRadiopanelgruppe {...props} hjelpetekst={hjelpetekst}/>)
        : (<JaEllerNeiRadioknapper {...props} hjelpetekst={hjelpetekst}/>);

    return undersporsmal.length === 0
        ? <div className={classNames}>{Sporsmal}</div>
        : <>
            <SporsmalMedTillegg
                Sporsmal={Sporsmal}
                className={classNames}
                visTillegg={_props => _props.input.value === _props.kriterieForVisningAvUndersporsmal}
            >
                {
                    visAvgittAvBjorn(props)
                        ? <Bjorn className="press" nokkel="sykepengesoknad.egenmeldingsdager.preutfylt-melding"/>
                        : null
                }
                <div className={classNamesTilleggssporsmal}>{children}</div>
                <SporsmalBjorn tag={tag} soknad={soknad} className="press"/>
            </SporsmalMedTillegg>
        </>;
};
*/

interface JaEllerNeiProps {
    tag: string,
    soknad: Soknad,
}

const JaEllerNei = ({ tag, soknad }: JaEllerNeiProps) => ([
    <Field
        // onChange={getOnChange(props)}
        key={`${tag}-field`}
        format={formaterEnkeltverdi}
        parse={genererParseForEnkeltverdi()}
        // component={RendreJaEllerNei}
    />,
{/*
    <SporsmalBjornKondisjonell soknad={soknad} key={`${tag}-sporsmalbjorn`} tag={tag}/>,
*/}
]);

export default JaEllerNei;
