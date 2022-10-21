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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const dtos_1 = require("./core/dtos");
const user_decorator_1 = require("./core/user.decorator");
const microservices_1 = require("@nestjs/microservices");
const allow_unauthorized_decorator_1 = require("./core/allow.unauthorized.decorator");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async getUserById(data) {
        return this.appService.getUserById(data.userId);
    }
    async getDeviceById(data) {
        return this.appService.getDeviceById(data.userId);
    }
    login(data) {
        return this.appService.login(data);
    }
    signup(data) {
        return this.appService.signup(data);
    }
    getForgotPassword(auth) {
        return this.appService.getForgotPasswordToken(auth);
    }
    changePassword(data, auth) {
        return this.appService.changePassword(data, auth);
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('get_user_by_id'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], AppController.prototype, "getUserById", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_device_id'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], AppController.prototype, "getDeviceById", null);
__decorate([
    (0, allow_unauthorized_decorator_1.AllowUnauthorizedRequest)(),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.LoginDto]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AppController.prototype, "login", null);
__decorate([
    (0, allow_unauthorized_decorator_1.AllowUnauthorizedRequest)(),
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateUserDto]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AppController.prototype, "signup", null);
__decorate([
    (0, common_1.Get)('/forgot-password'),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AppController.prototype, "getForgotPassword", null);
__decorate([
    (0, common_1.Put)('/change-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.ForgotPasswordDto, Number]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AppController.prototype, "changePassword", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map