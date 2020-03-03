import React from 'react';

const onKeyDown = (e: any) => {
    const OPP = 40;
    const NED = 38;
    if ([ OPP, NED ].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
};

interface NavBarProps {
    onNextClick: Function;
    onPreviousClick: Function;
    showPreviousButton: boolean;
    showNextButton: boolean;
}

const DayPickerNavBar = ({ onNextClick, onPreviousClick, showPreviousButton, showNextButton }: NavBarProps) => {
    const className = 'DayPicker-NavButton';

    return (
        <div role="toolbar">
            <button
                tabIndex={0}
                className={`${className} DayPicker-NavButton--prev`}
                disabled={!showPreviousButton}
                type="button"
                onKeyDown={onKeyDown}
                onClick={(e) => {
                    e.preventDefault();
                    onPreviousClick();
                }}
            >
                Forrige måned
            </button>
            <button
                tabIndex={0}
                className={`${className} DayPicker-NavButton--next`}
                disabled={!showNextButton}
                type="button"
                onKeyDown={onKeyDown}
                onClick={(e) => {
                    e.preventDefault();
                    onNextClick();
                }}
            >
                Neste måned
            </button>
        </div>
    );
};

export default DayPickerNavBar;

