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
exports.GoogleOauthService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const role_entity_1 = require("../../database/entities/role.entity");
const user_entity_1 = require("../../database/entities/user.entity");
const user_repository_1 = require("../../database/repository/user.repository");
let GoogleOauthService = class GoogleOauthService {
    constructor(userRepository, tokenClient) {
        this.userRepository = userRepository;
        this.tokenClient = tokenClient;
        tokenClient.connect();
    }
    async loginUser(userInfo) {
        var _a;
        const userEmail = (_a = userInfo === null || userInfo === void 0 ? void 0 : userInfo.emails[0]) === null || _a === void 0 ? void 0 : _a.value;
        const checkUser = await this.userRepository.findOne({ email: userEmail });
        if (checkUser) {
            throw new common_1.HttpException('USER_EXISTS', common_1.HttpStatus.CONFLICT);
        }
        const newUser = new user_entity_1.User();
        newUser.email = userEmail;
        newUser.firstName = userInfo.name.givenName;
        newUser.lastName = userInfo.name.familyName;
        newUser.role = role_entity_1.Role.USER;
        const user = await this.userRepository.save(newUser);
        const createTokenResponse = await (0, rxjs_1.firstValueFrom)(this.tokenClient.send('token_create', JSON.stringify(user)));
        delete user.password;
        return Object.assign(Object.assign({}, createTokenResponse), { user });
    }
};
GoogleOauthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('TOKEN_SERVICE')),
    __metadata("design:paramtypes", [user_repository_1.UserRepository, typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], GoogleOauthService);
exports.GoogleOauthService = GoogleOauthService;
//# sourceMappingURL=google-oauth.service.js.map