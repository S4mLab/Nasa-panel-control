const launches = new Map();

// can we use objects instead of map
const launch = {
  flightNumber: 1,
  launchDate: new Date('January 28 2022'),
  mission: 'Kepler Exploration X',
  rocket: 'Falcon 9',
  destination: 'Kepler-442 b',
  customer: ['Terminal', 'SpaceX'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

const getAllLaunches = () => {
  return Array.from(launches.values());
};

let lastestFlightNumber = 1;

// create new launch
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
};
