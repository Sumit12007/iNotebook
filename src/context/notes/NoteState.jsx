import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) =>{
  const host = "http://localhost:3000"
  // const your_auth_token = import.meta.env.VITE_AUTH_TOKEN;
      const [notes, setNotes] = useState([])

      // Get All Notes
      const getNotes = async () =>{
        // API Call
        try{
        const response = await fetch("http://localhost:3000/api/notes/fetchallnotes", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          credentials: 'include',
        });
        const json = await response.json();
        setNotes(json);
        }catch (error) {
          console.error('Get all note error:', error.message);
        }
      }


      // Add a Note
      const addNote = async (title, description, tag) =>{
        // API Call
        try{
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
        const note = await response.json();
        setNotes(notes.concat(note));

        }catch (error) {
          console.error('Add note error:', error.message);
        }
      }


      // Delete a Note
      const deleteNote = async (id) =>{
        // API Call
        try {
          const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            }
          });
          if (!response.ok) {
            throw new Error('Failed to delete note');
          }
          // const json = await response.json();
          const newNotes = notes.filter((note) => note._id !== id)
          setNotes(newNotes)

        }catch (error) {
          console.error('Delete note error:', error.message);
        }
      }


      // Edit a Note
      const editNote = async (id, title, description, tag) =>{
        // API Call
        try{
          const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
          });
          // const json =  await response.json();
  
          // Creating a deep copy of the "notes" object.This technique ensurs that changes to one object do not affect the other. 
          let newNotes = JSON.parse(JSON.stringify(notes));
          // Logic to edit in client
          for(let index = 0; index < newNotes.length; index++){
            const element = newNotes[index];
            if(element._id === id){
              newNotes[index].title = title;
              newNotes[index].description = description;
              newNotes[index].tag = tag;
              break;
            }
          }
          setNotes(newNotes);
        }catch (error) {
          console.error('Edit note error:', error.message);
        }
      }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;