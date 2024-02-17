import { BaseEntity } from 'src/utils/base.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import { Offer } from 'src/offers/entities/offer.entity';
export declare class User extends BaseEntity {
    username: string;
    about: string;
    avatar: string;
    email: string;
    password: string;
    wishes: Wish[];
    wishlists: Wishlist[];
    offers: Offer[];
}
