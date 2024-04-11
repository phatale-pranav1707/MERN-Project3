import React from 'react';
import Notes from './Notes';

const Home = (props) => {
  const {showalert,mode}=props
  return (
    <div style={mode==='dark'? {backgroundColor:"rgb(19, 3, 29)", height:"100vh"}:{backgroundColor:"white",height:"100vh"}}>
      <Notes showalert={showalert} mode={mode} />
    </div>
  );
}

export default Home;
