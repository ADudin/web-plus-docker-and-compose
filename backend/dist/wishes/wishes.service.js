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
exports.WishesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const wish_entity_1 = require("./entities/wish.entity");
const typeorm_2 = require("typeorm");
let WishesService = class WishesService {
    constructor(wishesRepository) {
        this.wishesRepository = wishesRepository;
    }
    async create(createWishDto, owner) {
        const wish = new wish_entity_1.Wish();
        Object.assign(wish, createWishDto);
        wish.owner = owner;
        await this.wishesRepository.save(wish);
        return {};
    }
    async findLast() {
        return await this.wishesRepository.find({
            order: { createdAt: 'DESC' },
            take: 40,
        });
    }
    async findTop() {
        return await this.wishesRepository.find({
            order: { copied: 'DESC' },
            take: 20,
        });
    }
    async findOne(id) {
        const wish = await this.wishesRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                owner: true,
                offers: true,
            },
        });
        if (!wish) {
            throw new common_1.HttpException('Подарок не найден', common_1.HttpStatus.BAD_REQUEST);
        }
        return wish;
    }
    async updateOne(id, updateWishDto, user) {
        const wish = await this.findOne(id);
        if (wish.owner.id !== user.id) {
            throw new common_1.HttpException('Подарок принадлежит другому пользователю', common_1.HttpStatus.FORBIDDEN);
        }
        if (wish.raised != 0.0) {
            throw new common_1.HttpException('Нельзя изменить данные о подарке, который поддержали другие пользователи', common_1.HttpStatus.FORBIDDEN);
        }
        await this.wishesRepository.update(id, updateWishDto);
        return {};
    }
    async removeOne(id, user) {
        const wishToRemove = await this.findOne(id);
        if (wishToRemove.owner.id !== user.id) {
            throw new common_1.HttpException('Подарок принадлежит другому пользователю', common_1.HttpStatus.FORBIDDEN);
        }
        if (wishToRemove.raised != 0.0) {
            throw new common_1.HttpException('Нельзя удалить подарок, который поддержали другие пользователи', common_1.HttpStatus.FORBIDDEN);
        }
        await this.wishesRepository.delete(id);
        return wishToRemove;
    }
    async copyById(wishId, user) {
        const wishToCopy = await this.wishesRepository.findOne({
            where: { id: wishId },
            relations: { owner: true },
        });
        if (user.id === wishToCopy.owner.id) {
            throw new common_1.HttpException('Нельзя копировать свой подарок', common_1.HttpStatus.FORBIDDEN);
        }
        const createWishDto = {
            name: wishToCopy.name,
            link: wishToCopy.link,
            image: wishToCopy.image,
            price: wishToCopy.price,
            description: wishToCopy.description,
        };
        await this.create(createWishDto, user);
        await this.wishesRepository.increment({ id: wishId }, 'copied', 1);
        return {};
    }
};
WishesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wish_entity_1.Wish)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WishesService);
exports.WishesService = WishesService;
//# sourceMappingURL=wishes.service.js.map