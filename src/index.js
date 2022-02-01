const { cubeValidation } = require('./validation/cube/cube-validation');

module.exports.calcVolume = async (event) => {
  const response = { statusCode: 201 };
  try {
    const body = JSON.parse(event.body);
    cubeValidation(body || {});
    const cube = {
      width: body.width,
      height: body.height,
      depth: body.depth,
      volume: body.width * body.height * body.depth,
    };
    response.body = JSON.stringify(cube);
    return response;
  } catch (e) {
    return { body: e.message, statusCode: 400 };
  }
};
