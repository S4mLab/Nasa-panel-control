const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', () => {
  test('it should response with status of 200 success', async () => {
    const response = request(app)
      .get('/launches')
      .expect(200)
      .expect('Content-Type', /json/);
  });
});

const completedLaunchData = {
  mission: 'USS Enterprise',
  rocket: 'Falcon 9',
  destination: 'Kepler-186 f',
  launchDate: 'January 28 2023',
};

const launchDataWithoutDate = {
  mission: 'USS Enterprise',
  rocket: 'Falcon 9',
  destination: 'Kepler-186 f',
};

const launchDataWithInvalidDate = {
  mission: 'USS Enterprise',
  rocket: 'Falcon 9',
  destination: 'Kepler-186 f',
  launchDate: 'hi there',
};

describe('Test POST /launch', () => {
  test('it should return 201 code with the newly created object', async () => {
    // need to check how the launchDate
    // check the body of the response
    const response = await request(app)
      .post('/launches')
      .send(completedLaunchData)
      .expect(201)
      .expect('Content-Type', /json/);

    const requestDate = new Date(completedLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);
    // whnever to check the body of response, we use jest assertions
    expect(response.body).toMatchObject(completedLaunchData);
  });

  const missingPropsErrMessage = 'Missing required launch properties';

  test('it should catches missing required launch props with 400 code', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithoutDate)
      .expect(400)
      .expect('Content-Type', /json/);

    expect(response.body.error).toBe(missingPropsErrMessage);
  });

  test('it should catches invalid launch date with 400 code', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithInvalidDate)
      .expect(400)
      .expect('Content-Type', /json/);

    const invalidDateErrMessage = 'Invalid launch date';
    expect(response.body.error).toBe(invalidDateErrMessage);
  });
});
