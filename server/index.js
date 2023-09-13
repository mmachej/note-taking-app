const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());


//create a note
app.post("/notes", async (req, res) => {
    try {
        const {title, category, body} = req.body.note;
        const newNote = await pool.query(
            "INSERT INTO notes (title, category, body) VALUES ($1, $2, $3) RETURNING * ", 
            [title, category, body]
        );     
        res.json(newNote.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all notes
app.get("/notes", async (req, res) => {
    try {
        const allNotes = await pool.query(
            "SELECT * FROM notes ORDER BY created"
        );
        res.json(allNotes.rows)
    } catch (err) {
        console.error(err.message);
    }
});

//delete a note
app.delete("/notes/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteNote = await pool.query(
            "DELETE FROM notes WHERE n_id = $1 ",
            [id]
        );
        res.json("Note was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

//update a note
app.put("/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, body } = req.body.noteContent;
        const updateToDo = await pool.query(
            "UPDATE notes SET title = $1, category = $2, body = $3, edited = CURRENT_DATE WHERE n_id = $4",
            [title, category, body, id ]
        );
        res.json("Note was updated"); 
    } catch (err) {
        console.error(err.message);
    }
});


//get all categories
app.get("/categories", async (req, res) => {
    try {
        const allCat = await pool.query(
            "SELECT DISTINCT category FROM notes"
        );
        res.json(allCat.rows)
    } catch (err) {
        console.error(err.message);
    }
});


app.listen(5000, () => {
    console.log("server has started on port 5000")
});
