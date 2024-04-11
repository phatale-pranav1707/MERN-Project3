// Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import NoteContext from '../Contexts/NoteContext';



const Navbar = (props) => {
  const { updateuser } = useContext(NoteContext)
  const { showalert ,mode} = props
  const navigate = useNavigate()
  const handlelogout = () => {
    localStorage.removeItem("token")
    showalert("You are logged out from your account", "success")

    navigate("/login")
  }

  const handleuser = async () => {
    const response = await fetch("http://localhost:5000/api/auth/getuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },


    });
    const json = await response.json()

    const dateString = json.date
    const date = new Date(dateString);
    const localDate = date.toLocaleString();

    updateuser(json.name, json.email, localDate)

  }
  return (
    <div>
      <nav className={`navbar navbar-expand-lg ${mode==='dark'?"navbar-dark":"navbar-light"} ${mode==='dark'?"bg-dark":"bg-light"} `}>
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>

          {!localStorage.getItem("token") ? (
            <div className="d-flex" role="search">
              <Link to="/login"> <button type="button" class="btn btn-primary mx-2" >Login</button></Link>
              <Link to="/signup"> <button type="button" class="btn btn-primary" >Signup</button></Link>
            </div>
          ) : (
            <div className="d-flex align-centert " role="search">
              <Link to="/setting" ><i style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className="fa-solid fa-gear"></i>
                <p className="h6" onClick={handleuser}>Settings</p></Link >

              <Link to="/user" className='ml-4'><i style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className="fa-solid fa-user"></i><p className="h6" onClick={handleuser}>Your acc.</p></Link >
              <button type="button" className="btn btn-primary ml-3" onClick={handlelogout}>Logout</button>

            </div>
          )}


        </div>
      </nav>
    </div>
  );
};

export default Navbar;
