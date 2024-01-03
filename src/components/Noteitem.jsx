import React, {useContext} from "react";
import noteContext from "../context/notes/NoteContext";
import '../Home.css';

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const { note, updateNote } = props;
  return (
    <div className="d-flex flex-wrap md-3" style={{width: "20rem"}}>
      <div className="card my-3">
        <div className="card-body" style={{width: "20rem"}}>
          <div className="d-flex justify-content-between">
            <h5 className="card-title" style={{fontWeight: "bold"}}>{note.title}</h5>
            <div className="icon">
              <i className="fa-solid fa-pen-to-square mx-2" style={{color: "#9C27B0"}} onClick={() => {updateNote(note)}}></i>
              <i className="fa-solid fa-trash mx-2" style={{color: "#9C27B0"}} onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully", "success")}}></i>
            </div>
          </div>
          <p className="card-text" style={{fontSize: "0.95rem", color: "#6b6b6b"}}>#{note.tag}</p>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
