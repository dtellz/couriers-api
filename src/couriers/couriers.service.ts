import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Courier } from "./courier.model";
import { Model } from 'mongoose';

@Injectable()
export class CouriersService {
    constructor(@InjectModel('Courier') private readonly courierModel: Model<Courier>) { }

    /**
     * 
     * @param stuartID  The ID of a given courier over the StuartAPI
     * @param maxCapacity  That couriers' max capacity at the moment
     * @returns We send the result.id to the StuartAPI for easy future sync 
     */

    async insertCourier(stuartID: number, maxCapacity: number): Promise<string> {

        const newCourier = new this.courierModel({ stuart_id: stuartID, max_capacity: maxCapacity });
        const result = await newCourier.save();

        return result.id as string;
    }
    /**
     * 
     * @param maxCap max_capacity which needs to be exceeded to be a selected courier.
     * @returns Selected couriers full formated data as an object 
     */
    async getCouriersByCapacity(maxCap: number): Promise<object> {

        const couriers = await this.courierModel.find({ max_capacity: { $gte: maxCap } }).exec();
        if (couriers.length < 1) throw new NotFoundException('No Courier can accept capacity required');
        //Before returning database raw data I want to format it to a more human-logic look alike
        return this.formatCourierData(couriers);
    }
    /**
     * Updates the given courier with new max_capacity
     * @param stuartId Courier to update
     * @param maxCap New max_capacity
     */
    async updateCourierCapacity(stuartId: number, maxCap: number) {

        const updatedCourier = await this.findStuartCourier(stuartId);
        if (maxCap) updatedCourier.max_capacity = maxCap;
        updatedCourier.save();

    }
    /**
     * (Out of problem scope) Retrieves all couriers from the database
     * @returns formated array of all couriers.
     */
    async getCouriers(): Promise<object> {
        const couriers = await this.courierModel.find().exec();

        return this.formatCourierData(couriers);
    }
    /**
     * Deletes a Courier by its stuartAPI id
     * @param stuartId Courier id to delete
     */
    async deleteCourierById(stuartId: number) {
        await this.findStuartCourier(stuartId);
        const result = await this.courierModel.deleteOne({ stuart_id: stuartId });
        if (result.deletedCount !== 1) {
            throw new NotFoundException('Error')
        }
    }
    /**
     * This private method helps us find a courier on our database by the stuart_id field and in case there is no match it handles the response as 404 with an error msg.
     * @param stuartId 
     * @returns found courier or a handled error.
     */
    private async findStuartCourier(stuartId: number): Promise<Courier> {
        let courier: Courier;
        try {
            courier = await this.courierModel.findOne({ stuart_id: stuartId }).exec();
        } catch (error) {
            throw new NotFoundException('Could not find courier')
        }
        if (!courier) throw new NotFoundException('Could not find courier');
        return courier;
    }

    /**
     * Format raw data from an array of courier to a more convinient structure
     * @param couriers raw data
     * @returns formated data
     */
    private formatCourierData(couriers: Courier[]): object {
        return couriers.map((courier) => ({ id: courier.id, stuart_id: courier.stuart_id, max_capacity: courier.max_capacity }))
    }
}