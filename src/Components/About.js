import React from 'react';

const About = (props) => {
  const {mode}=props
  return (
    <div style={mode==='dark'? {backgroundColor:"rgb(19, 3, 29)",height:"100vh",color:"white"}:{backgroundColor:"white",height:"100vh",color:"black"}}>
      about
    </div>
  );
}

export default About;
