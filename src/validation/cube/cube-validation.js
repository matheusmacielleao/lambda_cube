module.exports.cubeValidation = (body) => {
  const cube = {
    width: { required: true },
    height: { required: true },
    depth: { required: true },
  };

  return Object.keys(cube).forEach((value) => {
    const param = cube[value];
    if (param.required && !Object.prototype.hasOwnProperty.call(body, `${value}`)) {
      throw new Error(`${value} is required`);
    }
    if (typeof body[value] !== 'number') {
      throw new Error(`${value} must be a number`);
    }
    if (body[value] <= 0) {
      throw new Error(`${value} must be bigger than 0`);
    }
  });
};
