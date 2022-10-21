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
exports.GoogleOauthController = void 0;
const common_1 = require("@nestjs/common");
const google_oauth_guard_1 = require("./google-oauth.guard");
const express_1 = require("express");
const allow_unauthorized_decorator_1 = require("../../core/allow.unauthorized.decorator");
const google_oauth_service_1 = require("./google-oauth.service");
const swagger_1 = require("@nestjs/swagger");
let GoogleOauthController = class GoogleOauthController {
    constructor(googleOauthService) {
        this.googleOauthService = googleOauthService;
    }
    async googleLogin() {
    }
    async googleLoginCallback(req) {
        return await this.googleOauthService.loginUser(req.user);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'To get google login html page' }),
    (0, allow_unauthorized_decorator_1.AllowUnauthorizedRequest)(),
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GoogleOauthController.prototype, "googleLogin", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Callback API fired by google on successfull authentication',
    }),
    (0, allow_unauthorized_decorator_1.AllowUnauthorizedRequest)(),
    (0, common_1.Get)('/redirect'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], GoogleOauthController.prototype, "googleLoginCallback", null);
GoogleOauthController = __decorate([
    (0, swagger_1.ApiTags)('Google Oauth Login'),
    (0, common_1.Controller)('google-oauth'),
    (0, common_1.UseGuards)(google_oauth_guard_1.GoogleOauthGuard),
    __metadata("design:paramtypes", [google_oauth_service_1.GoogleOauthService])
], GoogleOauthController);
exports.GoogleOauthController = GoogleOauthController;
//# sourceMappingURL=google-oauth.controller.js.map