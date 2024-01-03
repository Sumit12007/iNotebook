import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import '../Home.css';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    let history  = useNavigate();
    const context = useContext(noteContext);
    const {notes, getNotes, editNote} = context;

    useEffect(() => {
      if(localStorage.getItem('token')){
        getNotes();
      }
      else{
        history("/login");
      }
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})

    const handleUpdate = () =>{
      refClose.current.click();
      editNote(note.id, note.etitle, note.edescription, note.etag)
      props.showAlert("Updated Successfully", "success")
    }
    
    const updateNote = (currentNote) =>{
      ref.current.click();
      setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }

    const onChange = (e) =>{
      // Using spread operator (...note) we are giving a command that whatever the field is if the user kept it unwritten than remain as it is but if anything new adds on then overwrite it. 
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <>
        <button type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" hidden>Model Button</button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header flex-column align-items-start">
                <h1 className="modal-title fs-2" id="exampleModalLabel">Edit Note</h1>
                <p>Edit your note. Edit the file that you want to edit in note.</p>
              </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title:</label>
                  <input type="text" autoComplete='true' className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description:</label>
                  <input type="text" autoComplete='true' className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag:</label>
                  <input type="text" autoComplete='true' className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required/>
                </div>
              </form>

            </div>
              <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-danger" style={{backgroundColor: "transparent", border: "1px solid #9C27B0", color: "#9C27B0"}} data-bs-dismiss="modal">Cancle</button>
                <button type="button" onClick={handleUpdate} className="btn btn-primary" style={{backgroundColor: "#9C27B0", border: "none"}}>Update Note</button>
              </div>
            </div>
          </div>
        </div>

      <div className=" noteCard-wrapper">
              <h2 style={{fontWeight: "bold", textWrap: "nowrap"}}>Your Notes:</h2>
              {notes.length === 0 && 'No notes to display.'}
          <div className="row">
              {notes && notes.map((note) =>{
                return (<div className="col-md-3" style={{width: "70%"}} key={note._id}>
                              <Noteitem updateNote={updateNote} showAlert={props.showAlert} note={note}/>
                      </div>)
              })}
          </div>
      </div>
    </>
  )
}

export default Notes
