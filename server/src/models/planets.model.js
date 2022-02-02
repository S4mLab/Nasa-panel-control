const { parse } = require('csv-parse');
const { createReadStream } = require('fs');
const path = require('path');
const planetModel = require('./planets.mongo');

const isHabitable = (planetObj) => {
  return (
    planetObj['koi_disposition'] == 'CONFIRMED' &&
    planetObj['koi_insol'] > 0.36 &&
    planetObj['koi_insol'] < 1.11 &&
    planetObj['koi_prad'] < 1.6
  );
};

const updatePLanet = async (planetObj) => {
  // upsert mode first find the document in the collection
  // if the document is not exist, it will creates new one
  // the 1st arg obj is the condition to find the doc
  // if it not found, then create a new doc with 2nd arg obj
  try {
    return await planetModel.updateOne(
      {
        keplerName: planetObj.kepler_name,
      },
      {
        keplerName: planetObj.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Could not save the planet: ${err}`);
  }
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
          await updatePLanet(planetObj);
        }
      })
      .on('error', (err) => reject(err))
      .on('end', async () => {
        const planetsNum = (await getAllHabitalbePlanets()).length;
        console.log(`${planetsNum} habitable planets found...`);
        console.log('Done');
        resolve();
      });
  });
};

// now this func no need to get the data from local file
// it need to fetch the data from the planets collection in the db
const getAllHabitalbePlanets = async () => {
  // fetch all the documents from the planet collection
  // find all the planets docs
  // with .find(), we pass the doc obj you want to find as an arg
  // to get all the doc in a collection, just pass in empty {}
  return await planetModel.find({});
};

module.exports = {
  loadPlanetsData,
  getAllHabitalbePlanets,
};
