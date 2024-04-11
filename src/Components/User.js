import React, { useContext } from 'react';
import NoteContext from '../Contexts/NoteContext';


const User = (props) => {
    const { user, notes } = useContext(NoteContext)
    const {mode}=props;

    return (
        <div style={mode==='dark'? {backgroundColor:"rgb(19, 3, 29)",height:"100vh",color:"white"}:{backgroundColor:"white",height:"100vh",color:"black"}}>

            <div className="container mt-1">
                <div className="row">
                <h1 className="text-primary">This Is Your Account And Personal Information</h1>
                    
                    <div className="col-md-8">
                    <hr class="my-4 border-top border-3 border-primary"/>
                        <h1 className="text-primary">Account Information :
                        </h1><br />
                        <span>Name : <span className="text-primary">{user.name}</span>
                        </span><br /><br />
                        <span>Email : <span className="text-primary">{user.email}</span>
                        </span><br /><br />
                        <span>Country : <span className="text-primary">India</span></span><br /><br />
                        <span>Total number notes in Your iNotebook : <span className="text-primary">{notes.length === 0 ? " You haven't created notes yet" : " " + notes.length}</span></span><br /><br />
                        <span>Date joined : <span className="text-primary">{user.date}</span></span>
                    </div>
                </div>
                <hr class="my-4 border-top border-3 border-primary"/>

                <div className="row mt-4">
                    <div className="col">
                        <h2>Personal Information : </h2>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam varius malesuada venenatis. Integer
                            vel cursus quam. Duis eu venenatis justo, eu semper enim. Nam id dui ac odio aliquet auctor.
                            Quisque nec eleifend arcu. Praesent quis dui semper, blandit tellus eget, lacinia arcu.</span>
                    </div>
                </div>
            </div>




        </div>
    );
}

export default User;
