const { calcVolume } = require('../../src');

describe('cubeValidation', () => {
  test('should calculate the volume of the cube', async () => {
    const cubeMock = {};
    cubeMock.body = JSON.stringify({
      height: 10,
      depth: 10,
      width: 10,
    });
    const response = await calcVolume(cubeMock);
    response.body = JSON.parse(response.body);
    expect(response.statusCode).toBe(201);
    expect(response.body.volume).toBe(1000);
  });
});
