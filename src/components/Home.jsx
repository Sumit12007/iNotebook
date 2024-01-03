import React from 'react'
import Notes from './Notes';
import '../Home.css';
import { Link } from "react-router-dom";

const home = (props) => {
  const {showAlert} = props;
  return (
    <>
      <div className=" container homePage-wrapper">
        <div className="page-info">
          <h1 className='title'>iNotebook</h1>
          <h3 className='tag'>Your notebook on cloud - safe and secure</h3>
          <p className='description'>An online web platform where you can upload, edit and delete your note/information privately and securely without any disturbance.</p>
          <button type='submit' className='createNote'><Link to="/create" className='btn-create'>Create New Note</Link></button>
        </div>

        <div className="image-wrapper">
          <img src="src\assets\inotebook.svg" alt="A man standing watching a screen with two message box" width={'490px'} height={'400px'}/>
        </div>
      </div>
      <div className="note-wrapper">
        <Notes showAlert={showAlert} />
      </div>
    </>
  )
}

export default home
