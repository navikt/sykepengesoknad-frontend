import React from 'react';
import { useAppStore } from './data/stores/app-store';

interface DecoratorProps {
    part: string;
}

const Decorator = ({ part }: DecoratorProps) => {
    const { decorator } = useAppStore();
    if (decorator === undefined) {
        return null;
    }
    const html: HTMLElement = document.createElement(decorator);
    return <>{html.querySelector('#' + part).innerHTML}</>;
};

export default Decorator;
