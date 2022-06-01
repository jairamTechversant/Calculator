import React from "react";



export const Button = (props) => {

    const { onClick, buttonText, className, style } = props;

    return <button onClick={onClick} className={className} style={{ ...style }} >{buttonText}</button>
};