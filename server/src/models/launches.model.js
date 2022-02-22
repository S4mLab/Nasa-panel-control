const launchModel = require('./launches.mongo');
const planetModel = require('./planets.mongo');

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

// updateLaunch is for when we assume the launch has all the info
// if the launch exist, update it, otherwise, create a new launch
const updateLaunch = async (launchObj) => {
  // check the destination with planets collection
  const planetObj = await planetModel.findOne({
    keplerName: launchObj.destination,
  });

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

// find the lastest flight number in the launches collection
const getLastestFlightNumber = async () => {
  // sort method using sorted ascending as default, to sort descending, using '-' sign before the properties name
  const lastestLaunchObj = await launchModel.findOne().sort('-flightNumber');
  const lastestFlightNum = lastestLaunchObj['flightNumber'];
  // if there is no launch yet, create the first flightNum
  if (!lastestFlightNum) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return lastestFlightNum;
};

// this func will get the user input, generate some other info and combine them together
const scheduleNewLaunch = async (userLaunchInputObj) => {
  const newFlightNum = (await getLastestFlightNumber()) + 1;

  // generate additional info for the new launch that user just create
  // these info is defaulted and only need to created internally
  const additionalLaunchInfoObj = {
    flightNumber: newFlightNum,
    customer: ['Terminal', 'SpaceX'],
    upcoming: true,
    success: true,
  };

  // combine 2 object together
  // using spread operator to merge 2 objs into one
  const completedLaunchObj = {
    ...userLaunchInputObj,
    ...additionalLaunchInfoObj,
  };

  // after merge 2 launch obj together, create the launch in the db
  updateLaunch(completedLaunchObj);
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
  scheduleNewLaunch,
  findLaunchById,
  abortLaunchById,
};
