import { Fragment } from 'react';
import './style.css';

import EditNote from "./edit-note";

const Notes = ({item}) => { 

    const deleteNote = async () => {
        try {
            const deleteNote = await fetch(`http://localhost:5000/notes/${item.n_id}`,{
                method: "DELETE"
            });
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <div className="note-header">
                <h2 className="note-title">{item.title}</h2>
                <div>
                    <p className="note-date">{item.created.slice(0,10)}</p>
                    {item.edited && <p className="note-date">Edited: {item.edited.slice(0,10)}</p>}
                </div>
            </div>
            <h3 className="note-text">{item.category}</h3>
            <p className="note-text note-text-body ">{item.body}</p>
            <div className="app-button card-footer">
                <EditNote note={item} />
                <button onClick={deleteNote} className="btn btn-dark btn-sm">Delete</button>
            </div>
        </Fragment>
    )
};

export default Notes;