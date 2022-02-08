import {cubeValidation} from './validation/cube/cube-validation';
import { createClient } from 'redis';
import {CubeRepository} from './repository/cube-repository';

const calcVolume = async (event: any) => {
  const cubeRepository = new CubeRepository();
  try {
    let body = JSON.parse(event.body);
    if (body === null) { body = {}; }
    const stringifiedBody = event.body;

    cubeValidation(body);
    
    const cachedCube = await cubeRepository.get(stringifiedBody);
    if(cachedCube){
      return {body: JSON.stringify(cachedCube),statusCode:200}
    }

    body.volume = body.width* body.height* body.depth;    
    cubeRepository.set(stringifiedBody,body);
    
    return {body: JSON.stringify(body),statusCode:201}

  } catch (e : any) {
    return { body: e.message, statusCode: 400 };
  }
};
export {calcVolume};
