import { AppService } from './app.service';
import { GetNotificationDto } from './core/dtos';
import { INotificationPayload } from './core/interfaces/INotificationPayload';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    sendNotification(payload: INotificationPayload): void;
    getNotifications(authUserId: number, data: GetNotificationDto): void;
}
