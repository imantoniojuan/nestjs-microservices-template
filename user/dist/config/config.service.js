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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const common_1 = require("@nestjs/common");
let ConfigService = class ConfigService {
    constructor() {
        this.config = {};
        this.config.servicePort = process.env.USER_PORT;
        this.config.service = process.env.USER_HOST;
        this.config.rb_url = process.env.RABBITMQ_URL;
        this.config.token_queue = process.env.RABBITMQ_TOKEN_QUEUE;
        this.config.user_queue = process.env.RABBITMQ_USER_QUEUE;
        this.config.mailer_queue = process.env.RABBITMQ_MAILER_QUEUE;
        this.config.logger_queue = process.env.RABBITMQ_LOGGER_QUEUE;
        this.config.env = process.env.NODE_ENV;
        this.config.database = {
            DB_TYPE: process.env.USER_DB_TYPE,
            DB_HOST: process.env.USER_DB_HOST,
            DB_PORT: process.env.USER_DB_PORT,
            DB_USER: process.env.USER_DB_USER,
            DB_PASSWORD: process.env.USER_DB_PASSWORD,
            DB_NAME: process.env.USER_DB_NAME,
        };
        this.config.google = {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        };
    }
    get(key) {
        return this.config[key];
    }
};
ConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ConfigService);
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map