import { Controller, Post, Get, Body, Query, Param, Patch, Delete } from "@nestjs/common";
import { CouriersService } from "./couriers.service";


@Controller('couriers')
export class CouriersController {
    constructor(private readonly couriersService: CouriersService) { }

    @Post()
    async addCourier(
        @Body('stuart_id') stuartId: number,
        @Body('max_capacity') maxCap: number) {
        const generatedId = await this.couriersService.insertCourier(stuartId, maxCap);
        return { id: generatedId }
    }
    @Get()
    async getAllCouriers() {
        const couriers = await this.couriersService.getCouriers();
        return couriers;
    }
    @Patch(':id')
    async updateCourier(
        @Param('id') stuartId: number,
        @Body('max_capacity') maxCap: number) {
        await this.couriersService.updateCourierCapacity(stuartId, maxCap);
        return { updated: true };
    }
    @Delete(':id')
    async deleteCourier(
        @Param('id') stuartId: number) {
        await this.couriersService.deleteCourierById(stuartId);
        return { deleted: true };
    }

    @Get('lookup')
    async getCouriersByCapacity(
        @Query('capacity_required') courierCapacity: number) {
        const couriers = await this.couriersService.getCouriersByCapacity(courierCapacity);
        return couriers;
    }


}