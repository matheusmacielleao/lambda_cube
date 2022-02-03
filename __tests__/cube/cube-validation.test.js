const { cubeValidation } = require('../../src/validation/cube/cube-validation');

describe('calcVolume', () => {
  test(' cube with missing atribute', async () => {
    const cubeMock = {
      height: 10,
      depth: 10,
    };

    expect(() => { cubeValidation(cubeMock); }).toThrow('width is required');
  });

  test(' empity cube object', async () => {
    const cubeMock = {};
    expect(() => { cubeValidation(cubeMock); }).toThrow('width is required');
  });
  test(' cubeatribute value less than 0', async () => {
    const cubeMock = {
      height: 10,
      depth: 10,
      width: -1,
    };
    expect(() => { cubeValidation(cubeMock); }).toThrow('width must be bigger than 0');
  });
  test(' should return status 400 and message with atribute not being a number', async () => {
    const cubeMock = {
      height: 10,
      depth: 10,
      width: 'test',
    };
    expect(() => { cubeValidation(cubeMock); }).toThrow('width must be a number');
  });
});
