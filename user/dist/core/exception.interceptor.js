"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const src_1 = require("@squareboat/nestjs-localization/dist/src");
let AllExceptionsFilter = class AllExceptionsFilter {
    async catch(exception, host) {
        const ctx = host.switchToHttp();
        const context = host.switchToHttp();
        const response = context.getResponse();
        const request = ctx.getRequest();
        const statusCode = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = exception.message;
        if (message) {
            const lang = request.headers['accept-language'] || 'en';
            const trans_message = (0, src_1.__)(message, lang);
            if (message.includes('ERROR')) {
                message = exception.message;
            }
            else {
                message = trans_message;
            }
        }
        else {
            message = 'Internal server error';
        }
        response.status(statusCode).json({
            statusCode,
            message,
        });
    }
};
AllExceptionsFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
//# sourceMappingURL=exception.interceptor.js.map