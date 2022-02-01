module.exports.calcVolume = async (event) => {
  const response = { statusCode: 204 };
  const body = JSON.parse(event.body);
  const cube = {
    width: body.width,
    height: body.height,
    depth: body.depth,
    volume: body.width * body.height * body.depth,
  };

  response.body = JSON.stringify(cube);
  return response;
};
