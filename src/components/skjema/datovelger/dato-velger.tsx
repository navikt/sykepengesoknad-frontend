import React, { useEffect, useState } from 'react';
import cls from 'classnames';
import MaskedInput from 'react-maskedinput';
import DayPickerComponent from './day-picker-dato';
import validerDatoField from './valider-dato-field';
import SkjemaFeilmelding from '../skjema-feilmelding';
import dayjs from 'dayjs';
import Vis from '../../../utils/vis';

export type Meta = {
    touched: boolean;
    error: string;
    form: HTMLFormElement;
}

interface DatoFieldProps {
    id: string;
    meta: Meta;
    input: HTMLInputElement;
    touch: Function;
    change: Function;
    oppdaterSporsmal: Function;
    parseVerdi: Function;
    tidligsteFom: Date;
    senesteTom: Date;
    inputValue: string;
}

// eslint-disable-next-line
const DatoField = (props: DatoFieldProps) => {
    const [ erApen, setErApen ] = useState(false);
    let toggle: HTMLElement;

    useEffect(() => {
        if (props.oppdaterSporsmal) {
            props.oppdaterSporsmal(null, props.inputValue);
        }
        // eslint-disable-next-line
    }, [ props.input.value ]);

    function onKeyUp(e: KeyboardEvent) {
        const ESCAPE_KEYCODE = 27;
        if (e.location === ESCAPE_KEYCODE) {
            lukk();
        }
    }

    function toggleApen() {
        if (erApen) {
            lukk();
        } else {
            apne();
        }
    }

    function apne() {
        setErApen(true);
    }

    function lukk() {
        setErApen(false);
        if (toggle) {
            toggle.focus();
        }
    }

    function parseVerdi(jsDato: string) {
        const verdi = dayjs(new Date(jsDato)).format('DD.MM.YYYY');
        return !props.parseVerdi
            ? verdi
            : props.parseVerdi(verdi);
    }

    const { meta, input, id, tidligsteFom, senesteTom } = props;
    const classNameMaskedInput = cls('skjemaelement__input  datovelger__input', {
        'skjemaelement__input--harFeil': meta.touched && meta.error,
    });

    return (
        <div className="datovelger">
            <div className="datovelger__inner"
                onClick={(event) => {
                    try {
                        event.nativeEvent.stopImmediatePropagation();
                    } catch (e) {
                        event.stopPropagation();
                    }
                }}>
                <div className="datovelger__inputContainer">
                    <MaskedInput
                        id={id}
                        type="tel"
                        mask="11.11.1111"
                        autoComplete="off"
                        placeholder="dd.mm.åååå"
                        onKeyUp={() => {
                            setErApen(false);
                        }}
                        className={classNameMaskedInput}
                        {...input.value}
                    />
                    <button
                        type="button"
                        className="js-toggle datovelger__toggleDayPicker"
                        ref={(c) => {
                            toggle = c as HTMLButtonElement;
                        }}
                        id={`toggle-${id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            toggleApen();
                        }}
                        aria-pressed={erApen}>
                        {erApen ? 'Skjul datovelger' : 'Vis datovelger'}
                    </button>
                </div>

                <Vis hvis={erApen}>
                    <DayPickerComponent
                        {...props}
                        erApen={erApen}
                        tidligsteFom={tidligsteFom}
                        senesteTom={senesteTom}
                        onDayClick={(event: MouseEvent, jsDato: string) => {
                            const verdi = parseVerdi(jsDato);
                            props.change(meta.form, props.input.name, verdi);
                            props.touch(meta.form, props.input.name);
                            lukk();
                        }}
                        onKeyUp={(e: KeyboardEvent) => {
                            onKeyUp(e);
                        }}
                        lukk={() => {
                            lukk();
                        }}
                    />
                </Vis>
                <SkjemaFeilmelding {...meta} />
            </div>
        </div>
    );
};

export const genererValidate = (props: DatoVelgerProps) => {
    return (verdi: string) => {
        // TODO: Sjekk .format
        /*
                const formatertVerdi = props.format
                    ? props.format(verdi)
                    : verdi;
        */
        return validerDatoField(verdi, {
            fra: props.tidligsteFom,
            til: props.senesteTom,
        });
    };
};

interface DatoVelgerProps {
    tidligsteFom?: Date;
    senesteTom?: Date;
    oppdaterSporsmal: ((event: any, newValue: any) => void) | null;
    format: Function;
    parse: Function;
    parseVerdi: Function;
    name: string;
    id: string;
    ref: any;
}

const DatoVelger = (props: DatoVelgerProps) => {
    return (
        <input type="date" />
    );
};

export default DatoVelger;
