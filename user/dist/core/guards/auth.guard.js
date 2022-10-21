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
exports.ClientAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
let ClientAuthGuard = class ClientAuthGuard {
    constructor(client) {
        this.client = client;
        this.exlcudeRequests = [
            '/login',
            '/signup',
            '/google-oauth',
            '/google-oauth/redirect',
        ];
    }
    async canActivate(context) {
        try {
            const request = context.getArgByIndex(0);
            if (this.exlcudeRequests.includes(request.url.split('?')[0])) {
                return true;
            }
            const Authorization = request.headers['authorization'];
            if (!Authorization) {
                throw new common_1.UnauthorizedException();
            }
            const token = Authorization.replace('Bearer ', '');
            await this.client.connect();
            const decode = await (0, rxjs_1.firstValueFrom)(this.client.send('token_decode', token));
            if (!decode) {
                throw new common_1.UnauthorizedException();
            }
            console.log(decode);
            request.userId = decode.userId;
            return true;
        }
        catch (e) {
            return false;
        }
    }
};
ClientAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('TOKEN_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], ClientAuthGuard);
exports.ClientAuthGuard = ClientAuthGuard;
//# sourceMappingURL=auth.guard.js.map