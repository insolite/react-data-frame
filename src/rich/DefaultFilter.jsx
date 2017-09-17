import React from 'react';


const DefaultFilter = props => {
    const { value, onChange, style } = props;
    return (
        <input type="text"
               value={value || ''}
               onChange={e => onChange(e.target.value || undefined)}
               style={{width: '100%', ...style}}
        />
    );
};

export default DefaultFilter;
