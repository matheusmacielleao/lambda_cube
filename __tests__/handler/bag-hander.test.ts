import { CubeRepository } from "../../src/repository/cube-repository";
import {calcBag as sut} from  "../../src/handler/bag-handler"


describe('calcBag', () => {
    beforeEach(async () => {
        jest.resetAllMocks();
      });
    test('should calculate and create a bag', async () => {
        jest.spyOn(CubeRepository.prototype,'getAll').mockImplementationOnce(async () =>([{
            width: 10,
            height: 10,
            depth: 10,
            volume: 1000,
            cached: true
        },
        {
            width: 10,
            height: 11,
            depth: 11,
            volume: 1210,
            cached: true
        },
        {
            width: 10,
            height: 13,
            depth: 11,
            volume: 1430,
            cached: true
        }]))

        const response = await sut({body: JSON.stringify({number:3})});
        expect(response).toStrictEqual({
           statusCode: 201,
           body: JSON.stringify({
                width: 10,
                height: 13,
                depth: 28,
                volume: 3640,
                cubesStored: [
                    {
                        width: 10,
                        height: 10,
                        depth: 10,
                        volume: 1000,
                        cached: true
                    },
                    {
                        width: 10,
                        height: 11,
                        depth: 11,
                        volume: 1210,
                        cached: true
                    },
                    {
                        width: 10,
                        height: 13,
                        depth: 11,
                        volume: 1430,
                        cached: true
                    }
                ]
            })}
        )
    })
})