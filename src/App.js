import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Contexts/NoteState';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';
import Alert from './Components/Alert';
import User from './Components/User';
import Settings from './Components/Settings';




function App() {
  const [alert, setalert] = useState(null)
  // const [state, setstate] = useState(initialState);
  function showalert(message, type) {
    setalert({
      msg: message,
      type: type

    })

    setTimeout(() => {
      setalert(null)
    }, 4000)

  }

  const [mode, setmode] = useState('light');
  const [p, setp] = useState('black');

    const togglemode=()=>{
        if(mode==='light'){
            setmode('dark')
            showalert("Dark mode activated in your application","success")
            console.log("pranav")
            setp('shreyas')
        }else{
            setmode("light")
            showalert("Light mode activated in your application","success")
            console.log("pratiksha")
            setp('pranav')


        }
    }

    
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar showalert={showalert} mode={mode} />
        <Alert alert={alert} mode={mode} />
        <Routes>
          <Route exact path="/" element={<Home showalert={showalert} mode={mode} />}></Route>
          <Route exact path="/about" element={<About showalert={showalert} mode={mode} />}></Route>
          <Route exact path="/login" element={<Login showalert={showalert} mode={mode} />}></Route>
          <Route exact path="/signup" element={<Signup showalert={showalert} mode={mode} />}></Route>
          <Route exact path="/user" element={<User showalert={showalert} mode={mode}  />}></Route>
          <Route exact path="/setting" element={<Settings p={p} setp={setp} showalert={showalert} togglemode={togglemode} mode={mode}/>}></Route>



        </Routes>
      </BrowserRouter>
    </NoteState>

  );
}

export default App;
