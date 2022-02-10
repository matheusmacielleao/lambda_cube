import { ioredisClient } from '../infra/cache/ioredis-client'
import { CubeRepository } from '../repository/cube-repository'

const bagHandler = async (event: any) => {
  const client = ioredisClient()
  const cubeRepository = new CubeRepository(client)
  try {
    const body = JSON.parse(event.body)
    if (!body.number || typeof body.number !== 'number' || body.number < 1) {
      throw new Error('number property invalid')
    }
    const cubes = await cubeRepository.getAll(body.number)
    const bag = {
      width: 0,
      height: 0,
      depth: 0,
      volume: 0,
      cubesStored: cubes
    }
    cubes.forEach(cube => {
      bag.volume += cube.volume
      if (bag.width < cube.width) bag.width = cube.width
      if (bag.height < cube.height) bag.height = cube.height
    })
    bag.depth = bag.volume / (bag.width * bag.height)
    return { body: JSON.stringify(bag), statusCode: 201 }
  } catch (e : any) {
    return { body: e.message, statusCode: 400 }
  } finally {
    await client.quit()
  }
}
export { bagHandler }
