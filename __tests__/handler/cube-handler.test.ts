
import { cubeHandler as sut } from '../../src/handler/cube-handler'
import { CubeRepository } from '../../src/repository/cube-repository'
import { CubeService } from '../../src/service/cube-service'
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
    jest.spyOn(CubeService.prototype, 'set').mockImplementationOnce(async () => ({
      height: 10,
      depth: 10,
      width: 10,
      volume: 1000
    }))
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
    jest.spyOn(CubeService.prototype, 'set').mockImplementationOnce(async () => (cachedCube))

    const response = await sut({ body: JSON.stringify(cubeMock) })
    expect(response).toStrictEqual({
      statusCode: 201,
      body: JSON.stringify(cachedCube)
    })
  })
  test('should return error with invalid cube', async () => {
    jest.spyOn(CubeService.prototype, 'set').mockImplementationOnce(() => { throw new Error('width is required') })
    const response = await sut({ body: JSON.stringify({ height: 10, depth: 10 }) })
    expect(response).toStrictEqual({
      statusCode: 400,
      body: 'width is required'
    })
  })
  test('should return error with empity body', async () => {
    jest.spyOn(CubeService.prototype, 'set').mockImplementationOnce(() => { throw new Error('width is required') })
    const response = await sut({ body: null })
    expect(response).toStrictEqual({
      statusCode: 400,
      body: 'width is required'
    })
  })
})
