"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_module_1 = require("./config/config.module");
const config_service_1 = require("./config/config.service");
const auth_guard_1 = require("./core/guards/auth.guard");
const notification_schema_1 = require("./database/schema/notification.schema");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.ConfigModule,
            bull_1.BullModule.forRootAsync({
                imports: [config_module_1.ConfigModule],
                useFactory: (configService) => ({
                    redis: {
                        host: configService.get('redis_host'),
                        port: configService.get('redis_port'),
                    },
                }),
                inject: [config_service_1.ConfigService],
            }),
            bull_1.BullModule.registerQueue({
                name: 'notification-sender',
            }),
            microservices_1.ClientsModule.registerAsync([
                {
                    name: 'TOKEN_SERVICE',
                    imports: [config_module_1.ConfigModule],
                    useFactory: async (configService) => ({
                        transport: microservices_1.Transport.RMQ,
                        options: {
                            urls: [`${configService.get('rb_url')}`],
                            queue: `${configService.get('token_queue')}`,
                            queueOptions: {
                                durable: false,
                            },
                        },
                    }),
                    inject: [config_service_1.ConfigService],
                },
                {
                    name: 'USER_SERVICE',
                    imports: [config_module_1.ConfigModule],
                    useFactory: async (configService) => ({
                        transport: microservices_1.Transport.RMQ,
                        options: {
                            urls: [`${configService.get('rb_url')}`],
                            queue: `${configService.get('user_queue')}`,
                            queueOptions: {
                                durable: false,
                            },
                        },
                    }),
                    inject: [config_service_1.ConfigService],
                },
            ]),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_module_1.ConfigModule],
                useFactory: (configService) => ({
                    uri: configService.get('database_uri'),
                    useUnifiedTopology: true,
                    dbName: 'nest-notification',
                }),
                inject: [config_service_1.ConfigService],
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: notification_schema_1.Notification.name, schema: notification_schema_1.NotificationSchema },
            ]),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.ClientAuthGuard,
            },
            app_service_1.AppService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map