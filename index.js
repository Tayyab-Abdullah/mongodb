const express = require('express');
const app = express();
const Joi = require('joi');
app.use(express.json());


const genres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },  
    { id: 4, name: 'Sci-Fi' },  
    { id: 5, name: 'Thriller' },  
  ];
  
  // Handling get request
  
  app.get('/', (req, res) => {
    res.send(genres);
  });
  
  
  app.get('/api/genres/:id', (req, res) => {
      const genre = genres.find(c => c.id === parseInt(req.params.id));
      if (!genre) return res.status(404).send('The genre with the given ID was not found.');
      res.send(genre);
    });
    
  
  // Handling post request
  
  app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre = {
      id: genres.length + 1,
      name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
  });
  
  // Handling put request
  
  app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    genre.name = req.body.name; 
    res.send(genre);
  });
  
  // Handling delete request
  
  app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
  
    res.send(genre);
  });
  
  // Validation
  
  function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(genre, schema);
  }

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));