import Note from './components/Note';
import noteService from './service/notes'
import Notification from './components/Notification';
import { useState, useEffect } from 'react';


const Footer = ()=>{
  const footerStyle ={
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
    </div>
  )
}

const App = () => {
  
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('some error happenned');

  useEffect(()=>{
    noteService.getAll()
    .then(initialData => {
      setNotes(initialData);
    })
  },[]);

  console.log('render',notes.length, 'notes');
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true);


  const addNote = (event) =>{
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    noteService.create(noteObject)
    .then(response => {
      setNotes(notes.concat(response));
      setNewNote('')
    })
  }

  const toggleImportance = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = {...note, important: !note.important};
    
    noteService.update(id,changedNote).then(response =>{
      setNotes(notes.map(n => n.id !== id ? n : response.data));
    }).catch(error => {
      setErrorMessage(`${note.content} was already deleted from server`);
      setTimeout(()=>{
        setErrorMessage(null);
      },5000)
      setNotes(notes.filter(note => note.id !== id))
    });
  }

  const handleNoteChange = (event) =>{
    setNewNote(event.target.value);
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={()=>setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        <ul>
          {notesToShow.map(note => 
            <Note 
            key={note.id} 
            note={note}
            toggleImportance={()=>toggleImportance(note.id)} />
          )}
        </ul>
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit' >save</button>
      </form>

      <Footer />
    </div>
  )
}

export default App
