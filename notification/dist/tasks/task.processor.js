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
const firebase = require("firebase-admin");
const path = require("path");
let TaskProcessor = class TaskProcessor {
    constructor() {
        firebase.initializeApp({
            credential: firebase.credential.cert(path.join(__dirname, '..', '..', 'firebase.config.json')),
        });
    }
    handleNotification(data) {
        const { token, content, payload } = data;
        this.sendMessage(token, content, payload)
            .then(() => {
            this.logger.log('Notificaiton sent successfully');
        })
            .catch((e) => {
            this.logger.error('Notification failed', e);
        });
    }
    sendMessage(token, message, payload) {
        return firebase.messaging().send({
            token,
            notification: {
                body: message,
            },
            data: payload,
        });
    }
    async multiCastMessage(tokens, message, payload) {
        return firebase.messaging().sendMulticast({
            tokens,
            notification: {
                body: message,
            },
            data: payload,
        });
    }
};
__decorate([
    (0, bull_1.Process)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TaskProcessor.prototype, "handleNotification", null);
TaskProcessor = __decorate([
    (0, bull_1.Processor)('email-sender'),
    __metadata("design:paramtypes", [])
], TaskProcessor);
exports.TaskProcessor = TaskProcessor;
//# sourceMappingURL=task.processor.js.map