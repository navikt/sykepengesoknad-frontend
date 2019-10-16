import { LocaleUtils } from 'react-day-picker';
import { tilLesbarDatoMedArstall } from '../../../utils/dato-utils';

export const MONTHS = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'];
export const WEEKDAYS_LONG = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'];
export const WEEKDAYS_SHORT = ['søn', 'man', 'tir', 'ons', 'tor', 'fre', 'lør'];

export const formatDay = (date: Date) => {
    // aria-label på dager
    return `${WEEKDAYS_LONG[date.getDay()]} ${tilLesbarDatoMedArstall(date)}`;
};

export const localeUtils = {
    ...LocaleUtils,
    formatDay,
};
