import React, { useState, useContext } from "react";
import './Login.css'
import Button from '../../Button/Button'
import { useNavigate } from "react-router-dom";
import LanguageContext from "../../LanguageContext/LanguageContext";

type User = {
    name: string;
    email: string;
    password: string;
};

const Login = (() =>{
    const navigate = useNavigate();
    const [sign,setsign] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [copassword, setcoPassword] = useState("");
    const [error, setError] = useState("");
    const { translations } = useContext(LanguageContext);
    const user = {
        name,
        email,
        password
    }
    const save = (() =>{
        if(!name || !email || !password ){
            setError("Please fill in all fields");
        }
        else if(copassword !== password){
            setError("Passwords do not match");
        }
        else{
            const savedUsers = localStorage.getItem("users");
            const users: User[] = savedUsers ? JSON.parse(savedUsers) : [];
            users.push(user)
            localStorage.setItem("users", JSON.stringify(users));
            setError("you sign in succesfully");
            setName("")
            setEmail("")
            setPassword("")
            setcoPassword("")
        }
    })
    const log = () => {
        const savedUsers = localStorage.getItem("users");
        const users: User[] = savedUsers ? JSON.parse(savedUsers) : [];
        const foundUser = users.find(
            (item:User) => item.name === name && item.password === password
        );
        if (foundUser) {
            localStorage.setItem(
                "currentUser",
                JSON.stringify(foundUser)
            );
            setError("You logged in successfully");
            localStorage.setItem("currentUser", JSON.stringify(user));
            window.dispatchEvent(new Event("userChanged"));
            navigate("/Cart");
        } else {
            setError("Name or password is incorrect");
        }
    };
    return(
        <div className="LoginPage">
            <div className="LoginClass">
                <div className="divHeader">
                    <Button text={translations.login} className={`ButtonHeader ${sign ? "active" : ""}`} fun ={() => setsign(true)} />
                    <Button text={translations.signin} className={`ButtonHeader ${sign ? "" : "active"}`} fun ={() => setsign(false)} />
                </div>
                <div className="divInput">
                {sign ? (
                    <div className="signClass">
                        <label>{translations.name}:</label>
                        <input type="text" placeholder="name" value={name}  onChange={(e) => setName(e.target.value)}/>
                        <label>{translations.password}:</label>
                        <input type="password" placeholder="password" value={password}  onChange={(e) => setPassword(e.target.value)}/>
                        <Button text={translations.login} className="ButtonSubmit" fun={log}/> 
                        {error && <p className="errorText">{error}</p> } 
                    </div>
                ):(
                        <div className="signClass">
                            <label>{translations.name}:</label>
                            <input type="text" placeholder="name:" value={name} onChange ={(e) => setName(e.target.value)}/>
                            <label>{translations.email}:</label>
                            <input type="email" placeholder="email:" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <label>{translations.password}:</label>
                            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <label>{translations.ConfirmPassword}:</label>
                            <input type="password" placeholder="confirm password" value={copassword} onChange={(e) => setcoPassword(e.target.value)}/>
                            <Button text={translations.signin} className="ButtonSubmit" fun={save}/>
                            {error && <p className="errorText">{error}</p>} 
                        </div>
                    )
                }
                </div>
            </div>
        </div>
    )
})

export default Login;