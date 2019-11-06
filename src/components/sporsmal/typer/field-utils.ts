import { SvarEnums } from '../../../types/enums';

export const genererParseForEnkeltverdi = () => {
    return (verdi: string) => {
        return verdi || verdi === ''
            ? {
                svarverdier: [{
                    verdi,
                }],
            }
            : undefined;
    };
};

export const genererParseForFlereVerdier = () => {
    return (verdier: any = []) => {
        return {
            svarverdier: verdier.map((verdi: any) => {
                return {
                    verdi,
                };
            }),
        };
    };
};

export const genererParseForCheckbox = () => {
    const parse = genererParseForEnkeltverdi();
    return (value: boolean) => {
        const checkedVerdi = value ? SvarEnums.CHECKED : SvarEnums.UNCHECKED;
        return parse(checkedVerdi);
    };
};

export const formaterEnkeltverdi = (value: any) => {
    try {
        const verdi = value.svarverdier[0].verdi;
        return (verdi === SvarEnums.CHECKED || verdi === SvarEnums.UNCHECKED)
            ? verdi === SvarEnums.CHECKED
            : verdi;
    } catch (e) {
        return '';
    }
};

export const formaterFlereVerdier = (verdi: any) => {
    return !verdi || !verdi.svarverdier
        ? []
        : verdi.svarverdier.map((svarverdi: any) => {
            return svarverdi.verdi;
        });
};

export const fjernIndexFraTag = (tag: string) => {
    const separator = '_';
    const tagdeler = tag.split(separator);
    if (!isNaN(parseInt(tagdeler[tagdeler.length - 1], 10))) {
        tagdeler.splice(-1, 1);
        return tagdeler.join(separator);
    }
    return tag;
};

export const tagMatcher = (tags: string[], inputTag: any) => {
    return tags.filter((tag) => {
        return inputTag.indexOf(tag) > -1;
    }).length > 0;
};
