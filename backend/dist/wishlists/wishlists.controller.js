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
exports.WishlistsController = void 0;
const common_1 = require("@nestjs/common");
const wishlists_service_1 = require("./wishlists.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const createWishlist_dto_1 = require("./dto/createWishlist.dto");
const updateWishlist_dto_1 = require("./dto/updateWishlist.dto");
let WishlistsController = class WishlistsController {
    constructor(wishlistsService) {
        this.wishlistsService = wishlistsService;
    }
    async getUserWishlists(req) {
        return this.wishlistsService.findAll(req.user.id);
    }
    async createWishlist(createWishlistDto, req) {
        return this.wishlistsService.create(createWishlistDto, req.user);
    }
    async getWishlistById(id) {
        return this.wishlistsService.findOne(id);
    }
    async updateWishlist(id, updateWishlistDto, req) {
        return this.wishlistsService.update(id, updateWishlistDto, req.user);
    }
    async removeWishlist(id, req) {
        return this.wishlistsService.removeOne(id, req.user);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WishlistsController.prototype, "getUserWishlists", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createWishlist_dto_1.CreateWishlistDto, Object]),
    __metadata("design:returntype", Promise)
], WishlistsController.prototype, "createWishlist", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WishlistsController.prototype, "getWishlistById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateWishlist_dto_1.UpdateWishlistDto, Object]),
    __metadata("design:returntype", Promise)
], WishlistsController.prototype, "updateWishlist", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], WishlistsController.prototype, "removeWishlist", null);
WishlistsController = __decorate([
    (0, common_1.Controller)('wishlistlists'),
    __metadata("design:paramtypes", [wishlists_service_1.WishlistsService])
], WishlistsController);
exports.WishlistsController = WishlistsController;
//# sourceMappingURL=wishlists.controller.js.map