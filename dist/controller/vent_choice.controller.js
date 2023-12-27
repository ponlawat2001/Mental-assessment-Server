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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const vent_choice_service_1 = require("../provider/vent_choice.service");
let VentChoiceController = class VentChoiceController {
    constructor(ventChoiceService) {
        this.ventChoiceService = ventChoiceService;
    }
    findOne(id) {
        return this.ventChoiceService.findOne(id);
    }
    findAll() {
        return this.ventChoiceService.findAll();
    }
    findCount() {
        return this.ventChoiceService.findCount();
    }
    create(body) {
        return this.ventChoiceService.create(body);
    }
    update(body, id) {
        return this.ventChoiceService.update(body, id);
    }
    delete(id) {
        return this.ventChoiceService.delete(id);
    }
};
__decorate([
    (0, common_1.Get)('findOne/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VentChoiceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('findAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VentChoiceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findCount'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VentChoiceController.prototype, "findCount", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VentChoiceController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VentChoiceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VentChoiceController.prototype, "delete", null);
VentChoiceController = __decorate([
    (0, common_1.Controller)('ventchoice'),
    __metadata("design:paramtypes", [vent_choice_service_1.default])
], VentChoiceController);
exports.default = VentChoiceController;
//# sourceMappingURL=vent_choice.controller.js.map