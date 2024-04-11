import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import NoteContext from '../Contexts/NoteContext';
import { useContext } from 'react';



const Login = (props) => {

    const {updateuser}=useContext(NoteContext)
    const {showalert}=props;

   const navigate=useNavigate()
    const [creds, setcreds] = useState({ email: "", password: "" });

    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem("token")
                
            },

            body: JSON.stringify({ email:creds.email,password:creds.password})

        });
        const json=await response.json();

        if(json.success){
            localStorage.setItem("token",json.authtoken)
            navigate("/")
            showalert("You are logged in to your account","success")
            setcreds({ email: "", password: "" })
            updateuser(json.name,json.email)

        }else{
            console.log("oranav")
            navigate("/login")
            showalert("enter correct email and password","danger")
            setcreds({ email: "", password: "" })


        }


    }

    const onChange = (e) => {
        setcreds({ ...creds, [e.target.name]: e.target.value })
    }

    return (
        <div className='container mt-5'>
            <h3>Enter email and password to login into iNotebook</h3>
            <form onSubmit={handlesubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={creds.email} name="email" onChange={onChange} minLength={5} required />

                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={creds.password} name="password" onChange={onChange} minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    );
}

export default Login;
