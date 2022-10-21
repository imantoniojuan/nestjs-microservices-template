"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const bull_2 = require("bull");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const notification_schema_1 = require("./database/schema/notification.schema");
const rxjs_1 = require("rxjs");
const microservices_1 = require("@nestjs/microservices");
let AppService = class AppService {
    constructor(taskQueue, notificationModel, userClient) {
        this.taskQueue = taskQueue;
        this.notificationModel = notificationModel;
        this.userClient = userClient;
        this.userClient.connect();
    }
    async manageNotifications(data) {
        const { content, type, payload, userId } = data;
        await this.notificationModel.create({
            user: userId,
            content,
            type,
            payload,
        });
        const deviceId = await (0, rxjs_1.firstValueFrom)(this.userClient.send('get_device_id', { userId }));
        this.taskQueue.add(Object.assign({ token: deviceId }, data), { backoff: 3 });
    }
    async getUserNotifications(userId, skip, limit) {
        return this.notificationModel.aggregate([
            {
                $match: {
                    user: userId,
                },
            },
            {
                $skip: skip,
            },
            {
                $limit: limit,
            },
        ]);
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)('notification-sender')),
    __param(1, (0, mongoose_2.InjectModel)(notification_schema_1.Notification.name)),
    __param(2, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof bull_2.Queue !== "undefined" && bull_2.Queue) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object, typeof (_c = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _c : Object])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map