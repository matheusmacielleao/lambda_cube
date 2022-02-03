const { cubeValidation } = require('./validation/cube/cube-validation');

module.exports.calcVolume = async (event) => {
  try {
    let body = JSON.parse(event.body);
    if (body === null) { body = {}; }

    cubeValidation(body);

    const cube = {
      width: body.width,
      height: body.height,
      depth: body.depth,
      volume: body.width * body.height * body.depth,
    };
    const response = { body: JSON.stringify(cube), statusCode: 201 };
    return response;
  } catch (e) {
    return { body: e.message, statusCode: 400 };
  }
};
