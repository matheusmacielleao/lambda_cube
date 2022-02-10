import CubeDto from '../../interface/cube/cube-dto'

const cubeValidation = (body : CubeDto) => {
  const idealCube :Record<string, {required:boolean}> = {
    width: { required: true },
    height: { required: true },
    depth: { required: true }
  }

  const bodyCube :Record<string, number> = {
    width: body.width,
    height: body.height,
    depth: body.depth
  }

  return Object.keys(idealCube).forEach((value) => {
    const param = idealCube[value]
    if (param.required && !bodyCube[value]) {
      throw new Error(`${value} is required`)
    }
    if (typeof bodyCube[value] !== 'number') {
      throw new Error(`${value} must be a number`)
    }
    if (bodyCube[value] <= 0) {
      throw new Error(`${value} must be bigger than 0`)
    }
  })
}

export { cubeValidation }
