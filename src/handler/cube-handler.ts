import { CubeService } from '../service/cube-service'
const cubeHandler = async (event: any) => {
  const cubeService = new CubeService()
  try {
    const result = await cubeService.set(event)
    return { body: JSON.stringify(result), statusCode: 201 }
  } catch (e : any) {
    return { body: e.message, statusCode: 400 }
  } finally {
    await cubeService.disconnect()
  }
}
export { cubeHandler }
