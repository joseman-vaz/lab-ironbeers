const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res, next) => res.render('index'));
app.get('/beers', (req, res, next) => {
  // const beers = [{ name: 'kro' }, { name: '8.6' }];
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beers: beersFromApi });
    })
    .catch(error => console.log(error));
});
app.get('/randomBeer', async (req, res, next) => {
  try {
    const randomBeer = await punkAPI.getRandom();
    res.render('randomBeer', { randomBeer });
  } catch (error) {
    next(error);
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
