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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const rxjs_1 = require("rxjs");
const statusMessages = {
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    203: 'NonAuthoritativeInfo',
    204: 'NoContent',
    205: 'ResetContent',
    206: 'PartialContent',
};
let ResponseInterceptor = class ResponseInterceptor {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async intercept(context, next) {
        const body = await (0, rxjs_1.firstValueFrom)(next.handle());
        const request = context.switchToHttp().getRequest();
        const status = this.reflector.get('__httpCode__', context.getHandler()) ||
            (request.method === 'POST' ? 201 : 200);
        return (0, rxjs_1.of)({
            statusCode: status,
            message: statusMessages[status],
            data: body,
        });
    }
};
ResponseInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], ResponseInterceptor);
exports.ResponseInterceptor = ResponseInterceptor;
//# sourceMappingURL=response.interceptor.js.map