import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getServerUp(): string {
        return 'Server is up';
    }
}