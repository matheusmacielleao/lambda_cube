const { createClient } = require('redis');
const { calcVolume } = require('../src');

describe('cubeValidation', () => {
  let cubeMock: { width: any; height?: number; depth?: number; };
  const client = createClient();

  afterAll(async () => {
   
  });

  beforeAll(async () => {
    cubeMock = {
      height: 10,
      depth: 10,
      width: 10,
    };
    await client.connect();
    await client.del('cubes');
    await client.quit();
  });
  test('should calculate the volume of the cube', async () => {
    const response = await calcVolume({ body: JSON.stringify(cubeMock) });
    response.body = JSON.parse(response.body);
    expect(response.statusCode).toBe(201);
    expect(response.body.volume).toBe(1000);
  });
  test('should return cached cube', async () => {
    let response = await calcVolume({ body: JSON.stringify(cubeMock) });
    response = await calcVolume({ body: JSON.stringify(cubeMock) });
    response.body = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.volume).toBe(1000);
    expect(response.body.cached).toBe(true);

  });
  test('should return error with invalid cube', async () => {
    delete cubeMock.width;
    const response = await calcVolume({ body: JSON.stringify(cubeMock) });
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeDefined();
  });
  test('should return error with empity body', async () => {
    const response = await calcVolume({ body: null });
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeDefined();
  });
});
