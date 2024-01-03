import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import { Link, useNavigate } from "react-router-dom";
import '../Home.css';

const AddNotes = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    let history = useNavigate();
    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        if(localStorage.getItem('token')){
          props.showAlert("Note added Successfully.", "success")
        }
        else{
          props.showAlert("Please first regester to add note.", "danger")
          history("/login")
        }
    }

    const onChange = (e) =>{
      // Using spread operator (...note) we are giving a command that whatever the field is if the user kept it unwritten than remain as it is but if anything new adds on then overwrite it. 
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <>
      <div className="container my-3">
      <button type='submit' className='btn btn-success' style={{backgroundColor: "transparent", border: "none", marginBottom: "1rem", marginTop: "6rem"}}><Link to="/" style={{textDecoration: "none", color: "#9C27B0", fontSize: "1.2rem"}} ><i className="fa-solid fa-arrow-left"></i> Home</Link></button>
        <h1>Create new Note.</h1>
        <p>Add a new note with your info/ notes</p>
          <form>
            <div className="mb-3">
              <input type="text" autoComplete='true' placeholder='Title*' className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
              <input type="text" autoComplete='true' placeholder='Description*' className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
              <input type="text" autoComplete='true' placeholder='Tag*' className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleClick} style={{backgroundColor: "#8a0c8ae8", border: "none", color: "#f4f4f4"}}>Add Note</button>
          </form>
      </div>
    </>
  )
}

export default AddNotes
