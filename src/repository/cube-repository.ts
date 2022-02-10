import Cube from "../interface/cube/cube";
import CubeDto from "../interface/cube/cube-dto";
import Repository from "./repository";
import  {Redis} from "ioredis";
export class CubeRepository implements Repository<CubeDto,Cube> {
    constructor(private hash='cubes',private client: Redis){
        this.client = client;
    }
    
    async set(key: string, value: CubeDto): Promise<Cube> {
        const cube :Cube = {
            width: value.width,
            height: value.height,
            depth: value.depth,
            volume: value.volume,
            cached:true,
        }

        const create = await this.client.hset(this.hash,key,JSON.stringify(cube));
        if (create==1){
            throw new Error(`failed to create`)
        }
        return cube;
    }

    async get(key: string): Promise<Cube | null> {
        const cachedCube = await this.client.hget(this.hash, key);
        if(cachedCube){
            const cube = JSON.parse(cachedCube) as Cube;
            return cube;
        } else {
            return null;
        }

    }

    async getAll(number: number): Promise<Cube[]> {
        const cubesStored :  number = await this.client.hlen(this.hash);
        if (cubesStored < number) throw new Error(`only ${cubesStored} cached in system`);
        
        let cachedCubes = await this.client.hgetall(this.hash);
        const cubes: Cube[] = [];
        Object.keys(cachedCubes).forEach(key =>{
            cubes.push(JSON.parse(cachedCubes[key]) as Cube);
        })

        return cubes.slice(0,number);
    }
    
}

