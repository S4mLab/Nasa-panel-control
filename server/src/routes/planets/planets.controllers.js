const { getAllHabitalbePlanets } = require('../../models/planets.model');

const httpGetAllPlanets = async (req, res) => {
  let planetsList = await getAllHabitalbePlanets();
  return res.status(200).json(planetsList);
};

module.exports = {
  httpGetAllPlanets,
};
