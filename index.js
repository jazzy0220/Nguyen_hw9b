const { response, request } = require('express');
const express = require('express');
const multer = require('multer');
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();
const upload = multer();
const app = express();
app.use( (req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static("public"));
app.use(express.static("css"));

app.get('/', (request, response) => {
    response.sendFile(`${__dirname}/views/index.html`);
});

/* For exercise 1 */
app.get("/ex1", (request, response)=>{
    response.sendFile(`${__dirname}/views/ex1.html`);
});

app.post('/ex1', upload.array(), (request, response) => {
    var name = request.body.name;
    var email = request.body.email;
    response.send(`${name}, Thank you for your order. We will keep you posted on delivery status at ${email}`);
})

/* For exercise 2 */
app.get("/api/countries", (request, response)=>{
    response.sendFile(`${__dirname}/views/ex2.html`);
});

app.post('/api/countries', jsonParser, (request, response)=>{
    const data = request.body;
    const name = data.name;
    const number = data.countries.length;
    response.send(`Your name is ${name} and you visited ${number} countries. Keep travelling!`);
})

/* For exercise 3 */
// Define an article list
const data = [
    { 
      id: 1, 
      title: "First article",
      content: "Hello World!" 
    },
    {
      id: 2,
      title: "Lorem ipsum",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut hendrerit mauris ac porttitor accumsan. Nunc vitae pulvinar odio, auctor interdum dolor. Aenean sodales dui quis metus iaculis, hendrerit vulputate lorem vestibulum."
    },
    {
      id: 3,
      title: "Lorem ipsum in French",
      content:
        "J’en dis autant de ceux qui, par mollesse d’esprit, c’est-à-dire par la crainte de la peine et de la douleur, manquent aux devoirs de la vie. Et il est très facile de rendre raison de ce que j’avance."
    }
];

app.get("/articles", (request, response)=>{
    response.sendFile(`${__dirname}/views/ex3.html`);
});

function MAX(data){
    var id = [];
    id = data.map(e=>{
        return e.id;
    })
    return Math.max.apply(null, id);
}

app.post('/articles', upload.array(), (request, response) => {
    var title = request.body.title;
    var content = request.body.content;
    var id = MAX(data)+1;
    data.push({id, title, content});
    response.send(`New article added successfully with title \"${title}\" and ID ${id}!`);
})

const listener = app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Your app is listening on port ${listener.address().port}`);
});