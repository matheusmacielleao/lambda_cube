import Cube from '../interface/cube/cube'
import CubeDto from '../interface/cube/cube-dto'
import Repository from './repository'
import { Redis } from 'ioredis'
export class CubeRepository implements Repository<CubeDto, Cube> {
    private hash='cubes';
    constructor (private client: Redis) {
      this.client = client
    }

    async set (key: string, value: CubeDto): Promise<Cube> {
      const cube :Cube = {
        width: value.width,
        height: value.height,
        depth: value.depth,
        volume: value.volume,
        cached: true
      }

      await this.client.hset(this.hash, key, JSON.stringify(cube))
      return cube
    }

    async get (key: string): Promise<Cube | null> {
      const cachedCube = await this.client.hget(this.hash, key)

      if (!cachedCube) {
        return null
      }

      const cube = JSON.parse(cachedCube) as Cube
      return cube
    }

    async getAll (number: number): Promise<Cube[]> {
      const cubesStored : number = await this.client.hlen(this.hash)
      if (cubesStored < number) throw new Error(`only ${cubesStored} cached in system`)

      const cachedCubes = await this.client.hgetall(this.hash)
      const cubes: Cube[] = []
      Object.keys(cachedCubes).forEach(key => {
        cubes.push(JSON.parse(cachedCubes[key]) as Cube)
      })

      return cubes.slice(0, number)
    }
}
