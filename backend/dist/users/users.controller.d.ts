import { UsersService } from './users.service';
import { IUserRequest, TUser } from 'src/users/types/user.type';
import { UpdateUserDto } from './dto/updateUser.dto';
import { FindUsersDto } from './dto/findUsers.dto';
import { Wish } from 'src/wishes/entities/wish.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findMe(req: IUserRequest): Promise<TUser>;
    findUserByName(username: string): Promise<TUser>;
    updateCurrentUser(req: IUserRequest, updateUserDto: UpdateUserDto): Promise<TUser>;
    getOwnWishes(req: IUserRequest): Promise<Wish[]>;
    getWishesByUsername(username: string): Promise<Wish[]>;
    findMany(findUsersDto: FindUsersDto): Promise<TUser[]>;
}
