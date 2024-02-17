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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const hash_service_1 = require("../hash/hash.service");
const wish_entity_1 = require("../wishes/entities/wish.entity");
let UsersService = class UsersService {
    constructor(usersRepository, wishesRepository, hashService) {
        this.usersRepository = usersRepository;
        this.wishesRepository = wishesRepository;
        this.hashService = hashService;
    }
    async findUserInfo(key, param) {
        return await this.usersRepository.findOneBy({ [key]: param });
    }
    async findUserInfoWithPassword(username) {
        const user = await this.usersRepository
            .createQueryBuilder('user')
            .where('user.username = :username', { username })
            .addSelect(['user.password'])
            .getOne();
        if (!user) {
            throw new common_1.HttpException('Пользователь не найден', common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async findUserName(userName) {
        const user = await this.usersRepository.findOne({
            where: {
                username: userName,
            },
        });
        if (!user) {
            throw new common_1.HttpException('Пользователь не найден', common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async createUser(createUserDto) {
        const userName = await this.usersRepository.findOne({
            where: {
                username: createUserDto.username,
            },
        });
        const userEmail = await this.usersRepository.findOne({
            where: {
                email: createUserDto.email,
            },
        });
        if (userName !== null) {
            throw new common_1.HttpException('Пользователь с таким именем уже существует', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (userEmail !== null) {
            throw new common_1.HttpException('Пользователь с таким адресом электронной почты уже существует', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        createUserDto.password = this.hashService.getHash(createUserDto === null || createUserDto === void 0 ? void 0 : createUserDto.password);
        const user = this.usersRepository.create(createUserDto);
        return await this.usersRepository.save(user);
    }
    async updateUser(userId, updateUserDto) {
        const usersWithSameUsername = await this.usersRepository.find({
            where: {
                username: updateUserDto.username,
            },
        });
        for (const user of usersWithSameUsername) {
            if (user.username === updateUserDto.username && user.id !== userId) {
                throw new common_1.HttpException('Пользователь с таким именем уже существует', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
        }
        const usersWithSameEmail = await this.usersRepository.find({
            where: {
                email: updateUserDto.email,
            },
        });
        for (const user of usersWithSameEmail) {
            if (user.email === updateUserDto.email && user.id !== userId) {
                throw new common_1.HttpException('Пользователь с таким адресом электронной почты уже существует', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
        }
        if (updateUserDto.password) {
            updateUserDto.password = this.hashService.getHash(updateUserDto.password);
        }
        const currentUser = await this.findUserInfo('id', userId);
        Object.assign(currentUser, updateUserDto);
        return await this.usersRepository.save(currentUser);
    }
    async findOwnWishes(userId) {
        return await this.wishesRepository.findBy({
            owner: { id: userId },
        });
    }
    async findWishesByUsername(username) {
        return await this.wishesRepository.findBy({
            owner: { username: username },
        });
    }
    async findMany(query) {
        return await this.usersRepository.findBy([
            { username: (0, typeorm_1.Like)(`%${query}%`) },
            { email: (0, typeorm_1.Like)(`%${query}%`) },
        ]);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_2.InjectRepository)(wish_entity_1.Wish)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        hash_service_1.HashService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map