import React from 'react';

export default function Alert(props) {
    const {mode}=props
    let a;
    if(props.alert){
     a=props.alert.type
    if(props.alert.type==="danger"){
          a="Error"
    }
}
    return (
        <div style={mode==='dark'? {backgroundColor:"rgb(19, 3, 29)",height:"50px"}:{backgroundColor:"white",height:"50px"}}>
       {props.alert && <div>
            <div className={`alert alert-${props.alert.type} d-flex align-items-center`} role="alert">
                {a} : {props.alert.msg}
            </div>

        </div>}
        </div>
    ); 
}
