const { getAllHabitalbePlanets } = require('../../models/planets.model');

const httpGetAllPlanets = async (req, res) => {
  return await res.status(200).json(getAllHabitalbePlanets());
};

module.exports = {
  httpGetAllPlanets,
};
