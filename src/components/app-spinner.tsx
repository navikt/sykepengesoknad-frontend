import React from 'react';
import cls from 'classnames';

interface AppSpinnerProps {
    className?: string;
}

const AppSpinner = ({ className = 'app-spinner--side blokk--xl' }: AppSpinnerProps) => {
    const classNames = cls('app-spinner', className);
    return <div className={classNames} aria-label="Vent litt mens siden laster" />;
};

export default AppSpinner;
