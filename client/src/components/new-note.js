import {Fragment, useState} from "react"
import './style.css';

const NewNote = () => {
    const [note, setNote] = useState({
        title: "",
        category: "General",
        body: ""
    });

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {note};
            const response = await fetch("http://localhost:5000/notes",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                }
            );
            window.location = "/";
            const jsonData = await response.json()
            console.log(jsonData)
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
            <Fragment>
                <form onSubmit={onSubmitForm}>
                    <input type="text" className="form-control" placeholder="Title" onChange={e => setNote({ ...note, title: e.target.value})}/>                         
                    <div className="form-group flex-box mt-3">
                        <label className="note-text mr-3">Category: </label>
                        <select className="custom-select" onChange={e => setNote({ ...note, category: e.target.value })}>
                            <option value="General">General</option>
                            <option value="School">School</option>
                            <option value="Work">Work</option>
                            <option value="Events">Events</option>
                        </select>
                    </div>
                    <textarea className="form-control note-text-body" placeholder="Your note...." onChange={e => setNote({ ...note, body: e.target.value})}></textarea>
                    <div className="app-button">
                        <button className="btn btn-dark btn-sm">Save</button>
                    </div>
                </form>
            </Fragment>
    )
};

export default NewNote;