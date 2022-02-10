import { CubeRepository } from '../../src/repository/cube-repository'
import * as Redis from 'ioredis'

jest.mock('ioredis')
describe('cube-repository', () => {
  const cubeMock = {
    height: 10,
    depth: 10,
    width: 10
  }
  const sut = new CubeRepository(new Redis())
  beforeEach(async () => {
    jest.resetAllMocks()
  })
  test('should calculate volume and return cube', async () => {
    jest.spyOn(Redis.prototype, 'set').mockImplementationOnce(async () => (1))

    const response = await sut.set(JSON.stringify(cubeMock), {
      height: 10,
      depth: 10,
      width: 10,
      volume: 1000
    })
    expect(response).toStrictEqual({
      height: 10,
      depth: 10,
      width: 10,
      volume: 1000,
      cached: true
    })
  })
  test('should return a cube that was previously cached', async () => {
    jest.spyOn(Redis.prototype, 'hget').mockImplementationOnce(async () => (JSON.stringify({
      height: 10,
      depth: 10,
      width: 10,
      volume: 1000,
      cached: true
    })))

    const response = await sut.get(JSON.stringify(cubeMock))
    expect(response).toStrictEqual({
      height: 10,
      depth: 10,
      width: 10,
      volume: 1000,
      cached: true
    })
  })
  test('should return a list of cube that was previously cached', async () => {
    jest.spyOn(Redis.prototype, 'hgetall').mockImplementationOnce(async () => ({
      '{"height":10,"depth":10,"width":10}': '{"width":10,"height":10,"depth":10,"volume":1000,"cached":true}',
      '{"width":10,"depth":11,"height":11}': '{"width":10,"height":11,"depth":11,"volume":1210,"cached":true}',
      '{"width":10,"depth":11,"height":13}': '{"width":10,"height":13,"depth":11,"volume":1430,"cached":true}'
    }))

    const response = await sut.getAll(3)
    expect(response).toStrictEqual(
      [
        {
          width: 10,
          height: 10,
          depth: 10,
          volume: 1000,
          cached: true
        },
        {
          width: 10,
          height: 11,
          depth: 11,
          volume: 1210,
          cached: true
        },
        {
          width: 10,
          height: 13,
          depth: 11,
          volume: 1430,
          cached: true
        }
      ]
    )
  })
  test('should throw error with number greater than the cubes cahced', async () => {
    jest.spyOn(Redis.prototype, 'hlen').mockImplementationOnce(async () => (3))
    await expect(sut.getAll(5)).rejects.toThrowError('only 3 cached in system')
  })
})
