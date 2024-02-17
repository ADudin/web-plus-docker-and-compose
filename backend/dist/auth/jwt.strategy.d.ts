import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(jwtPayload: {
        sub: number;
    }): Promise<import("../users/types/user.type").TUser>;
}
export {};
