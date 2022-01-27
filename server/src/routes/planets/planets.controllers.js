const { getAllHabitalbePlanets } = require('../../models/planets.model');

const httpGetAllPlanets = (req, res) => {
  return res.status(200).json(getAllHabitalbePlanets());
};

module.exports = {
  httpGetAllPlanets,
};
