import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/createWishlist.dto';
import { IUserRequest } from 'src/users/types/user.type';
import { Wishlist } from './entities/wishlist.entity';
import { UpdateWishlistDto } from './dto/updateWishlist.dto';
export declare class WishlistsController {
    private readonly wishlistsService;
    constructor(wishlistsService: WishlistsService);
    getUserWishlists(req: IUserRequest): Promise<Wishlist[]>;
    createWishlist(createWishlistDto: CreateWishlistDto, req: IUserRequest): Promise<Wishlist>;
    getWishlistById(id: number): Promise<Wishlist>;
    updateWishlist(id: number, updateWishlistDto: UpdateWishlistDto, req: IUserRequest): Promise<Wishlist>;
    removeWishlist(id: number, req: IUserRequest): Promise<Wishlist>;
}
