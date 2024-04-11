import React,{useContext} from 'react';
import NoteContext from '../Contexts/NoteContext';


const NoteItem = (props) => {
    const {note,updatenote,showalert}=props

    const a=useContext(NoteContext)
    const {deletenote}=a;

    const handleclick=(id)=>{
        deletenote(id)
        showalert("Your note is deleted successfully","success")

    }

    return (
        <div className='my-4 col-md-3 '>
            <div className="card " >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    
                    <p className="card-text">{note.description}</p>
                    <h6 className="card-subtitle mb-2 text-muted">{note.tag===""?"No tag":note.tag}</h6>
                    <i className="fa-solid fa-trash mx-3" onClick={()=>handleclick(note._id)}></i>
                    <i className="fa-solid fa-pen-to-square ml-2" onClick={()=>{updatenote(note)}} ></i>
                    <i className="fa-solid fa-gear mx-1"></i>
                    
                </div>
            </div>

        </div>
    );
}

export default NoteItem;
