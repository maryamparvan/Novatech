import React from "react";
import Navdar from "../Navdar/Navdar";
import { SiTechcrunch } from "react-icons/si";
import './Header.css'


const Header = (() =>{
    return(
        <div className="HeaderClass">
            <div className="HeaderClasssvg">
                <SiTechcrunch />
            </div>
            <Navdar />
        </div>
    )
})

export default Header;