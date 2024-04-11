import React, { useState, useContext, useEffect, useRef } from 'react';
import AddNote from './AddNote';
import NoteContext from '../Contexts/NoteContext';
import NoteItem from './NoteItem';
import { useNavigate } from "react-router-dom";




const Notes = (props) => {
  const {showalert,mode}=props;

  const ref = useRef();
  const refClose = useRef()

  const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }

  const updatenote = (currentnote) => {
    ref.current.click();
    setnote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag
    })
  }

  const handleclick = (e) => {
    e.preventDefault();
    editnote(note.id, note.etitle, note.edescription, note.etag)
    showalert("Your note is edited successfully","success")

    refClose.current.click()
  }

  const navigate = useNavigate()

  const a = useContext(NoteContext)
  const { notes, getnotes, editnote } = a;
  useEffect(() => {
    if (localStorage.getItem("token")) {
        getnotes()
        showalert("These are your notes","success")
      
    } else {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div>
      <AddNote showalert={showalert} mode={mode}/>

      <button style={{ display: "none" }} ref={ref} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-etitle" id="exampleModalLabel">Edit Your Note here...</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className='container mt-4'>
                <div className="form-group ">
                  <label htmlFor="exampleInputEmail1">Title</label>
                  <input type="taxt" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter etitle" value={note.etitle} name="etitle" onChange={onChange} minLength={5} required />

                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Description</label>
                  <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter description" value={note.edescription} name="edescription" onChange={onChange} minLength={5} required />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Tag</label>
                  <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Tag" value={note.etag} name="etag" onChange={onChange} minLength={5} required />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleclick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-3">
        {notes.length===0? <h3 style={mode==='dark'? {color:"white"}:{color:"black"}}>No notes to display here</h3> :<div className="row">
          {notes.map((ele) => {
            return <NoteItem key={ele._id} showalert={showalert} updatenote={updatenote} note={ele} />
          })}
        </div>}
        
      </div>
    </div>
  );
}

export default Notes;
