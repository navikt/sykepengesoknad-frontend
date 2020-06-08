import React from 'react';

import { MONTHS } from './daypickerLocale';

interface CaptionProps {
    date: Date;
}

const DayPickerCaption = ({ date }: CaptionProps) => {
    return (
        <div className='DayPicker-Caption' role='heading' aria-live='assertive' aria-atomic='true'>
            {`${MONTHS[date.getMonth()]} ${date.getFullYear()}`}
        </div>
    );
};

export default DayPickerCaption;
