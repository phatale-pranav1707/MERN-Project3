import React, { useContext, useState } from 'react';
import NoteContext from '../Contexts/NoteContext';


const AddNote = (props) => { 

    const { showalert,mode } = props;

    const a = useContext(NoteContext)
    const { addnote } = a;

    const [note, setnote] = useState({ title: "", description: "", tag: "" });

    const handleclick = (e) => {
        e.preventDefault()
        addnote(note.title, note.description, note.tag)
        setnote({ title: "", description: "", tag: "" })
        showalert("Your note is added", "success")

    }

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className='container' style={mode==='dark'? {backgroundColor:"rgb(19, 3, 29)",color:"white"}:{backgroundColor:"white",color:"black"}}>
            <h3 className='mt-1'>Type your note here....</h3>

            <form className='mt-4'>
                <div className="form-group ">
                    <label htmlFor="exampleInputEmail1">Title</label>
                    <input type="taxt" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Title" value={note.title} name="title" onChange={onChange} minLength={5} required />

                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Description</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter description" value={note.description} name="description" onChange={onChange} minLength={5} required />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Tag</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter tag" value={note.tag} name="tag" onChange={onChange} minLength={5} required />
                </div>

                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary my-2" onClick={handleclick}>Add Note</button>
            </form>

        </div>
    );
}

export default AddNote;
