import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/createWishlist.dto';
import { TUser } from 'src/users/types/user.type';
import { UpdateWishlistDto } from './dto/updateWishlist.dto';
import { Wish } from 'src/wishes/entities/wish.entity';
export declare class WishlistsService {
    private readonly wishlistsRepository;
    private readonly wishesRepository;
    constructor(wishlistsRepository: Repository<Wishlist>, wishesRepository: Repository<Wish>);
    findAll(userId: number): Promise<Wishlist[]>;
    findOne(id: number): Promise<Wishlist>;
    create(createWishlistDto: CreateWishlistDto, user: TUser): Promise<Wishlist>;
    update(wishlistId: number, updateWishlistDto: UpdateWishlistDto, user: TUser): Promise<Wishlist>;
    removeOne(wishlistId: number, user: TUser): Promise<Wishlist>;
}
