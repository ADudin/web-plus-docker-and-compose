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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const hash_service_1 = require("../hash/hash.service");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, hashService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.hashService = hashService;
    }
    async auth(user) {
        const payload = { sub: user.id };
        return { access_token: this.jwtService.sign(payload) };
    }
    async validateUser(username, password) {
        const user = await this.usersService.findUserInfoWithPassword(username);
        if (!user) {
            throw new common_1.UnauthorizedException('Имя пользователя или пароль не совпадают');
        }
        const isCorrect = this.hashService.compare(password, user.password);
        if (!isCorrect) {
            throw new common_1.UnauthorizedException('Имя пользователя или пароль не совпадают');
        }
        return user;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        hash_service_1.HashService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map