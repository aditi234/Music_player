import React, {useState} from 'react';
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import './../css/login.css'

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { push } = useHistory();

    const login =()=>{
        fetch("api/v1/users/login",{
            method: "post",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify({
                email,
                password
            })
        })
        .then(res=> res.json())
        .then(data =>{
            if(data.error){
                console.log(data.error);
                alert("Please login again")
            }else{
                localStorage.setItem('jwt', data.token);
                push("/home");
            }
        })
    }

    return(
        <>
        <div className='nav'>
            <h1>Music Player</h1>
        </div>
        <div className="login">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-button" onClick = {()=> login()}>
                    login
                </button>
                <div>
                    <h2>Create Account? <Link to='/' style={{color: 'rgb(57, 117, 196)'}}>sign up</Link></h2>
                </div>
        </div>
        </>
    )
}