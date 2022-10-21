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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./database/repository/user.repository");
const token_repository_1 = require("./database/repository/token.repository");
const bcrypt_1 = require("bcrypt");
const user_entity_1 = require("./database/entities/user.entity");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const nanoid_1 = require("nanoid");
const entities_1 = require("./database/entities");
const config_service_1 = require("./config/config.service");
const moment = require("moment");
let AppService = class AppService {
    constructor(tokenClient, mailClient, userRepository, tokenRepository, configService) {
        this.tokenClient = tokenClient;
        this.mailClient = mailClient;
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.configService = configService;
        this.tokenClient.connect();
        this.mailClient.connect();
    }
    getUserById(userId) {
        return this.userRepository.findOne(userId);
    }
    createHash(password) {
        return (0, bcrypt_1.hashSync)(password, 10);
    }
    compare(password, hash) {
        return (0, bcrypt_1.compareSync)(hash, password);
    }
    async getDeviceById(userId) {
        const user = await this.userRepository.findOne(userId);
        return user.deviceToken;
    }
    async getForgotPasswordToken(authUserId) {
        try {
            const user = await this.userRepository.findOne({ id: authUserId });
            if (!user) {
                throw new common_1.HttpException('USER_NOT_FOUND', common_1.HttpStatus.NOT_FOUND);
            }
            const token = (0, nanoid_1.nanoid)(10);
            const newToken = new entities_1.Token();
            newToken.forgotToken = token;
            newToken.status = entities_1.Status.Active;
            newToken.user = user;
            const gen_token = await this.tokenRepository.save(newToken);
            delete gen_token.user.password;
            return gen_token;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async changePassword(data, authUserId) {
        try {
            const { newPassword, token } = data;
            const user = await this.userRepository.findOne({ id: authUserId });
            if (!user) {
                throw new common_1.HttpException('USER_NOT_FOUND', common_1.HttpStatus.NOT_FOUND);
            }
            const getActiveToken = await this.tokenRepository.findOne({
                user: { id: authUserId },
                status: entities_1.Status.Active,
                forgotToken: token,
            });
            if (!getActiveToken) {
                throw new common_1.HttpException('ACTIVE_TOKEN_NOT_FOUND', common_1.HttpStatus.BAD_REQUEST);
            }
            const addExp = moment().add(Number(this.configService.get('tokenExp')), 'second');
            if (moment(getActiveToken.createdAt).isAfter(addExp)) {
                throw new common_1.HttpException('FORGOT_TOKEN_EXPIRED', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const hashPassword = this.createHash(newPassword);
            await this.userRepository.update({ id: authUserId }, { password: hashPassword });
            await this.tokenRepository.update({ id: getActiveToken.id }, { status: entities_1.Status.Archived });
            const payload = {
                template: 'FORGOT_PASSWORD',
                payload: {
                    emails: [user.email],
                    data: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                    },
                    subject: 'Forgot Password',
                },
            };
            this.mailClient.emit('send_email', payload);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async login(data) {
        try {
            const { email, password } = data;
            const checkUser = await this.userRepository.findUserAccountByEmail(email);
            if (!checkUser) {
                throw new common_1.HttpException('USER_NOT_FOUND', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (this.compare(password, checkUser.password)) {
                throw new common_1.HttpException('INVALID_PASSWORD', common_1.HttpStatus.CONFLICT);
            }
            const createTokenResponse = await (0, rxjs_1.firstValueFrom)(this.tokenClient.send('token_create', {
                id: checkUser.id,
            }));
            delete checkUser.password;
            return Object.assign(Object.assign({}, createTokenResponse), { user: checkUser });
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async signup(data) {
        try {
            const { email, password, firstname, lastname } = data;
            const checkUser = await this.userRepository.findUserAccountByEmail(email);
            if (checkUser) {
                throw new common_1.HttpException('USER_EXISTS', common_1.HttpStatus.CONFLICT);
            }
            const hashPassword = this.createHash(password);
            const newUser = new user_entity_1.User();
            newUser.email = data.email;
            newUser.password = hashPassword;
            newUser.firstName = firstname.trim();
            newUser.lastName = lastname.trim();
            newUser.role = entities_1.Role.USER;
            const user = await this.userRepository.save(newUser);
            const createTokenResponse = await (0, rxjs_1.firstValueFrom)(this.tokenClient.send('token_create', JSON.stringify(user)));
            delete user.password;
            return Object.assign(Object.assign({}, createTokenResponse), { user });
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('TOKEN_SERVICE')),
    __param(1, (0, common_1.Inject)('MAIL_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object, user_repository_1.UserRepository,
        token_repository_1.TokenRepository,
        config_service_1.ConfigService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map