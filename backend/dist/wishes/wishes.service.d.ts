import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/createWish.dto';
import { UpdateWishDto } from './dto/updateWish.dto';
import { TUser } from 'src/users/types/user.type';
export declare class WishesService {
    private readonly wishesRepository;
    constructor(wishesRepository: Repository<Wish>);
    create(createWishDto: CreateWishDto, owner: TUser): Promise<Record<string, never>>;
    findLast(): Promise<Wish[]>;
    findTop(): Promise<Wish[]>;
    findOne(id: number): Promise<Wish>;
    updateOne(id: number, updateWishDto: UpdateWishDto, user: TUser): Promise<Record<string, never>>;
    removeOne(id: number, user: TUser): Promise<Wish>;
    copyById(wishId: number, user: TUser): Promise<Record<string, never>>;
}
