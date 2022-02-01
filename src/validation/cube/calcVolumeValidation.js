/* eslint-disable consistent-return */
/* eslint-disable valid-typeof */
module.exports.calcVolumeValidation = async (body) => {
  const cube = {
    width: { type: 'number', required: true },
    height: { type: 'number', required: true },
    depth: { type: 'number', required: true },
  };

  Object.keys(cube).forEach((value) => {
    const param = cube[value];
    if (param.required && !Object.prototype.hasOwnProperty.call(body, `${value}`)) {
      throw new Error(`${value} is required`);
    }
    if (typeof body[value] !== param.type.toString()) {
      throw new Error(`${value} must be a ${param.type}`);
    }
    if (body[value] <= 0) {
      throw new Error(`${value} must be bigger than 0`);
    }
  });
};
