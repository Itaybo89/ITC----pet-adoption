const express = require('express')
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
const OpenAI = require('openai');

require('dotenv').config()

const server = express()
const port = process.env.PORT || 8080;
const dbConnection = require('./knex/knex')
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const petsRoutes = require('./routes/petsRoutes')
const usersRoutes = require('./routes/usersRoutes')

server.use(cors({ origin: 'http://localhost:3000', credentials: true }));
server.use(express.json());
server.use(cookieParser());

server.post('/search', async (req, res) => {
  const searchString = req.body.searchString;

  try {
    const pets = await dbConnection('pets').select('*');
    const prompt = `Disregard every message that came before this one; this is a new request and should not use any prior history. Find pets which match the following search line within the provided database. Return only an array of pet IDs that match the search criteria. No other types of responses are acceptable., Search string: ${searchString}, Data Base: ${JSON.stringify(pets)}`;

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: prompt,
        },
        {
          role: 'user',
          content: 'Find matching pets.',
        },
      ],
      max_tokens: 100,
    });

    const processedResponse = chatCompletion.choices[0].message.content.trim();
    const processedResponseArray = JSON.parse(processedResponse);
    const filteredPets = pets.filter(pet => processedResponseArray.includes(pet.petID));
    res.json({ filteredPets: filteredPets });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
server.post('/tools', async (req, res) => {
  const searchString = req.body.searchString;

  try {
    const petsDatabase = await dbConnection('pets').select('*');
    const favoritesDatabase = await dbConnection('favorites').select('*');
    const usersDatabase = await dbConnection('users').select('*');

    const prompt = `Disregard every message that came before this one; this is a new request and should not use any prior history. Answer the search query using the three databases, do not give userID. Search string: ${searchString}, Pets database: ${JSON.stringify(petsDatabase)}, Favorites database: ${JSON.stringify(favoritesDatabase)}, Users database: ${JSON.stringify(usersDatabase)}`;

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: prompt,
        },
        {
          role: 'user',
          content: 'Answer the search query.',
        },
      ],
      max_tokens: 100,
    });

    const processedResponse = chatCompletion.choices[0].message.content.trim();
    res.json({ processedResponse });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

server.use('/uploads', express.static(path.join(__dirname, 'uploads')));
server.use('/allpets', petsRoutes)
server.use('/users', usersRoutes)

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

dbConnection.migrate.latest()
  .then(migration => {
    if (migration) {
      console.log(migration)
      console.log('Connected to DB ')
    }
  });
