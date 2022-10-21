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
exports.GoogleOAuthStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const config_service_1 = require("../../config/config.service");
const { clientID, clientSecret, callbackURL } = new config_service_1.ConfigService().get('google');
let GoogleOAuthStrategy = class GoogleOAuthStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor() {
        super({
            clientID,
            clientSecret,
            callbackURL,
            scope: ['email', 'profile'],
        });
        this.validate = async (_accessToken, _refreshToken, profile) => {
            return profile;
        };
    }
};
GoogleOAuthStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GoogleOAuthStrategy);
exports.GoogleOAuthStrategy = GoogleOAuthStrategy;
//# sourceMappingURL=google-oauth.strategy.js.map