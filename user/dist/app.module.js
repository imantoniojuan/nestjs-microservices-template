"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./database/database.module");
const config_module_1 = require("./config/config.module");
const user_repository_1 = require("./database/repository/user.repository");
const typeorm_1 = require("typeorm");
const microservices_1 = require("@nestjs/microservices");
const config_service_1 = require("./config/config.service");
const token_repository_1 = require("./database/repository/token.repository");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("./core/guards/auth.guard");
const exception_interceptor_1 = require("./core/exception.interceptor");
const src_1 = require("@squareboat/nestjs-localization/dist/src");
const path = require("path");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            config_module_1.ConfigModule,
            src_1.LocalizationModule.register({
                path: path.join(__dirname, '/locales/'),
                fallbackLang: 'en',
            }),
            microservices_1.ClientsModule.registerAsync([
                {
                    name: 'TOKEN_SERVICE',
                    imports: [config_module_1.ConfigModule],
                    useFactory: (configService) => ({
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
                    name: 'MAIL_SERVICE',
                    imports: [config_module_1.ConfigModule],
                    useFactory: (configService) => ({
                        transport: microservices_1.Transport.RMQ,
                        options: {
                            urls: [`${configService.get('rb_url')}`],
                            queue: `${configService.get('mailer_queue')}`,
                            queueOptions: {
                                durable: false,
                            },
                        },
                    }),
                    inject: [config_service_1.ConfigService],
                },
            ]),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            { provide: core_1.APP_FILTER, useClass: exception_interceptor_1.AllExceptionsFilter },
            app_service_1.AppService,
            {
                provide: user_repository_1.UserRepository,
                useFactory: (connection) => connection.getCustomRepository(user_repository_1.UserRepository),
                inject: [typeorm_1.Connection],
            },
            {
                provide: token_repository_1.TokenRepository,
                useFactory: (connection) => connection.getCustomRepository(token_repository_1.TokenRepository),
                inject: [typeorm_1.Connection],
            },
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.ClientAuthGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map