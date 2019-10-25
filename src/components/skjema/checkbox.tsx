import React from 'react';
import { Checkbox } from 'nav-frontend-skjema';

interface BoxProps {
    input: HTMLInputElement;
    label: string;
    id: string;
    children: React.ReactNode;
}

const Box = ({ input, label, id, children }: BoxProps) => {
    return (
        <div className="checkboksContainer" id={`cb-${id}`}>
            <Checkbox
                id={id}
                label={label}
                checked={input.value != null}
            />
            {
                input.value && children && <div className="ekstrasporsmal">{children}</div>
            }
        </div>
    );
};

export default Box;
