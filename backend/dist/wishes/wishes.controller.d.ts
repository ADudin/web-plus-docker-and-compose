import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/createWish.dto';
import { Wish } from './entities/wish.entity';
import { IUserRequest } from 'src/users/types/user.type';
import { UpdateWishDto } from './dto/updateWish.dto';
export declare class WishesController {
    private readonly wishesService;
    constructor(wishesService: WishesService);
    create(createWishDto: CreateWishDto, req: IUserRequest): Promise<Record<string, never>>;
    getLastWishes(): Promise<Wish[]>;
    getTopWishes(): Promise<Wish[]>;
    getWishById(id: number): Promise<Wish>;
    updateWish(id: number, updateWishDto: UpdateWishDto, req: IUserRequest): Promise<Record<string, never>>;
    removeWish(id: number, req: IUserRequest): Promise<Wish>;
    copyWish(id: number, req: IUserRequest): Promise<Record<string, never>>;
}
