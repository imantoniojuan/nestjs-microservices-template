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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const files_schema_1 = require("./database/schema/files.schema");
const aws_sdk_1 = require("aws-sdk");
const config_service_1 = require("./config/config.service");
let AppService = class AppService {
    constructor(filesModel, configService) {
        this.filesModel = filesModel;
        this.configService = configService;
        this.fileService = new aws_sdk_1.S3(Object.assign({}, this.configService.get('aws')));
    }
    async getPresgin(params, authUserId) {
        try {
            const url = await this.fileService.getSignedUrlPromise('putObject', {
                Bucket: this.configService.get('bucket'),
                Key: `${params.type}/${params.fileName}`,
                Expires: Number(this.configService.get('presignExpire')),
            });
            await this.filesModel.create({
                name: params.fileName,
                link: `${params.type}/${params.fileName}`,
                createdAt: new Date(),
                user: authUserId,
            });
            return {
                url,
            };
        }
        catch (e) {
            this.logger.error(e);
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(files_schema_1.Files.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, config_service_1.ConfigService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map