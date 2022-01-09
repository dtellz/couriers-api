import * as mongoose from 'mongoose';

//Mongoose needs javascript types insted of typescript ones.
export const CourierSchema = new mongoose.Schema({
    stuart_id: { type: Number, required: true },
    max_capacity: { type: Number, required: true }
})

export interface Courier extends mongoose.Document {
    id: string,
    stuart_id: number,
    max_capacity: number
}