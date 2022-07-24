import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkYTcwN2RmZjU4M2ZhNTdmZTEzOTY2In0sImlhdCI6MTY1ODY1NDQ5Mn0.yeWf0RPccH7F5qRdsNPqXB63cRiOSPTiF-AwnsVlEDY"
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkYTcwN2RmZjU4M2ZhNTdmZTEzOTY2In0sImlhdCI6MTY1ODY1NDQ5Mn0.yeWf0RPccH7F5qRdsNPqXB63cRiOSPTiF-AwnsVlEDY"
      },
      body: JSON.stringify({title, description, tag})
    });
     

    console.log("Adding a new note")
    const note = {
      "_id": "62da7aedd57941d4793e0827",
      "user": "62da707dff583fa57fe13966",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-03T14:20:09.668Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkYTcwN2RmZjU4M2ZhNTdmZTEzOTY2In0sImlhdCI6MTY1ODY1NDQ5Mn0.yeWf0RPccH7F5qRdsNPqXB63cRiOSPTiF-AwnsVlEDY"
      }
    });
    const json = response.json();
    console.log(json)

    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkYTcwN2RmZjU4M2ZhNTdmZTEzOTY2In0sImlhdCI6MTY1ODY1NDQ5Mn0.yeWf0RPccH7F5qRdsNPqXB63cRiOSPTiF-AwnsVlEDY"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = response.json();

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }

    }
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;