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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const wishlist_entity_1 = require("./entities/wishlist.entity");
const typeorm_2 = require("typeorm");
const wish_entity_1 = require("../wishes/entities/wish.entity");
let WishlistsService = class WishlistsService {
    constructor(wishlistsRepository, wishesRepository) {
        this.wishlistsRepository = wishlistsRepository;
        this.wishesRepository = wishesRepository;
    }
    async findAll(userId) {
        return await this.wishlistsRepository.find({
            where: {
                owner: {
                    id: userId,
                },
            },
            relations: {
                items: true,
                owner: true,
            },
        });
    }
    async findOne(id) {
        const wishlist = await this.wishlistsRepository.findOne({
            where: {
                id,
            },
            relations: {
                items: true,
                owner: true,
            },
        });
        if (!wishlist) {
            throw new common_1.BadRequestException('Список подарков не найден');
        }
        return wishlist;
    }
    async create(createWishlistDto, user) {
        const { name, image, itemsId } = createWishlistDto;
        const wishes = await this.wishesRepository.findBy({ id: (0, typeorm_2.In)(itemsId) });
        return this.wishlistsRepository.save({
            name,
            image,
            items: wishes,
            owner: user,
        });
    }
    async update(wishlistId, updateWishlistDto, user) {
        const { itemsId } = updateWishlistDto, wishlist = __rest(updateWishlistDto, ["itemsId"]);
        const wishlistToUpdate = await this.findOne(wishlistId);
        if (!itemsId) {
            const wishes = wishlistToUpdate.items;
            console.log(wishes);
            wishlist['items'] = wishes;
        }
        if (wishlistToUpdate.owner.id !== user.id) {
            throw new common_1.HttpException('Список подарков принадлежит другому пользователю', common_1.HttpStatus.FORBIDDEN);
        }
        await this.wishlistsRepository.update({ id: wishlistId, owner: { id: user.id } }, wishlist);
        return this.findOne(wishlistId);
    }
    async removeOne(wishlistId, user) {
        const wishlistToRemove = await this.findOne(wishlistId);
        if (wishlistToRemove.owner.id !== user.id) {
            throw new common_1.HttpException('Список подарков принадлежит другому пользователю', common_1.HttpStatus.FORBIDDEN);
        }
        await this.wishlistsRepository.delete(wishlistId);
        return wishlistToRemove;
    }
};
WishlistsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wishlist_entity_1.Wishlist)),
    __param(1, (0, typeorm_1.InjectRepository)(wish_entity_1.Wish)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], WishlistsService);
exports.WishlistsService = WishlistsService;
//# sourceMappingURL=wishlists.service.js.map