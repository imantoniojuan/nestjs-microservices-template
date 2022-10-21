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
exports.TaskProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const config_service_1 = require("../config/config.service");
const path_1 = require("path");
const fs_1 = require("fs");
const aws_sdk_1 = require("aws-sdk");
const common_1 = require("@nestjs/common");
const _ = require("lodash");
var EmailTemplates;
(function (EmailTemplates) {
    EmailTemplates["FORGOT_PASSWORD"] = "forgot-password";
    EmailTemplates["POST_UPDATED"] = "post-updated";
})(EmailTemplates || (EmailTemplates = {}));
let TaskProcessor = class TaskProcessor {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger();
        this.emailService = new aws_sdk_1.SES(Object.assign({}, this.configService.get('aws')));
    }
    async senderHanlder(job) {
        try {
            let { template, payload } = job.data;
            template = EmailTemplates[template];
            const templatePath = (0, path_1.join)(__dirname, '../templates/', `${template}.html`);
            _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
            let _content = await this.readFilePromise(templatePath);
            const compiled = _.template(_content);
            _content = compiled(payload.data);
            this.emailService
                .sendEmail({
                Source: this.configService.get('sourceEmail'),
                Destination: {
                    ToAddresses: payload.emails,
                },
                Message: {
                    Body: {
                        Html: {
                            Charset: 'UTF-8',
                            Data: _content,
                        },
                    },
                    Subject: {
                        Charset: 'UTF-8',
                        Data: payload.subject,
                    },
                },
            })
                .promise()
                .catch((error) => this.logger.error(error));
        }
        catch (e) {
            this.logger.error(e);
        }
    }
    readFilePromise(filePath) {
        return new Promise((resolve, reject) => {
            (0, fs_1.readFile)(filePath, 'utf8', (err, html) => {
                if (!err) {
                    resolve(html);
                }
                else {
                    reject(err);
                }
            });
        });
    }
};
__decorate([
    (0, bull_1.Process)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskProcessor.prototype, "senderHanlder", null);
TaskProcessor = __decorate([
    (0, bull_1.Processor)('email-sender'),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], TaskProcessor);
exports.TaskProcessor = TaskProcessor;
//# sourceMappingURL=task.processor.js.map