
import { cubeHandler as sut } from '../../src/handler/cube-handler'
import { CubeRepository } from '../../src/repository/cube-repository'
describe('cubeValidation', () => {
  let cubeMock = {
    height: 10,
    depth: 10,
    width: 10
  }
  beforeEach(async () => {
    jest.resetAllMocks()
    cubeMock = {
      height: 10,
      depth: 10,
      width: 10
    }
  })
  test('should return cube  with volume', async () => {
    jest.spyOn(CubeRepository.prototype, 'get').mockImplementationOnce(async () => (null))
    jest.spyOn(CubeRepository.prototype, 'set').mockImplementationOnce(async () => (
      {
        height: 10,
        depth: 10,
        width: 10,
        volume: 1000,
        cached: true
      }
    ))
    const response = await sut({ body: JSON.stringify(cubeMock) })
    expect(response).toStrictEqual({
      statusCode: 201,
      body: JSON.stringify({
        height: 10,
        depth: 10,
        width: 10,
        volume: 1000
      })
    })
  })

  test('should return cached cube', async () => {
    const cachedCube = {
      height: 10,
      depth: 10,
      width: 10,
      volume: 1000,
      cached: true
    }
    jest.spyOn(CubeRepository.prototype, 'get').mockImplementationOnce(async () => (cachedCube))

    const response = await sut({ body: JSON.stringify(cubeMock) })
    expect(response).toStrictEqual({
      statusCode: 200,
      body: JSON.stringify(cachedCube)
    })
  })
  test('should return error with invalid cube', async () => {
    jest.spyOn(CubeRepository.prototype, 'get').mockImplementationOnce(async () => (null))
    const response = await sut({ body: JSON.stringify({ height: 10, depth: 10 }) })
    expect(response).toStrictEqual({
      statusCode: 400,
      body: 'width is required'
    })
  })
  test('should return error with empity body', async () => {
    jest.spyOn(CubeRepository.prototype, 'get').mockImplementationOnce(async () => (null))
    const response = await sut({ body: null })
    expect(response).toStrictEqual({
      statusCode: 400,
      body: 'width is required'
    })
  })
})
