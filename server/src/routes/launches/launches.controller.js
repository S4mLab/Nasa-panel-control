const {
  getAllLaunches,
  scheduleNewLaunch,
  findLaunchById,
  abortLaunchByFlightNum,
} = require('../../models/launches.model');

const httpGetAllLaunches = async (req, res) => {
  // what you want to achieve
  // we want to get an array of launch objects
  const launchObjsList = await getAllLaunches();
  return res.status(200).json(launchObjsList);
};

const httpAddNewLaunch = (req, res) => {
  // get the data from the post req
  const launch = req.body;
  // check if user missing any input data or invalid input
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.destination ||
    !launch.launchDate
  ) {
    return res.status(400).json({
      error: 'Missing required launch properties',
    });
  }
  // convert date str to Date format
  launch.launchDate = new Date(launch.launchDate);

  if (launch.launchDate.toString() === 'Invalid Date') {
    return res.status(400).json({
      error: 'Invalid launch date',
    });
  }

  scheduleNewLaunch(launch);
  // status 201 means the launch created successfully
  // send the launch json in res to check it
  return res.status(201).json(launch);
};

const httpAbortLaunch = (req, res) => {
  // need to get launch ID which is passsed in as a parameter
  const launchIdNum = Number(req.params.id);

  // if launch does not exist
  if (!findLaunchById(launchIdNum)) {
    return res.status(404).json({
      error: `Cannot find ${launchIdNum}!`,
    });
  }

  // if launch exist
  const theAbortedLaunch = abortLaunchByFlightNum(launchIdNum);
  return res.status(200).json(theAbortedLaunch);
};

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
