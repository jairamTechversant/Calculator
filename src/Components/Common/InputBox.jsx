import React from "react";


export const InputBox = (props) => {

    const { value, onChange, className, id } = props;

    return <input className={className} id={id} value={value} onChange={onChange} />
};