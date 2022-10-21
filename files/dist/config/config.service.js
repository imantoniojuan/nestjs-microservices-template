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
        this.config.rb_url = process.env.RABBITMQ_URL;
        this.config.servicePort = process.env.FILES_PORT;
        this.config.database_uri = process.env.FILES_MONGO_URI;
        this.config.presignExpire = process.env.AWS_EXPIRE_LINK;
        this.config.bucket = process.env.AWS_BUCKET;
        this.config.files_queue = process.env.RABBITMQ_FILES_QUEUE;
        this.config.token_queue = process.env.RABBITMQ_TOKEN_QUEUE;
        this.config.env = process.env.NODE_ENV;
        this.config.aws = {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
            region: process.env.AWS_REGION,
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