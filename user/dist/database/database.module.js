"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const database_service_1 = require("./database.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const config_service_1 = require("../config/config.service");
const typeorm_extension_1 = require("typeorm-extension");
const databaseProviders = [
    {
        provide: typeorm_1.Connection,
        useFactory: async (configService) => {
            const config = configService.get('database');
            const env = configService.get('env');
            await (0, typeorm_extension_1.createDatabase)({ ifNotExist: true }, {
                name: 'microservices',
                type: config.DB_TYPE,
                host: config.DB_HOST,
                port: config.DB_PORT,
                username: config.DB_USER,
                password: config.DB_PASSWORD,
                database: config.DB_NAME,
            });
            return await (0, typeorm_1.createConnection)({
                name: 'microservices',
                type: config.DB_TYPE,
                host: config.DB_HOST,
                port: config.DB_PORT,
                username: config.DB_USER,
                password: config.DB_PASSWORD,
                database: config.DB_NAME,
                entities: [__dirname + '/entities/*.entity{.ts,.js}'],
                migrations: [__dirname + '/migrations/*{.ts,.js}'],
                synchronize: true,
                logging: env === 'development',
            });
        },
        inject: [config_service_1.ConfigService],
    },
    database_service_1.DatabaseService,
    config_service_1.ConfigService,
];
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Module)({
        exports: databaseProviders,
        providers: databaseProviders,
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map