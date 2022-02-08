import Cube from "../interface/cube/cube";
import CubeDto from "../interface/cube/cube-dto";
import Repository from "./repository";
import *  as Redis from "ioredis";
import { ioredisClient } from "../../infra/cache/ioredis-client";
export class CubeRepository implements Repository<CubeDto,Cube> {
    constructor(private hash='cubes'){}
    private client = ioredisClient();
    async set(key: string, value: CubeDto): Promise<Cube> {
        const cube :Cube = {
            width: value.width,
            height: value.height,
            depth: value.depth,
            volume: value.volume,
            cached:true,
        }

        this.client.hset(this.hash,key,JSON.stringify(cube)).then(()=>this.client.quit());
        
        const {cached,...response} = cube;
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
    
}

