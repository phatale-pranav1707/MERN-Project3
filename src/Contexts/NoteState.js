import React, { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {


    const initialnotes = []
    const [notes, setnotes] = useState(initialnotes);

    const getnotes = async () => {
        const response = await fetch("http://localhost:5000/api/notes/fetchallnotes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },

        });

        const json = await response.json();
        console.log(json)

        setnotes(json)
    }

    const addnote = async (title, description, tag) => {
        const response = await fetch("http://localhost:5000/api/notes/addnote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },

            body: JSON.stringify({ title, description, tag })

        });

        const note = await response.json()

        setnotes(notes.concat(note))

    }

    const host = "http://localhost:5000"
    const deletenote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },


        });
        console.log(response)

        const newnotes = notes.filter((note) => { return note._id !== id })

        setnotes(newnotes)

    }

    const editnote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })

        });
        const a=response.json();
        console.log(a*0)

        const newnotes = JSON.parse(JSON.stringify(notes))

        for (let index = 0; index < newnotes.length; index++) {
            if (newnotes[index]._id === id) {
                newnotes[index].title = title;
                newnotes[index].description = description;
                newnotes[index].tag = tag;
                break;

            }
        }

        setnotes(newnotes)


    }

    const [user, setuser] = useState({ name: "", email: "",date:"" });

    const updateuser = async (name, email,date) => {
        setuser({
            name: name,
            email: email,
            date:date

        })

    }


    



    return (
        <div>
            <NoteContext.Provider value={{ notes, getnotes, addnote, deletenote, editnote, user, updateuser}}>
                {props.children}
            </NoteContext.Provider>

        </div>
    );
}

export default NoteState;
