import React, { ReactNode } from 'react';
import Modal from 'nav-frontend-modal';
import cls from 'classnames';

interface LightboxProps {
    children: ReactNode,
    onClose: () => void,
    bredde?: string
}

const Lightbox = ({ bredde }: LightboxProps) => {
    bredde ? bredde = 'm' : bredde = '';
    const appEl = document.getElementById('maincontent');
    const classNames = cls({
        'modal--medium': bredde,
    });
    Modal.setAppElement(appEl);
    return (
        <h1 className={classNames}>Hei Modal!</h1>
    )
};

export default Lightbox;

