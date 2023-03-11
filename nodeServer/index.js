// const http = require("http");
const express = require('express');

const app = express();

// To access data easily, we need help of an express JSON.parser
app.use(express.json());

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n=>n.id)): 0
  return maxId + 1;
}

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
      },
      {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
      },
      {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
      }
]
// const app = http.createServer((request, response)=>{
//     response.writeHead(200, {'Content-Type':'application/json'});
//     response.end(JSON.stringify(notes));
// })

app.get('/',(request, response) => {
  console.log(request);
    response.send('<h1>Hello, world</h1>');
});

app.get('/api/notes', (request, response) => {
    response.send(notes);
});

app.get('/api/notes/:id', (request, response)=>{
  const id = Number(request.params.id);
  const note = notes.find(elem =>{
    // console.log(elem.id, typeof elem.id, id, typeof id, elem.id === id)
    return elem.id === id
  });
  if(note){
    console.log(note);
    response.send(note);
  }else{
    console.log(note);
    response.status(404).end();
  }
  // response.send(note);
});

// Deleting a resource
app.delete('/api/notes/:id',(request, response)=>{
  const id = Number(request.params.id);
  notes = notes.filter(elem => elem.id !== id);

  response.status(204).end();
})


// Adding a note to the server.
app.post('/api/notes', (request, response)=>{
  
  const body = request.body;
  // response.json(note);
  if(!body.content){
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id:generateId()
  }

  notes.concat(note);

  response.json(note)
});


const PORT = 3001;
app.listen(PORT, ()=>{
    console.log(`Server starting at port ${PORT}`);
});