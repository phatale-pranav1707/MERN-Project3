import React, { useState,useContext } from 'react';
import { useNavigate } from "react-router-dom";
import NoteContext from '../Contexts/NoteContext';


const Signup = (props) => {
    const {updateuser}=useContext(NoteContext)

    const {showalert}=props;

    const navigate=useNavigate()
    const [creds, setcreds] = useState({ name:"",email: "", password: "",cpassword:"" });

    

    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                
                
            },

            body: JSON.stringify({ name:creds.name,email:creds.email,password:creds.password})

        });
        const json=await response.json();

        if(json.success){
            localStorage.setItem("token",json.authtoken)
            navigate("/")
            showalert("You have created your iNotebook account successfully","success")

            updateuser(json.name,json.email,json.date)


        }else{
            showalert("This account is alredy exist-Try out with different email","danger")

        }


    }

    const onChange = (e) => {
        setcreds({ ...creds, [e.target.name]: e.target.value })
    }


  return (
    <div>
        <div className='container mt-5'>
        <h3>Create your new iNotebook account</h3>

            <form onSubmit={handlesubmit}>
                <div className="form-group">
                    <label htmlFor="namere">Name</label>
                    <input type="text" className="form-control" id="namere"  placeholder="Enter name" value={creds.name} name="name" onChange={onChange} minLength={5} required />

                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={creds.email} name="email" onChange={onChange} minLength={5} required />

                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={creds.password} name="password" onChange={onChange} minLength={5} required />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Confirm Password" value={creds.cpassword} name="cpassword" onChange={onChange} minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
      
    </div>
  );
}

export default Signup;
