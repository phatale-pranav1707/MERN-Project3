import React from 'react';

const Settings = (props) => {
  const {togglemode,mode}=props
  return (
    <div style={mode==='dark'? {backgroundColor:"rgb(19, 3, 29)",height:"100vh",color:"white"}:{backgroundColor:"white",height:"100vh",color:"black"}} >
      <div className="container " style={mode==='dark'? {backgroundColor:"rgb(19, 3, 29)",height:"100vh",color:"white"}:{backgroundColor:"white",height:"100vh",color:"black"}}>
        <h2 className="container ">Settings</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body" style={mode==='dark'? {backgroundColor:"black",color:"white"}:{backgroundColor:"white",color:"black"}}>
                <p className="card-text" style={mode==='dark'? {color:"white"}:{backgroundColor:"white",color:"black"}}>Manage your account settings here.</p>
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="customSwitch1" onClick={togglemode}/>
                    <label class="custom-control-label" for="customSwitch1">Change Mode</label>
                </div>

                <h1>{props.p}</h1>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
