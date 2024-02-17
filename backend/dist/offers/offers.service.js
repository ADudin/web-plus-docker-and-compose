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
exports.OffersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const offer_entity_1 = require("./entities/offer.entity");
const typeorm_2 = require("typeorm");
const wish_entity_1 = require("../wishes/entities/wish.entity");
let OffersService = class OffersService {
    constructor(offersRepository, wishRepository) {
        this.offersRepository = offersRepository;
        this.wishRepository = wishRepository;
    }
    async create(createOfferDto, user) {
        const offer = new offer_entity_1.Offer();
        const wish = await this.wishRepository.findOne({
            where: {
                id: createOfferDto.itemId,
            },
            relations: {
                owner: true,
            },
        });
        if (user.id === wish.owner.id) {
            throw new common_1.HttpException('Нельзя вносить деньги на собственные подарки', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (wish.price - wish.raised < createOfferDto.amount) {
            throw new common_1.HttpException('Сумма собранных средств не может превышать стоимость подарка', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const { itemId } = createOfferDto, rest = __rest(createOfferDto, ["itemId"]);
        Object.assign(offer, rest);
        offer.item = wish;
        offer.user = user;
        await this.offersRepository.save(offer);
        await this.wishRepository.increment({ id: wish.id }, 'raised', createOfferDto.amount);
        return {};
    }
    async findNotHiddenOffers() {
        return await this.offersRepository.find({
            where: {
                hidden: false,
            },
            relations: {
                item: true,
                user: true,
            },
        });
    }
    async findOne(offerId) {
        return await this.offersRepository.findOne({
            where: {
                id: offerId,
            },
            relations: {
                item: true,
                user: true,
            },
        });
    }
};
OffersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(offer_entity_1.Offer)),
    __param(1, (0, typeorm_1.InjectRepository)(wish_entity_1.Wish)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OffersService);
exports.OffersService = OffersService;
//# sourceMappingURL=offers.service.js.map