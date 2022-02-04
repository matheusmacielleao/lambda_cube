import { readJsonConfigFile } from 'typescript';
import {cubeValidation} from './validation/cube/cube-validation';
import { createClient } from 'redis';


const calcVolume = async (event:{body: string}) => {
  try {
    let body = JSON.parse(event.body);
    if (body === null) { body = {}; }
   
    const client = createClient();
    await client.connect();

    cubeValidation(body);
    const stringifiedBody = JSON.stringify(body);
    const cached = await client.HGET("cubes",stringifiedBody);
    if(cached){
      return {body: cached,statusCode:200}
    }
    const cube = JSON.stringify({
      width: body.width,
      height: body.height,
      depth: body.depth,
      volume: body.width * body.height * body.depth,
      cached: true,
    });

    const response = { body: cube, statusCode: 201 };
    client.HSET("cubes",stringifiedBody,cube);
    return response;
  } catch (e : any) {
    return { body: e.message, statusCode: 400 };
  }
};
export  {calcVolume};
