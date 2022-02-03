import {cubeValidation} from './validation/cube/cube-validation';

const calcVolume = async (event:{body: string}) => {
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
  } catch (e : any) {
    return { body: e.message, statusCode: 400 };
  }
};
export  {calcVolume};
