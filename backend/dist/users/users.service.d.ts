import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { HashService } from 'src/hash/hash.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Wish } from 'src/wishes/entities/wish.entity';
import { TUser } from './types/user.type';
export declare class UsersService {
    private readonly usersRepository;
    private readonly wishesRepository;
    private readonly hashService;
    constructor(usersRepository: Repository<User>, wishesRepository: Repository<Wish>, hashService: HashService);
    findUserInfo(key: string | number, param: any): Promise<TUser>;
    findUserInfoWithPassword(username: string): Promise<User>;
    findUserName(userName: string): Promise<TUser>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<User>;
    findOwnWishes(userId: number): Promise<Wish[]>;
    findWishesByUsername(username: string): Promise<Wish[]>;
    findMany(query: string): Promise<TUser[]>;
}
