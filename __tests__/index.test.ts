
import { createClient } from 'redis';
import { calcVolume } from '../src';
import { mock } from 'jest-mock-extended'
import * as Redis from 'ioredis';
describe('cubeValidation', () => {
  let cubeMock: { width: any; height?: number; depth?: number; };
  const connection = new Redis();  

  beforeEach(async () => {
    connection.del('cubes');
    jest.resetAllMocks();
    cubeMock = {
      height: 10,
      depth: 10,
      width: 10,
    };
    await connection.quit();

  });
  test('should return cube  with volume', async () => {
    const calcVolumeMock= jest.fn(calcVolume);
    const response = await calcVolumeMock({body: JSON.stringify(cubeMock)});
    response.body = JSON.parse(response.body);
    expect(response.statusCode).toBe(201);
    expect(response.body.volume).toBe(1000);
  });
  
  test('should return cached cube', async () => {
    const calcVolumeMock= jest.fn(calcVolume);
    let response = await calcVolumeMock({body: JSON.stringify(cubeMock)});
    response = await calcVolumeMock({body: JSON.stringify(cubeMock)});

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
    const response = await calcVolume({body:null});
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeDefined();
  });
});
