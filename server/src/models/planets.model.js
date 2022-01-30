const { parse } = require('csv-parse');
const { createReadStream } = require('fs');
const path = require('path');
const planetsCollection = require('./planets.mongo');

const habitablePlanetsArray = [];

const isHabitable = (planetObj) => {
  return (
    planetObj['koi_disposition'] == 'CONFIRMED' &&
    planetObj['koi_insol'] > 0.36 &&
    planetObj['koi_insol'] < 1.11 &&
    planetObj['koi_prad'] < 1.6
  );
};

// connect to the data file, create a stream then process it
const loadPlanetsData = () => {
  // Promisifying, technique to turn a function with a callback and have it to return a promise
  return new Promise((resolve, reject) => {
    createReadStream(
      path.join(__dirname, '..', '..', 'data', 'kepler_data.csv')
    )
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', async (planetObj) => {
        if (isHabitable(planetObj)) {
          // now when the planet is checked to be habitable
          // create its document in the mongodb
          await planetsCollection.create({
            // since this func will be invoked when the server start or restart
            // it will create new planet instance every time
            // to resolve this, mongo have something called upsert
            // update + insert = upsert
            // mongo will find the planet instance first
            // only create new instance if it can't find it
            keplerName: planetObj['kepler_name'],
          });
        }
      })
      .on('error', (err) => reject(err))
      .on('end', () => {
        console.log(
          `${habitablePlanetsArray.length} habitable planets has been found.`
        );
        console.log('Done');
        resolve();
      });
  });
};

// now this func no need to get the data from local file
// it need to fetch the data from the planets collection in the db
const getAllHabitalbePlanets = async () => {
  // fetch all the documents from the planet collection
  return await planetsCollection.find({});
};

module.exports = {
  loadPlanetsData,
  getAllHabitalbePlanets,
};
