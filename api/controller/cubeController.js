module.exports.calcVolume = async (event) => {
  const response = { statusCode: 201 };
  const body = JSON.parse(event.body);

  const cube = {
    width: Number(body.width),
    height: Number(body.height),
    depth: Number(body.depth),
    volume: Number(body.width * body.height * body.depth),
  };

  Object.keys(cube).forEach((value) => {
    if (!cube[value]) {
      throw new Error(`missing atribute ${value}`);
    } else if (!(cube[value] > 0 && typeof cube[value] === 'number')) {
      throw new Error(`invalid value for atribute ${value}`);
    }
  });

  response.body = JSON.stringify(cube);
  return response;
};
