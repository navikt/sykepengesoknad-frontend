import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import cls from 'classnames';
import MaskedInput from 'react-maskedinput';
import DayPickerComponent from './day-picker-dato';
import validerDatoField from './valider-dato-field';
import SkjemaFeilmelding from '../skjema-feilmelding';
import dayjs from 'dayjs';
import Vis from '../../../utils/vis';

interface DatoFieldProps {
    id: string;
    name: string;
    onChange: (e: ChangeEvent<any>, newValue?: any) => void;
    parseVerdi: Function;
    tidligsteFom: Date;
    senesteTom: Date;
    ref: any;
}

const DatoField = (props: DatoFieldProps) => {
    const [ erApen, setErApen ] = useState(false);
    const toggle = useRef<HTMLButtonElement>(null);
    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // eslint-disable-next-line
    }, [ input.current.value ]);

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
        if (toggle.current) {
            toggle.current.focus();
        }
    }

    function parseVerdi(jsDato: string) {
        const verdi = dayjs(new Date(jsDato)).format('DD.MM.YYYY');
        return !props.parseVerdi
            ? verdi
            : props.parseVerdi(verdi);
    }

    const { id, tidligsteFom, senesteTom } = props;
    const classNameMaskedInput = cls('skjemaelement__input  datovelger__input', {
        'skjemaelement__input--harFeil': true,
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
                        name={props.name}
                        id={id}
                        type="tel"
                        onChange={props.onChange}
                        mask="11.11.1111"
                        autoComplete="off"
                        placeholder="dd.mm.åååå"
                        ref={props.ref}
                        onKeyUp={() => setErApen(false)}
                        className={classNameMaskedInput}
                        {...input.current.value}
                    />
                    <button
                        type="button"
                        className="js-toggle datovelger__toggleDayPicker"
                        ref={toggle}
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
                        input={null}
                        onDayClick={(event: MouseEvent, jsDato: string) => {
                            /*
                                                        const verdi = parseVerdi(jsDato);
                                                        props.change(meta.form, input.current.name, verdi);
                                                        props.touch(meta.form, input.current.name);
                            */
                            lukk();
                        }}
                        onKeyUp={(e: KeyboardEvent) => onKeyUp(e)}
                        lukk={() => lukk()}
                    />
                </Vis>
                <SkjemaFeilmelding error={''} touched={true} />
            </div>
        </div>
    );
};

export const genererValidate = (props: DatoFieldProps) => {
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

const DatoVelger = React.forwardRef((props: DatoFieldProps, ref) => {
    return (
        <DatoField ref={ref} {...props} />
    );
});
DatoVelger.displayName = 'DatoVelger';

export default DatoVelger;
