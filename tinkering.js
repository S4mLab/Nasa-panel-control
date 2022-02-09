const { getAllHabitalbePlanets } = require('./server/src/models/planets.model');

const getData = async () => {
  try {
    const data = await getAllHabitalbePlanets();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

getData();
