"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleOauthModule = void 0;
const common_1 = require("@nestjs/common");
const config_module_1 = require("../../config/config.module");
const google_oauth_controller_1 = require("./google-oauth.controller");
const google_oauth_strategy_1 = require("./google-oauth.strategy");
const google_oauth_service_1 = require("./google-oauth.service");
const user_repository_1 = require("../../database/repository/user.repository");
const microservices_1 = require("@nestjs/microservices");
const config_service_1 = require("../../config/config.service");
const typeorm_1 = require("typeorm");
const database_module_1 = require("../../database/database.module");
let GoogleOauthModule = class GoogleOauthModule {
};
GoogleOauthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.ConfigModule,
            database_module_1.DatabaseModule,
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
            ]),
        ],
        controllers: [google_oauth_controller_1.GoogleOauthController],
        providers: [
            google_oauth_strategy_1.GoogleOAuthStrategy,
            google_oauth_service_1.GoogleOauthService,
            {
                provide: user_repository_1.UserRepository,
                useFactory: (connection) => connection.getCustomRepository(user_repository_1.UserRepository),
                inject: [typeorm_1.Connection],
            },
        ],
    })
], GoogleOauthModule);
exports.GoogleOauthModule = GoogleOauthModule;
//# sourceMappingURL=google-oauth.module.js.map