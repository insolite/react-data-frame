import React from 'react';


const DefaultFilter = props => {
    const { value, onChange } = props;
    return (
        <input type="text"
               value={value || ''}
               onChange={e => onChange(e.target.value || undefined)}
               style={{width: '100%'}}
        />
    );
};

export default DefaultFilter;
