import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CourierSchema } from "./courier.model";
import { CouriersController } from "./couriers.controller";
import { CouriersService } from "./couriers.service";


@Module({
    imports: [MongooseModule.forFeature([{ name: 'Courier', schema: CourierSchema }])],
    controllers: [CouriersController],
    providers: [CouriersService]
})

export class CouriersModule { }