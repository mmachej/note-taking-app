import { Fragment, useState } from "react";

const EditNote = ({note}) => {

    const [noteContent, setNoteContent] = useState(note)

    const onEdit = async e => {
        e.preventDefault();
        try {
            const body = {noteContent};
            console.log(body)
            const response = await fetch(`http://localhost:5000/notes/${note.n_id}`,
                {
                    method: "PUT",
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
            <button type="button" class="btn btn-dark btn-sm app-button" data-bs-toggle="modal" data-bs-target={`#id${note.n_id}`}>
                Edit
            </button>

            <div class="modal" id={`id${note.n_id}`}>
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Edit Note</h4>
                        </div>

                        <div class="modal-body">
                            <input type="text" className="form-control" value={noteContent.title} 
                            onChange={e => setNoteContent({ ...noteContent, title: e.target.value})}/>

                            <div className="form-group flex-box mt-3">
                            <label className="note-text mr-3">Category: </label>
                            <select className="custom-select" value={noteContent.category} onChange={e => setNoteContent({ ...noteContent, category: e.target.value })}>
                                <option value="General">General</option>
                                <option value="School">School</option>
                                <option value="Work">Work</option>
                                <option value="Events">Events</option>
                                </select>
                            </div>
                            <textarea className="form-control" rows="7" value={noteContent.body} onChange={e => setNoteContent({ ...noteContent, body: e.target.value})}></textarea>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-dark btn-sm" data-bs-dismiss="modal" 
                            onClick={onEdit}>Edit</button>
                            <button type="button" class="btn btn-dark btn-sm" data-bs-dismiss="modal"
                            onClick={() => setNoteContent(note)}>Close</button>
                        </div>
                    </div>
                 </div>
            </div>
        </Fragment >
    )
};

export default EditNote