
const { calcVolume } = require('../../src');



describe('src :: index :: calcVolume', () => {
  test('should calculate the volume of the cube', async () => {
    let cubeMock = {};
    cubeMock.body = JSON.stringify({
        'height': 10,
         'depth': 10,
         'width': 10
     })
    const response = await calcVolume(cubeMock);
    response.body = JSON.parse(response.body);
    expect(response.statusCode).toBe(201);
    expect(response.body.volume).toBe(1000);
  });
  test(' should return status 400 and message with missing atribute', async () => {
    let cubeMock = {};
    cubeMock.body = JSON.stringify({
        'height': 10,
         'depth': 10
     })
    const response = await calcVolume(cubeMock);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe('width is required')
  });
  test(' should return status 400 and message with starting missing atribute', async () => {
    let cubeMock = {};
    cubeMock.body = null;
    const response = await calcVolume(cubeMock);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe('width is required')
  });
  test(' should return status 400 and message with atribute less than 0', async () => {
    let cubeMock = {};
    cubeMock.body = JSON.stringify({
        'height': 10,
         'depth': 10,
         'width': -1
     })
    const response = await calcVolume(cubeMock);

    expect(response.statusCode).toBe(400);
    expect(response.body).toBe('width must be bigger than 0')

  });
  test(' should return status 400 and message with atribute not being a number', async () => {
    let cubeMock = {};
    cubeMock.body = JSON.stringify({
        'height': 10,
         'depth': 10,
         'width': "test"
     })
    const response = await calcVolume(cubeMock);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe('width must be a number')

  });
});
