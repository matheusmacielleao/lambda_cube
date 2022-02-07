import {cubeValidation} from './validation/cube/cube-validation';
import { createClient } from 'redis';


const calcVolume = async (event:{body: string}) => {
  const client = createClient();
  await client.connect();
  
  try {
    let body = JSON.parse(event.body);
    if (body === null) { body = {}; }
   
    cubeValidation(body);
    
    const stringifiedBody = event.body;
    const cached = await client.HGET("cubes",stringifiedBody);
    if(cached){
      client.quit();
      const cachedCube = JSON.parse(cached);
      cachedCube.cached = true;
      return {body: JSON.stringify(cachedCube),statusCode:200}
    }
    const cube = JSON.stringify({
      width: body.width,
      height: body.height,
      depth: body.depth,
      volume: body.width * body.height * body.depth,
    });

    const response = { body: cube, statusCode: 201 };
    
    client.HSET("cubes",stringifiedBody,cube).then(()=>client.quit());
        
    return response;

  } catch (e : any) {
    client.quit();
    return { body: e.message, statusCode: 400 };
  }
};
export  {calcVolume};
