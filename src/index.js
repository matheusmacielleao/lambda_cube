const { calcVolumeValidation } = require('./validation/cube/calcVolumeValidation');

module.exports.calcVolume = async (event) => {
  const response = { statusCode: 201 };
  const body = JSON.parse(event.body);
  try {
    await calcVolumeValidation(body);
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
