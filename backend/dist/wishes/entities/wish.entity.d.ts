import { Offer } from 'src/offers/entities/offer.entity';
import { TUser } from 'src/users/types/user.type';
import { BaseEntity } from 'src/utils/base.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
export declare class Wish extends BaseEntity {
    name: string;
    link: string;
    image: string;
    price: number;
    raised: number;
    description: string;
    copied: number;
    owner: TUser;
    offers: Offer[];
    wishlists: Wishlist[];
}
