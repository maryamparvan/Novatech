import React from "react";
import Navdar from "../Navdar/Navdar";
import Header from '../Header/Header.js'

const Layout = (({children}) =>{
    return(
        <div>
            <Header />
            {children}
        </div>
    )
})
export default Layout;