import React from "react";

type ButtonProps = {
    className: string;
    text: string;
    fun: () => void;
};

const Button = (({className,text,fun}:ButtonProps) =>{
    return(
        <button className={className} onClick={fun}>
            {text}
        </button>
    )
})

export default Button;