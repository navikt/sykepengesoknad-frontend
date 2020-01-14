import React, { useEffect, useState } from 'react';
import Vis from './vis';

interface AnimateOnMountProps {
    mounted: boolean;
    enter: string;
    leave: string;
    start: string;
    children: React.ReactElement;
}

const AnimateOnMount = ({ mounted, enter, leave, start, children }: AnimateOnMountProps) => {
    const [ styles, setStyles ] = useState<string>(null);
    const [ show, setShow ] = useState<boolean>(mounted);

    useEffect(() => {
        if (mounted) {
            setShow(true);
            setStyles(enter);
        } else {
            setStyles(leave);
        }
        // eslint-disable-next-line
    }, [ mounted ]);

    const onTransitionEnd = () => {
        if (styles === leave) {
            setShow(false);
        }
    };

    return (
        <div className={`${start} ${styles}`} onTransitionEnd={onTransitionEnd}>
            <Vis hvis={show} >
                {children}
            </Vis>
        </div>
    )
};

export default AnimateOnMount;
