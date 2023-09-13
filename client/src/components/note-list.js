import {Fragment, useState, useEffect} from "react"
import './style.css';

import NewNote from './new-note';
import Notes from "./notes";

const NoteList = ({filter}) => {

    const [notes, setNotes] = useState([])

    const getNotes = async() => {
        try {
            const response = await fetch("http://localhost:5000/notes");
            const jsonData = await response.json();
            if (filter) {
                setNotes(jsonData.filter(note => note.category == filter))
            } else {
                setNotes(jsonData)
            }
        } catch (err) {
            console.error(err.message);
        }
    };
    
      useEffect(() => {
        getNotes();
      }, [filter]);
    
      return (
        <div className='notes-container'>
            <div className='note'>
                <NewNote />
                </div>
                {notes.map(note => (
                    <div className='note' key={note.n_id}>
                        <Notes item={note}/>
                    </div>
                ))}
        </div>

      );


};

export default NoteList
