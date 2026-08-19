import React from "react";

const Button = (({className,text,fun}) =>{
    return(
        <button className={className} onClick={fun}>
            {text}
        </button>
    )
})

export default Button;