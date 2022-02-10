const { cubeValidation } = require('../../../src/validation/cube/cube-validation')

describe('calcVolume', () => {
  let cubeMock: { width: any; height?: number; depth?: number; }

  beforeEach(async () => {
    cubeMock = {
      height: 10,
      depth: 10,
      width: 10
    }
  })
  test('cube with missing atribute', async () => {
    delete cubeMock.width
    expect(() => { cubeValidation(cubeMock) }).toThrow('width is required')
  })

  test('empity cube object', async () => {
    expect(() => { cubeValidation({}) }).toThrow('width is required')
  })

  test('cubeatribute value less than 0', async () => {
    cubeMock.width = -1
    expect(() => { cubeValidation(cubeMock) }).toThrow('width must be bigger than 0')
  })

  test('should return status 400 and message with atribute not being a number', async () => {
    cubeMock.width = 'test'
    expect(() => { cubeValidation(cubeMock) }).toThrow('width must be a number')
  })
})
