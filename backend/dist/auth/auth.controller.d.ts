import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { TUser } from 'src/users/types/user.type';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    create(createUserDto: CreateUserDto): Promise<TUser>;
}
