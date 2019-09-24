import React from 'react';
import CheckboxComp from './checkbox-comp';
import CheckboxSelvstendig from '../skjema/checkbox-selvstendig';

export default (props: any) => {
    return <CheckboxComp {...props} renderComponent={CheckboxSelvstendig} />;
};
