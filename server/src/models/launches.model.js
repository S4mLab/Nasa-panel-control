const launchModel = require('./launches.mongo');
const planetModel = require('./planets.mongo');

// launches.set(launch.flightNumber, launch);

// find and get all launch docs
// exclude the id and version props of the doc
const getAllLaunches = async () => {
  return await launchModel.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
};

const DEFAULT_FLIGHT_NUMBER = 0;

// find the lastest flight number in the launches collection
const getLastestFlightNumber = async () => {
  const lastestFlightNum = await launchModel.findOne().sort('-flightNumber');
  if (!lastestFlightNum) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return lastestFlightNum;
};

// this func will update the launch data
// if the launch exist, update it
// otherwise, create a new launch
const updateLaunch = async (launchObj) => {
  // check the destination with planets collection
  const planetObj = await planetModel.findOne({
    keplerName: launchObj.destination,
  });

  // if there is no matched planet
  // throw an err
  try {
    if (!planetObj) {
      throw new Error('No matching planet found!');
    }
  } catch (err) {
    console.error(err);
  }

  await launchModel.updateOne(
    {
      flightNumber: launchObj.flightNumber,
    },
    launchObj,
    {
      upsert: true,
    }
  );
};

// with the updateLaunch, do we need this func anymore?
const addNewLaunch = (launch) => {
  lastestFlightNumber++;
  launches.set(
    lastestFlightNumber,
    Object.assign(launch, {
      flightNumber: lastestFlightNumber,
      customer: ['Terminal', 'SpaceX'],
      upcoming: true,
      success: true,
    })
  );
};

const findLaunchById = (launchIdNum) => {
  // if cannot find the launch
  if (!launches.has(launchIdNum)) {
    return false;
  }
  // if yes
  return true;
};

const abortLaunchById = (launchIdNum) => {
  // get launch obj value using its launchIdNum key
  const launchObj = launches.get(launchIdNum);
  // instead of delete launch data
  // we just mark it as abort
  // => upcomming prop = false
  launchObj.upcoming = false;
  // => success prop = false
  launchObj.success = false;
  return launchObj;
};

module.exports = {
  getAllLaunches,
  addNewLaunch,
  findLaunchById,
  abortLaunchById,
  updateLaunch,
};
