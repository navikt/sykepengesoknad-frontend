import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import { localeUtils, MONTHS, WEEKDAYS_LONG, WEEKDAYS_SHORT } from '../daypicker/daypickerLocale';
import DayPickerCaption from '../daypicker/day-picker-caption';
import DayPickerNavBar from '../daypicker/day-picker-nav-bar';
import { erGyldigDato, erGyldigDatoformat } from '../../../utils/dato-utils';

export const leggTilNullForan = (nr: number) => {
    return nr > 9 || nr.toString().length > 1 ? nr : `0${nr}`;
};

interface DayPickerComponentProps {
    input: HTMLInputElement;
    onKeyUp: Function;
    lukk: Function;
    onDayClick: Function;
    senesteTom: Date;
    tidligsteFom: Date;
    erApen: boolean;
}

class DayPickerComponent extends Component<DayPickerComponentProps> {
    lukk: any;

    componentDidMount() {
        this.lukk = () => {
            this.props.lukk();
        };
        document.addEventListener('click', this.lukk);
        if (this.kalender) {
            this.kalender.focus();
        }
    }

    componentDidUpdate(prevProps: any) {
        if (!prevProps.erApen && this.props.erApen) {
            window.scrollTo(this.kalender);
            this.kalender.focus();
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.lukk);
    }

    getDateFromValue() {
        const { input } = this.props;
        const v = input.value;
        if (!erGyldigDatoformat(v) || !erGyldigDato(v)) {
            return undefined;
        }
        const d = input.value.split('.');
        return new Date(`${d[2]}-${d[1]}-${d[0]}`);
    }

    getInitialMonth() {
        const s = this.getDateFromValue();
        if (s) {
            return s;
        }
        return this.props.senesteTom || new Date();
    }

    selectedDays(day: any) {
        const dateFromValue = this.getDateFromValue();
        if (dateFromValue === undefined) {
            return false;
        }
        return DateUtils.isSameDay(dateFromValue, day);
    }

    erDeaktivertDag(day: any) {
        const { tidligsteFom, senesteTom } = this.props;
        const _day = new Date(`${day.getFullYear()}-${leggTilNullForan(day.getMonth() + 1)}-${leggTilNullForan(day.getDate())}`);
        return _day < tidligsteFom || _day > senesteTom;
    }

    kalender: any;

    render() {
        const { onKeyUp } = this.props;
        return (
            <div className="datokalender"
                role="application"
                tabIndex={-1}
                ref={(c) => {
                    this.kalender = c as HTMLDivElement;
                }}
                onKeyDown={(e) => {
                    const OPP = 40;
                    const NED = 38;
                    if ([OPP, NED].indexOf(e.keyCode) > -1) {
                        e.preventDefault();
                    }
                }}
                onKeyUp={(e) => {
                    onKeyUp(e);
                }}>
                <DayPicker
                    locale="no"
                    months={MONTHS}
                    weekdaysLong={WEEKDAYS_LONG}
                    weekdaysShort={WEEKDAYS_SHORT}
                    initialMonth={this.getInitialMonth()}
                    localeUtils={localeUtils}
                    firstDayOfWeek={1}
                    captionElement={<DayPickerCaption date={new Date()}/>}
                    navbarElement={<DayPickerNavBar onNextClick={() => ''} onPreviousClick={() => ''} showNextButton={true} showPreviousButton={true}/>}
                    disabledDays={(day) => {
                        return this.erDeaktivertDag(day);
                    }}
                    selectedDays={(day) => {
                        return this.selectedDays(day);
                    }}
                    onDayClick={(jsDato, modifiers, event) => {
                        if (!this.erDeaktivertDag(jsDato)) {
                            this.props.onDayClick(event, jsDato);
                        }
                    }}
                />
            </div>
        );
    }
}

export default DayPickerComponent;
