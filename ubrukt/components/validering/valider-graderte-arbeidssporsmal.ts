import { fraInputdatoTilJSDato, getLedetekst } from '@navikt/digisyfo-npm';
import { SvarEnums, TagTyper } from '../../../src/types/enums';
import { Soknad, Sporsmal } from '../../../src/types/types';
import { fjernIndexFraTag, formaterEnkeltverdi } from '../sporsmal/field-utils';
import { getStillingsprosent } from './beregnet-arbeidsgrad';

export const hentFerieOgPermisjonperioder = (skjemaverdier: any) => {
    const harHattFerie = formaterEnkeltverdi(skjemaverdier[TagTyper.FERIE_V2]) === SvarEnums.JA;
    const harHattPermisjon = formaterEnkeltverdi(skjemaverdier[TagTyper.PERMISJON_V2]) === SvarEnums.JA;
    const ferieperioder = harHattFerie ? skjemaverdier[TagTyper.FERIE_NAR_V2] : [];
    const permisjonperioder = harHattPermisjon ? skjemaverdier[TagTyper.PERMISJON_NAR_V2] : [];

    return [
        ...ferieperioder,
        ...permisjonperioder,
    ].map((periode) => {
        return {
            fom: fraInputdatoTilJSDato(periode.fom),
            tom: fraInputdatoTilJSDato(periode.tom),
        };
    });
};

const validerGraderteArbeidssporsmal = (sporsmalsliste: Sporsmal[], skjemaverdier: any, soknad: Soknad) => {
    const feilmeldinger: any = {};
    const graderteArbeidssporsmal = sporsmalsliste
        .filter((sporsmal) => {
            return fjernIndexFraTag(sporsmal.tag) === TagTyper.JOBBET_DU_GRADERT;
        })
        .filter((sporsmal) => {
            return formaterEnkeltverdi(skjemaverdier[sporsmal.tag]) === sporsmal.kriterieForVisningAvUndersporsmal;
        })
        .filter((sporsmal) => {
            const feriesporsmal = soknad.sporsmal.find((spm) => {
                return spm.tag === TagTyper.FERIE_V2;
            });
            const feriePermUtlandsporsmal = soknad.sporsmal.find((spm) => {
                return spm.tag === TagTyper.FERIE_PERMISJON_UTLAND;
            });
            const hovedsporsmalTags = soknad.sporsmal.map((s) => {
                return s.tag;
            });
            return feriesporsmal
                ? hovedsporsmalTags.indexOf(sporsmal.tag) > hovedsporsmalTags.indexOf(TagTyper.FERIE_V2)
                : !feriePermUtlandsporsmal;
        });
    graderteArbeidssporsmal.forEach((gradertArbeidssporsmal) => {
        const index = parseInt(gradertArbeidssporsmal.tag.split(`${TagTyper.JOBBET_DU_GRADERT}_`)[1], 10);
        const erSvarOppgittITimer = formaterEnkeltverdi(skjemaverdier[leggIndexPaTag(TagTyper.HVOR_MYE_TIMER, index)]);

        if (erSvarOppgittITimer) {
            const antallTimerPerNormalUke = formaterEnkeltverdi(skjemaverdier[leggIndexPaTag(TagTyper.HVOR_MANGE_TIMER_PER_UKE, index)]);
            const antallTimerJobbet = formaterEnkeltverdi(skjemaverdier[leggIndexPaTag(TagTyper.HVOR_MYE_TIMER_VERDI, index)]);
            const periode = soknad.soknadPerioder[index];
            // @ts-ignore
            const minsteArbeidsgrad: number = gradertArbeidssporsmal.undersporsmal
                .find((underspm: Sporsmal) => {
                    return fjernIndexFraTag(underspm.tag) === TagTyper.HVOR_MYE_HAR_DU_JOBBET;
                })
                .undersporsmal.find((underspm) => {
                    return fjernIndexFraTag(underspm.tag) === TagTyper.HVOR_MYE_PROSENT;
                })
                .undersporsmal.find((underspm) => {
                    return fjernIndexFraTag(underspm.tag) === TagTyper.HVOR_MYE_PROSENT_VERDI;
                }).min;
            const arbeidsgrad = getStillingsprosent(antallTimerJobbet, antallTimerPerNormalUke, periode, hentFerieOgPermisjonperioder(skjemaverdier));
            if (arbeidsgrad < minsteArbeidsgrad) {
                const key = leggIndexPaTag(TagTyper.HVOR_MYE_TIMER_VERDI, index);
                feilmeldinger[key] = getLedetekst(`soknad.feilmelding.${TagTyper.HVOR_MYE_TIMER_VERDI.toLowerCase()}.min`, {
                    '%MIN%': minsteArbeidsgrad - 1,
                });
            }
        }
    });

    return feilmeldinger;
};

export default validerGraderteArbeidssporsmal;

const leggIndexPaTag = (tag: TagTyper, index: number): string => {
    return `${tag}_${index}`;
};
