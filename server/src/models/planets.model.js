const { parse } = require('csv-parse');
const { createReadStream } = require('fs');
const path = require('path');

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
      .on('data', (planetObj) => {
        if (isHabitable(planetObj)) {
          habitablePlanetsArray.push(planetObj);
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

const getAllHabitalbePlanets = () => {
  return habitablePlanetsArray;
};

module.exports = {
  loadPlanetsData,
  getAllHabitalbePlanets,
};
