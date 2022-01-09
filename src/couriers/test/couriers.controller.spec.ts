import { Test } from '@nestjs/testing';
import { CouriersController } from '../couriers.controller';
import { CouriersService } from '../couriers.service';


describe('CouriersController', () => {
    let controller: CouriersController;
    const mockCouriersService = {
        getCouriers: jest.fn(() => {
            return Promise.resolve({})
        }),
        insertCourier: jest.fn((id, cap) => {
            return Promise.resolve('')
        }),
        getCouriersByCapacity: jest.fn((cap) => {
            return Promise.resolve({})
        }),
        updateCourierCapacity: jest.fn((id, cap) => { }),
        deleteCourierById: jest.fn(() => { })
    }

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [CouriersController],
            providers: [CouriersService],
        }).overrideProvider(CouriersService).useValue(mockCouriersService).compile();

        controller = moduleRef.get<CouriersController>(CouriersController);
    });
    /**
     * controller.addCourier()
     */
    describe('addCourier', () => {
        it('should create a new courier', async () => {

            const result = 'test';

            jest.spyOn(mockCouriersService, 'insertCourier').mockImplementation((): Promise<string> => {
                return Promise.resolve(result);
            });

            expect(await controller.addCourier(123, 123)).toStrictEqual({ "id": result });
        });
    });
    /**
     * controller.getAllCouriers()
     */
    describe('getAllCouriers', () => {
        it('should return an array of couriers', async () => {
            const result = ['test'];

            jest.spyOn(mockCouriersService, 'getCouriers').mockImplementation((): Promise<object> => {
                return Promise.resolve(result)
            });

            expect(await controller.getAllCouriers()).toBe(result);
        });
    });
    /**
     * controller.getCouriersByCapacity()
     */
    describe('getCouriersByCapacity', () => {

        it('should return an array of couriers', async () => {
            const result = ['test'];

            jest.spyOn(mockCouriersService, 'getCouriersByCapacity').mockImplementation((cap): Promise<object> => {
                return Promise.resolve(result);
            })

            expect(await controller.getCouriersByCapacity(123)).toBe(result);
        })
    });
    /**
     * controller.updateCourier()
     */
    describe('updateCourier', () => {
        it('should update an existing courier', async () => {
            const result = true;

            jest.spyOn(mockCouriersService, 'updateCourierCapacity').mockImplementation((): Promise<boolean> => {
                return Promise.resolve(result)
            });

            expect(await controller.updateCourier(123, 123)).toStrictEqual({ "updated": result })
        })
    })
    /**
     * controller.deleteCourier()
     */
    describe('deleteCourier', () => {
        it('should delete an existing courier', async () => {
            const result = true;

            jest.spyOn(mockCouriersService, 'deleteCourierById').mockImplementation((): Promise<boolean> => {
                return Promise.resolve(result)
            });

            expect(await controller.deleteCourier(123)).toStrictEqual({ "deleted": result })
        })
    })

});



