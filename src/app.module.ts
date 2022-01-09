import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CouriersModule } from './couriers/couriers.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import * as db from '../secrets.json';


@Module({
  imports: [CouriersModule, MongooseModule.forRoot(db.key)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
