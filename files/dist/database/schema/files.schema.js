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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesSchema = exports.Files = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Files = class Files {
};
__decorate([
    (0, mongoose_1.Prop)({ type: 'String' }),
    __metadata("design:type", String)
], Files.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: 'String' }),
    __metadata("design:type", String)
], Files.prototype, "link", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: 'Number' }),
    __metadata("design:type", Number)
], Files.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Files.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Files.prototype, "deletedAt", void 0);
Files = __decorate([
    (0, mongoose_1.Schema)()
], Files);
exports.Files = Files;
exports.FilesSchema = mongoose_1.SchemaFactory.createForClass(Files);
//# sourceMappingURL=files.schema.js.map