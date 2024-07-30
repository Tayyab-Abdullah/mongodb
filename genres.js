const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Joi = require('joi');
app.use(express.json());

mongoose.connect('mongodb://localhost/vidly')
 .then(() => console.log('Connected to MongoDB'))
 .catch((err) => console.log('Connection Failed: ', err.message));

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

  // Handling get request
  
  app.get('/api/genres/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
  });
  
  
  app.get('/api/genres/:id', async (req, res) => {
      const genre = await Genre.findById(req.params.id);
      if (!genre) return res.status(404).send('The genre with the given ID was not found.');
      res.send(genre);
  });
    
  
  // Handling post request
  
  app.post('/api/genres', async (req, res) => {
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save(genre);
    res.send(genre);
  });
  
  // Handling put request
  
  app.put('/api/genres/:id', async (req, res) => {

    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { 
        new: true
    })

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    res.send(genre);
  });
  
  // Handling delete request
  
  app.delete('/api/genres/:id', async (req, res) => {

    const genre = await Genre.deleteOne({ _id: req.params.id });
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
  });
  
  // Validation
  
  function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return true;
  }

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));