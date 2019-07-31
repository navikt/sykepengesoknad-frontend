import { ReactNode } from 'react';

interface VisProps {
    hvis: boolean,
    children: ReactNode,
    render: Function
}

export const Vis = ({ hvis, children, render }: VisProps) => {
    return hvis && render
        ? render()
        : hvis && children
            ? children
            : null;
};

export const formaterOrgnr = (orgnr: string) => {
    return orgnr.replace(/(...)(...)(...)/g, '$1 $2 $3');
};

