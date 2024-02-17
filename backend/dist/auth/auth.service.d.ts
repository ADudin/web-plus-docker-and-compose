import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/hash/hash.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly hashService;
    constructor(usersService: UsersService, jwtService: JwtService, hashService: HashService);
    auth(user: User): Promise<{
        access_token: string;
    }>;
    validateUser(username: string, password: string): Promise<User>;
}
