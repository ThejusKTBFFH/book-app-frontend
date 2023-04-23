import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";

export const Auth = () =>{

    

    

    return(
        <div>
            <Login/>
            <Register/>
        </div>
    )
}


const Login =()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            const res = await axios.post("https://book-app-backend-7hg6.onrender.com/auth/login",{
                username,
                password
            });
            setCookies("access_token",res.data.token);
            window.localStorage.setItem("userID",res.data.userID);
            navigate("/");
        }catch(err){
            setError(err.response.data.message);
        }
    }

    return(
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="username">Password</label>
                     <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                     <button type="submit">Login</button>
                </div>
               

            </form>
        </div>
    )
}

const Register =()=>{

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            const res = await axios.post("https://book-app-backend-7hg6.onrender.com/auth/register",{
                username,
                password
            });
            alert("Registration Completed! Now Login");
            
           
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                <input type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>

                </div>
                <div className="form-group">
                    <label htmlFor="password">password</label>
                <input type="text" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

                </div>

                <button type="submit">Register</button>

            </form>
        </div>
                
    )
}