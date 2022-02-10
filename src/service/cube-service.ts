import { ioredisClient } from '../infra/cache/ioredis-client'
import Cube from '../interface/cube/cube'
import { CubeRepository } from '../repository/cube-repository'
import { cubeValidation } from '../validation/cube/cube-validation'

export class CubeService {
  private client = ioredisClient()
  private cubeRepository = new CubeRepository(this.client)

  async set (event:{body: string}): Promise<Cube> {
    let body = JSON.parse(event.body)
    if (body === null) { body = {} }
    const stringifiedBody = event.body

    cubeValidation(body)

    const cachedCube = await this.cubeRepository.get(stringifiedBody)
    if (cachedCube) {
      return cachedCube
    }

    body.volume = body.width * body.height * body.depth
    const cube = await this.cubeRepository.set(stringifiedBody, body)
    const { cached, ...response } = cube
    return response as Cube
  }

  async disconnect () {
    await this.client.quit()
  }
}
